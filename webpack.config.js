require('dotenv').config()
console.log(process.env.NODE_ENV);
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: "development",
    target: "web", //browserslist - for production
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/main.js",
        // publicPath: "",
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
                        loader: MiniCssExtractPlugin.loader
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
        // port: 3000,
        open: true,
        hot: true //enable hot loadingS
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, "/src/index.html"),
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

/*A source map is a file that maps from the transformed source to the original source,
enabling the browser to reconstruct the original source and present the reconstructed original in the debugger.
To enable the debugger to work with a source map, you must: generate the source map.
*/