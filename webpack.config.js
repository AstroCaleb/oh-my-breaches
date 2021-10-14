const HtmlWebpackPlugin = require('html-webpack-plugin');
const noop = require('noop-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

let isLocalEnv = process.env.ENV === 'local';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
        chunkFilename: '[id].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]'
                            },
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body',
            favicon: './src/images/favicon.ico'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            isLocalEnv ? noop() : new TerserPlugin()
        ],
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 3000,
        compress: true,
        liveReload: true,
        static: 'dist'
    }
};
