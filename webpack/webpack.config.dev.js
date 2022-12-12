const path = require("path");
// para inyectar html
const HtmlWebpackPlugin = require("html-webpack-plugin");
// compresion de archivos pesados
const CompressionPlugin = require('compression-webpack-plugin');
// service worker inyection
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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
            template: './src/index.html', // archivo de la vista principal
            inject: true, // inject: 'body'  se inyectará el js ahí
            filename: "index.html", // nuevo nombre para el index. todos los htmls estarán ahí, si no lo pones será el mismo
        }),
        new WorkboxPlugin.GenerateSW({
            // crea el service worker y lo inyecta
            clientsClaim: true,
            skipWaiting: true,
            directoryIndex: 'dist/',
            swDest: 'sw.js'
        }),
        // algunos ficheros deben ser copiados al raiz sin modificar sus rutas ni nombres
        new CopyPlugin({
            patterns: [
                { from: "./src/favicon.ico", to: "" },
                { from: "./src/manifest.json", to: "" },
                // { from: "./src/registerSW.js", to: "" },
            ]
        }),
        // new WorkboxPlugin.InjectManifest({
        //     swSrc: './dist/sw.js',
        //     swDest: 'sw.js'
        // }),
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
            }
            // ,
            // {
            //     type: "asset",
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i
            // }
        ]
    }
};