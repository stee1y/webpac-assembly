const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  }
  if(isProd) {
    config.minimizer = [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsPlugin()
  ]}
  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = ext => {
  const loaders = [{loader: MiniCssExtractPlugin.loader}, 'css-loader']
  if(ext) {
    loaders.push(ext)
  }
  return loaders
}


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
    // analytics: './analytics.js'  // для отдельного скрипта
  },
  output: {
    filename: filename('js'),   // '[name].[hash].js'
    path: path.resolve(__dirname, 'dist')
  },
  optimization: optimization(),
  devServer: {

  },
  devtool: 'source-map',
  plugins: [
      new HTMLWebpackPlugin({
        template: './index.html',
        minify: {
          collapseWhitespace: isProd
        }
      }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      },
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css'), // '[name].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [ 'file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [ 'file-loader'],
      },
    ]
  }
}
