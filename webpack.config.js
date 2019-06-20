const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./src/index.ts",

    mode: "development",

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'head',
        }),
        new CopyPlugin([
            { from: 'src/demo/pages', to: '.' }
        ]),
        new WriteFilePlugin(),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    "useBabel": true,
                    "babelOptions": {
                        "babelrc": true,
                        "presets": [
                            ["@babel/preset-env", { "targets": "last 2 versions, ie 11", "modules": false }]
                        ]
                    },
                    "babelCore": "@babel/core",
                }
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};