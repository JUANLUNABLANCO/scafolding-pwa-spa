const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        })
    ],

    module: {
        rules: [{
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                type: "asset",
                test: /\.(png|svg|jpg|jpeg|gif)$/i
            }
        ],
    },
    devtool: "eval-source-map",
};