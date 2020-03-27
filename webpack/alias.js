const {baseDir} = require('./helper')
const base = 'xblock/src/'
module.exports = {
  '_assets': baseDir(base + 'assets/'),
  '_blocks': baseDir(base + 'blocks/'),
  '_components': baseDir(base + 'components/'),
  '_elements': baseDir(base + 'elements/'),
  '_layouts': baseDir(base + 'layouts/'),
  '_models': baseDir(base + 'models/'),
  '_styles': baseDir(base + 'styles/'),
  '_tools': baseDir(base + 'tools/'),
  '_xblock': baseDir(base + 'xblock/'),
  // 'rc-xblock':baseDir(base)
}