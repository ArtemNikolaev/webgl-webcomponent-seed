const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webgl-component.js',
        library: "WebGLComponent",
    },
    target: ['web', 'es6'],
    resolve: {
        extensions: ['.ts', '.js', '.glsl'],
    },
    module: {
        rules: [
            {
                test: /\.glsl$/,
                use: 'webpack-glsl-loader'
            }
        ],
    },
    mode: "development",
    devtool: 'inline-source-map',
};