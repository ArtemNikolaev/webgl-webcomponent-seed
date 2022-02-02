#version 300 es

precision highp float;

uniform vec2 u_resolution;

out vec4 color;

void main() {
    color = vec4(gl_FragCoord.x / u_resolution.x, gl_FragCoord.y / u_resolution.y, 0, 1.0);
}