import { loadShader } from "./loadShader";
import { loadProgram } from "./loadProgram";

export async function buildWGLProgram(
    ctx,
    vertex_source,
    fragment_source
) {
    return Promise.all([
        loadShader(ctx, ctx.VERTEX_SHADER, vertex_source),
        loadShader(ctx, ctx.FRAGMENT_SHADER, fragment_source),
    ])
        .then(loadProgram.bind(null, ctx))
}
