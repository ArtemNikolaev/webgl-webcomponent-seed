export async function loadProgram(ctx, [vertexShader, fragmentShader]) {
    const program = ctx.createProgram();
    ctx.attachShader(program, vertexShader);
    ctx.attachShader(program, fragmentShader);
    ctx.linkProgram(program);

    const success = ctx.getProgramParameter(program, ctx.LINK_STATUS);
    if (success) {
        return Promise.resolve(program);
    }

    const errorMsg = ctx.getProgramInfoLog(program);
    ctx.deleteProgram(program);
    return Promise.reject(errorMsg);
}
