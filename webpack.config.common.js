const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: "./src/index.ts",
        clock: "./src/demo/pages/clock.ts",
        chat: "./src/demo/pages/chat.ts",
    },

    output: {
        path: __dirname + "/dist",
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/',
    },

    optimization: {
        usedExports: true,
        runtimeChunk: {
            name: "vendor"
        },
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all',
                    minSize: 100000,
                    maxSize: 244000,
                }
            },
        },
    },

    performance: {
        maxEntrypointSize: 400000
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: false,
        }),
        new CopyPlugin([
            { from: 'src/demo/pages/*.html', to: '.', flatten: true }
        ]),
        new WriteFilePlugin(),
        new VueLoaderPlugin(),
    ],

    resolve: {
        extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".svelte", ".vue"],
        alias: {
            '~': path.resolve(__dirname, 'src/'),
            'vue$': 'vue/dist/vue.runtime.esm.js',
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