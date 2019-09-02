const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/js/index.js',
    article: './src/js/article.js',
    picture:'./src/js/picture.js',
  },
  output: {
    filename: '[name].bundle.[hash].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
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
            outputPath: 'images/',
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
      filename: 'index.html',
      template: './src/page/index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['article'],
      filename: 'article.html',
      template: './src/page/article.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['picture'],
      filename: 'picture.html',
      template: './src/page/picture.html'
    })
  ],
  devServer: {
    inline: true,
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 9090,
    open: true,
    compress: true,
    proxy: {
      '/api': {
        target: 'http://manage.jujitest.baokangys.com',
        changeOrigin: true
      }
    }
  }
}
