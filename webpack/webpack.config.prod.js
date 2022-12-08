const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js",
    },
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [{
                test: /\.css$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                type: "asset",
                test: /\.(png|svg|jpg|jpeg|gif)$/i
            }
        ],
    },
    devtool: "eval-source-map",
};