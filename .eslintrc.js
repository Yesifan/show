/**
 * eslint 配置
 * 0 = off, 1 = warn, 2 = error
 */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ["standard","prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaFeatures: {
        "jsx": true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "prettier/prettier": "error",
    "no-trailing-spaces":2,
    "space-infix-ops":2,
    "space-in-parens":2,
    "space-unary-ops":2,
    "spaced-comment":2,
    "camelcase":0
  }
};