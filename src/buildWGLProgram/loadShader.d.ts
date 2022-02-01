import {ShaderSource} from "./types.";

export function loadShader(
    ctx : WebGL2RenderingContext,
    type: GLenum,
    source: ShaderSource,
): Promise<WebGLShader>