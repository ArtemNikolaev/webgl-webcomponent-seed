export async function loadShader(ctx, type, source) {
    const shader = ctx.createShader(type);
    ctx.shaderSource(shader, source);
    ctx.compileShader(shader);

    const success = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
    if (success) {
        return Promise.resolve(shader);
    }

    const errorMsg = ctx.getShaderInfoLog(shader);
    ctx.deleteShader(shader);
    return Promise.reject(errorMsg);
}