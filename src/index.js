import {buildWGLProgram} from "./buildWGLProgram";

export class WebGLCanvas extends HTMLCanvasElement {

    constructor() {
        super();

        window.addEventListener('resize', () => {
            this.resize();
        })

        this.build();
    }

    resize() {
        if (this.height === this.offsetHeight && this.width === this.offsetWidth) return;

        this.height = this.offsetHeight;
        this.width = this.offsetWidth;
        this.gl.viewport(0, 0, this.offsetWidth, this.offsetHeight);
    }

    async build() {
        const gl = this.getContext('webgl2');
        if (!gl) {
            throw 'WebGL2 unavailable for this browser or browser-version'
        }
        this.gl = gl;

        this.resize();

        let program;
        try {
            program = await buildWGLProgram(gl, require('./vertex.glsl'), require('./fragment.glsl'))
            console.log(gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS))
        } catch (e) {
            console.error(e);
        }
        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        {
            const positions = [
                -1, -1,
                -1, 1,
                1, 1,
                1, -1,
            ];
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        }

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(positionAttributeLocation);

        {
            const size = 2;          // 2 components per iteration
            const type = gl.FLOAT;   // the data is 32bit floats
            const normalize = false; // don't normalize the data
            const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
            const offset = 0;        // start at the beginning of the buffer
            gl.vertexAttribPointer(
                positionAttributeLocation,
                size, type, normalize, stride, offset
            );
        }

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        {
            const primitiveType = gl.TRIANGLES;
            const offset = 0;
            const count = 3;
            gl.drawArrays(primitiveType, offset, count);
        }
    }
}