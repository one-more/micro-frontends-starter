const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require("@micro-frontends/config/webpack.config.common");
const path = require('path');

module.exports = merge(
    commonConfig,
    {
        entry: {
            main: "./src/index.ts",
            clock: "./src/pages/clock.ts",
            chat: "./src/pages/chat.ts",
            todo: "./src/pages/todo.ts",
        },

        output: {
            path: __dirname + "/dist",
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js',
            publicPath: '/',
        },

        resolve: {
            alias: {
                '~': path.resolve(__dirname, 'src/'),
            }
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.html',
                inject: false,
            }),
            new CopyPlugin([
                { from: 'src/pages/*.html', to: '.', flatten: true }
            ]),
            new WriteFilePlugin(),
        ],
    }
);