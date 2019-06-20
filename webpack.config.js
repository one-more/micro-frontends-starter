const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
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
        new VueLoaderPlugin(),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".svelte", ".vue"],
        alias: {
            '~': path.resolve(__dirname, 'src/'),
            'vue$': 'vue/dist/vue.esm.js',
        }
    },

    module: {
        rules: [
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

            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: 'svelte-loader'
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
};