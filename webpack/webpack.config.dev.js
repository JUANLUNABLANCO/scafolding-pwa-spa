const path = require("path");
// const zlib = require("zlib");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

// DEBUG analicemos los pesos del bundle.js y carpetas para optimizar
// const AnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {

    mode: "development",
    devtool: 'inline-source-map',
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            filename: "index.html",
        }),
        // compresion de archivos grandes
        new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 1000,
            minRatio: 0.8,
        }),
        // new AnalyzerPlugin({ analyzerPort: 7777 })
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
        ]
    }
};