const path = require("path");

module.exports = {
    entry: {
        main: "./src/index.js",
        "polyfilled": "./src/with-polyfill"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        library: "muskot",
        libraryTarget: "commonjs2"
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};