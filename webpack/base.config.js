const helper = require('./helper')
const baseDir = helper.baseDir
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const plugins = require('./plugins')
const devServer = require('./server')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const DEV = process.env.NODE_ENV === 'development'
const hash = true
const alias = require('./alias')
pluginsList = [
  plugins.antdTheme,
  plugins.cssPlugin,
  plugins.happyPack,
  plugins.definePlugin,
  plugins.htmlPlugin,
  plugins.progressPlugin,
  plugins.dayJSPlugin,
  plugins.copyPlugin
]
if (process.env.NODE_ENV === 'analyze') pluginsList.push(plugins.analyzerPlugin)
if (process.env.NODE_ENV !== 'development') pluginsList.push(plugins.cleanPlugin)

module.exports = {
  mode: process.env.NODE_ENV === 'analyze' ? 'production' : process.env.NODE_ENV,
  entry: {
    app: [
      baseDir('src/index.js')
    ],
    xblock: ['rc-xblock'],
    antd: ['antd', '@ant-design/icons'],
    react: ['react', 'react-dom'],
  },
  output: {
    path: baseDir('dist'),
    filename: `js/[name]${hash ? '-[chunkhash:8]' : ''}.js`,
    chunkFilename: `js/[name]${hash ? '-[chunkhash:8]' : ''}.js`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|lib/,
        loaders: ['happypack/loader?id=babel'],
      },
      {
        test: /\.(css|less)$/,
        include: /src/,
        use: [
          {
            loader: DEV ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: `[local]${hash ? '-[hash:8]' : ''}`,
            }
          }, {
            loader: 'less-loader',
            options: {
              modules: true,
              localIdentName: `[local]${hash ? '-[hash:8]' : ''}`,
              javascriptEnabled: true,
            }
          }, {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        include: /node_modules|xblock\/lib/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'img/[name].[ext]',
            limit: 10240,
          }
        }]
      }]
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: !DEV,
    splitChunks: {
      chunks: 'all',
      minSize: 300000, // 大于30K才会抽离到公共模块
      minChunks: 10,
      // name: 'vendor'
    }
  },
  stats: {
    entrypoints: false,
    children: false,
    modules: false,
    errors: true,
    errorDetails: true,
    warnings: true
  },
  plugins: pluginsList,
  devServer,
  devtool: DEV ? 'source-map' : '',
  resolve: {
    alias,
    extensions: ['.js', '.jsx', '.html', '.css', '.less']
  },
}