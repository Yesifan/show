const rule = require('../.eslintrc.js')
/**
 * eslint 配置
 * 0 = off, 1 = warn, 2 = error
 */
module.exports = {
  extends: ["react-app",'../.eslintrc.js'],
  plugins: ["react"],
  rules: {}
};