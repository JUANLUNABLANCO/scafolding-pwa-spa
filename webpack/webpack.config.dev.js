const path = require("path");
// para inyectar html
const HtmlWebpackPlugin = require("html-webpack-plugin");
// compresion de archivos pesados
const CompressionPlugin = require('compression-webpack-plugin');
// service worker inyection
const WorkboxPlugin = require('workbox-webpack-plugin');
// DEBUG analicemos los pesos del bundle.js y carpetas para optimizar
// const AnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {

    mode: "development",
    devtool: 'inline-source-map',
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            filename: "index.html",
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
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