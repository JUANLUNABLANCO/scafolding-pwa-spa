const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { dirname } = require("path");
// const webpack = require('webpack');

module.exports = {

    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Inject js in HTML:dev",
            template: './src/index.html',
            inject: true,
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
            },
            {
                test: /\.(jpg|png|gif)$/,
                include: /images/,
                loader: 'url'
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },

};