const helper = require('./helper')
const baseDir = helper.baseDir
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const os = require('os')
const webpack = require('webpack')
const HappyPack = require('happypack')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const options = {
  stylesDir: baseDir('./theme'),// 指定皮肤文件夹
  antDir: baseDir('./node_modules/antd'),//antd包位置
  varFile: baseDir('./theme/variables.less'), // 自己设置的主题色
  mainLessFile: baseDir('./theme/index.less'),
  // outputFilePath: baseDir('dist/theme.less'),//输出到什么地方
  themeVariables: [
    '@primary-color',
    '@success-color',
    '@primary-1',
    '@layout-sider-background',
    '@layout-body-background',
    '@layout-header-background',
    '@success-color',
    '@error-color',
    '@heading-color',
    '@text-color-secondary',
    '@border-radius-sm',
    '@icon-color',
    '@card-background',
    '@component-background',
    '@text-selection-bg',
    '@text-color',
    '@table-header-sort-bg',

    // '@secondary-color',
    // '@text-color',
    // '@text-color-secondary',
    // '@heading-color',
    // '@layout-body-background',
    // '@btn-primary-bg',
  ],
  generateOnce: false,
  indexFileName: baseDir('./dist/color.less'),
}
const progressPlugin = new ProgressBarWebpackPlugin({
  format: 'building [:bar] :percent (:elapsed seconds)',
  clear: false,
  width: 30
})

const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const happyPack = new HappyPack({
  id: 'babel',
  loaders: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        ['@babel/plugin-proposal-decorators', {'legacy': true}],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-transform-runtime',
        ['import', {'libraryName': 'antd', 'style': true}],
      ],
    }
  }],
  //共享进程池
  threadPool: happyThreadPool,
  //允许 HappyPack 输出日志
  verbose: true,
})

module.exports = {
  htmlPlugin: new HtmlWebpackPlugin({
    title: 'react-practice',
    filename: 'index.html',
    template: baseDir('public/index.html')
  }),

  cleanPlugin: new CleanWebpackPlugin([baseDir('dist')]),

  happyPack,

  definePlugin: new webpack.DefinePlugin({
    DEV: process.env.NODE_ENV === 'development'
  }),

  cssPlugin: new MiniCssExtractPlugin({
    filename: 'css/[name]-[chunkhash:8].css',
    chunkFilename: 'css/[name]-[chunkhash:8].css'
  }),

  antdTheme: new AntDesignThemePlugin(options),
  progressPlugin,
  analyzerPlugin: new BundleAnalyzerPlugin({analyzerPort: 8765,}),
  dayJSPlugin: new AntdDayjsWebpackPlugin(),
  copyPlugin: new CopyWebpackPlugin([
    {
      from: baseDir('./public/'), to: './'
    }
  ]),
  uglifyJsPlugin:new UglifyJsPlugin({
    // 允许并发
    parallel: true,
    // 开启缓存
    cache: true,
    // compress: {
    //   // 删除所有的console语句
    //   drop_console: true,
    //   // 把使用多次的静态值自动定义为变量
    //   reduce_vars: true,
    // },
    // output: {
    //   // 不保留注释
    //   comment: false,
    //   // 使输出的代码尽可能紧凑
    //   beautify: false
    // }
  })
}


