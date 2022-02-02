const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
    {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'webgl-component.js',
            library: {
                name: 'WebGLComponent',
                type: 'umd'
            },
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
        mode: 'production',
        // mode: 'development',
        // devtool: 'inline-source-map',
    },
    {
        entry: './src/declared-index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'webgl-component-declared.js',
            library: "WebGLComponentDeclared",

        },
        target: ['web'],
        resolve: {
            extensions: ['.ts', '.js', '.glsl'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.glsl$/,
                    use: 'webpack-glsl-loader'
                }
            ],
        },
        mode: "production",
        // mode: "development",
        // devtool: 'inline-source-map',
        plugins: [new HtmlWebpackPlugin({
            template: 'src/declared-template.html',
        })],
    }
];