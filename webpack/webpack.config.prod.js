const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: "production",
    devtool: 'eval-source-map',
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "..", "__production"),
        filename: "app.js",
        // publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new MiniCssExtractPlugin(),
        // new CompressionPlugin({
        //     filename: "[path][base].gz",
        //     algorithm: "gzip",
        //     test: /\.js$|\.css$|\.html$/,
        //     threshold: 1000,
        //     minRatio: 0.8,
        // })
    ],
    module: {
        rules: [{
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            // {
            //     type: "asset",
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            // }
        ],
    },
    // resolve: {
    //     extensions: [".js", ".jsx", ".json"]
    // }
};