const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    devtool: 'source-map',

    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Inject js in HTML:dev",
            template: "./src/index.html",
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({
            title: "CSS-mini-extract"
        }),
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

};