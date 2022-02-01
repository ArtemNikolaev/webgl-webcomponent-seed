import {FragmentShaderSource, VertexShaderSource} from "./types.";

declare module 'build-webgl2-program' {

    export function buildWGLProgram(
        cts : WebGL2RenderingContext,
        vertex_source: VertexShaderSource,
        fragment_source: FragmentShaderSource,
    ): Promise<WebGLProgram>
}

