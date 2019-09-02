const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: {
        index: './src/js/index.js',
        article: './src/js/article.js',
        picture: './src/js/picture.js'
    },

    module: {
        rules: [{
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        publicPath: 'images/',
                        outputPath: 'share/images/',
                        limit: 500
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
                loader: 'file-loader'

            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'share/index.html',
            template: './src/page/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['article'],
            filename: 'share/article.html',
            template: './src/page/article.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['picture'],
            filename: 'share/picture.html',
            template: './src/page/picture.html'
        })
    ],
    output: {
        filename: 'share/js/[name].bundle.[hash].js',
        path: path.join(__dirname, 'dist')
    }
}