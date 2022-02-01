export function loadProgram(
    ctx: WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader,
): Promise<WebGLProgram>