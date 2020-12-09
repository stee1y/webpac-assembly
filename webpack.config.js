const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const generateTemplates = () => {
  const files = fs.readdirSync(path.resolve(__dirname, './src'))
  const htmls = files.filter((file) => /\.html$/.test(file))
  return htmls.map(
    (template) =>
      new HTMLWebpackPlugin({
        filename: template,
        hash: false,
        template: path.resolve(__dirname, `./src/${template}`),
        minify: {
          collapseWhitespace: isProd,
        },
      })
  )
}

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  }
  if (isProd) {
    config.minimizer = [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsPlugin(),
    ]
  }
  return config
}

const filename = (ext) => `[name].${ext}`

const cssLoaders = (ext) => {
  const loaders = [
    { loader: MiniCssExtractPlugin.loader },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
  ]
  if (ext) {
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
    filename: filename('js'), // '[name].[hash].js'
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: optimization(),
  devServer: {},
  devtool: 'source-map',
  plugins: [
    ...generateTemplates(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon/favicon.ico'),
        to: path.resolve(__dirname, 'dist/images'),
      },
      {
        from: path.resolve(__dirname, 'src/images'),
        to: path.resolve(__dirname, 'dist/images'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css'), // '[name].[hash].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
      {
        test: /(\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$|font.*\.svg$)/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
