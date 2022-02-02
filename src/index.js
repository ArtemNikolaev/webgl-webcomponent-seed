import {buildWGLProgram} from "./buildWGLProgram";

export class WebGLCanvas extends HTMLCanvasElement {

    constructor() {
        super();

        this.gl = this.getContext('webgl2');
        if (!this.gl) {
            throw 'WebGL2 ctx unavailable!';
        }

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
        const gl = this.gl;
        let program;

        try {
            this.resize();

            await this.clear();
            program = await buildWGLProgram(gl, require('./vertex.glsl'), require('./fragment.glsl'));

            await this.vertex(program);
        } catch (e) {
            console.error(e);
        }


        gl.useProgram(program);

        {
            const primitiveType = gl.TRIANGLES;
            const offset = 0;
            const count = 6;
            gl.drawArrays(primitiveType, offset, count);
        }
    }

    async vertex(program) {
        const positions = new Float32Array([
            // first Triangle
            -1, -1, 0,
            -1, 1, 0,
            1, 1, 0,
            // second Triangle
            1, 1, 0,
            1, -1, 0,
            -1, -1, 0,
        ]);

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        const location = this.gl.getAttribLocation(program, 'position');
        this.gl.enableVertexAttribArray(location);
        {
            const size = 3;
            const type = this.gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            this.gl.vertexAttribPointer(location, size, type, normalize, stride, offset);
        }

        return Promise.resolve();
    }

    async clear() {
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}