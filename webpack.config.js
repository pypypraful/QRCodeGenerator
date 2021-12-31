const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const OUTPUT_DIR = path.join('/Users/prafulgo/Desktop/Personal/qr-code-generator', 'build');

const port = process.env.PORT || 3000;

module.exports = {
    mode: "production",
    entry: './src/index.tsx',
    resolve:{
        extensions:[".webpack.js", ".web.js", ".js", ".json", ".jsx", ".ts", ".tsx"]
    },
    output : {
        path: OUTPUT_DIR,
        filename: 'main.js',
        publicPath: '/QRCodeGenerator'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader'
                }]
            }
        ]
    },
    performance: {
        maxEntrypointSize: 5120000,
        maxAssetSize: 5120000
    },
    plugins: [
        new NodePolyfillPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            'process.env.STAGE': "alpha"
        })
    ],
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: {
            index: '/QRCodeGenerator'
        },
        // disableHostCheck: true,
    }
}