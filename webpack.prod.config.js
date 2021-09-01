require('dotenv').config()
console.log(process.env.NODE_ENV);
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: "production",
    target: "browserslist", //browserslist - for production , web for development
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/main.js",
        libraryTarget: 'umd',
        library: 'mylibrary',
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
        //publicPath: "",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                exclude: /node-modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: false
                },
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                use:
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img',
                        publicPath: 'img',
                        emitFile: true,
                        esModule: false
                    }
                }

            },
        ]
    },
    // devtool: "source-map",
    devServer: {
        static: path.join(__dirname, 'dist'),
        //   port: 3000,
        open: true,
        hot: true //enable hot loadingS
    },
    plugins: [
        new htmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            filename: "index.html",
            inject: "body",
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        })
    ]
}