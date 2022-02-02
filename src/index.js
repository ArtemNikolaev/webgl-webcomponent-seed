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

    async build() {
        try {

            await this.clear();
            this.program = await buildWGLProgram(this.gl, require('./vertex.glsl'), require('./fragment.glsl'));
            this.gl.useProgram(this.program);

            this.resize();
            await this.vertex();

            {
                const primitiveType = this.gl.TRIANGLES;
                const offset = 0;
                const count = 6;
                this.gl.drawArrays(primitiveType, offset, count);
            }
        } catch (e) {
            console.error(e);
        }
    }

    resize() {
        if (this.height === this.offsetHeight && this.width === this.offsetWidth) return;

        this.height = this.offsetHeight;
        this.width = this.offsetWidth;
        this.gl.viewport(0, 0, this.offsetWidth, this.offsetHeight);

        const u_resolution = new Float32Array([
            this.width, this.height
        ])

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, u_resolution, this.gl.STATIC_DRAW);

        const location = this.gl.getUniformLocation(this.program, 'u_resolution');
        this.gl.uniform2fv(location, u_resolution);
    }

    async clear() {
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    async vertex() {
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

        const location = this.gl.getAttribLocation(this.program, 'position');
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
}