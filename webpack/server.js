const helper = require('./helper')
const baseDir = helper.baseDir
const devEnv = require(baseDir('/env.js'))
const mock = require('cf-mock-server/express-mw')
module.exports = {
  open: true,
  host: '0.0.0.0',
  proxy: {
    '/api/': {
      target: 'http://' + devEnv.API_SERVER,
      changeOrigin: true,
      pathRewrite: {
        '^/api': 'api'
      }
    }
  },
  noInfo: true,
  stats: {
    assets: false,
    entrypoints: false,
    children: false,
    modules: false,
    errors: true,
    errorDetails: true,
    warnings: true,
  },
  // https://webpack.js.org/configuration/dev-server/#devserverbefore
  after: (app, server) => {
    // app.use(mock({
    //   config: path.join(__dirname, './mock-server/config.js')
    // }))
  },
}