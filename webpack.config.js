const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
    analytics: './analytics.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {chunks: "all"}
  },
  plugins: [
      new HTMLWebpackPlugin({
        template: './index.html'
      }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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





// const HTMLWebpackPlugin = require('html-webpack-plugin')
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//
// module.exports = {
//   entry: './src/js/index.js',
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   plugins: [
//       new CleanWebpackPlugin(),
//       new HTMLWebpackPlugin({
//         filename: 'index.html',
//         template: './src/html/index.html',
//         files: {
//           js: [ "../js/index.js"],
//         }
//     }),
//       new HTMLWebpackPlugin({
//         filename: 'index2.html',
//         template: './src/html/index2.html',
//         files: {
//           js: [ "../js/index2.js"],
//         }
//       }),
//     new BrowserSyncPlugin({
//       host: 'localhost',
//       port: 3000,
//       server: { baseDir: ['./dist'] }
//     }),
//       // new CopyPlugin([
//       //   {
//       //     from: path.resolve(__dirname, 'src/img/'),
//       //     to: path.resolve(__dirname, 'dist/img')
//       //   },
//       //   {
//       //     from: path.resolve(__dirname, 'src/fonts'),
//       //     to: path.resolve(__dirname, 'dist/fonts')
//       //   }
//       //   ]),
//       new MiniCssExtractPlugin({
//         filename: '[name].css',
//       })
//   ],
//   module: {
//     rules: [{
//         test: /\.css$/,
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader,
//             options: {
//               hmr: true,
//               reloadAll: true
//             },
//           },
//           'css-loader',
//         ],
//       },
//       {
//         test: /\.(png|jpg|svg|gif)$/,
//         use: [ 'file-loader'],
//       },
//     ],
//   },
// };