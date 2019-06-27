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
  extends: ["eslint:recommended","standard"],
  parserOptions: {
    ecmaFeatures: {
        "jsx": true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    // eqeqeq:["error", "always"],
    // indent: ["error", 2],
    // "linebreak-style": ["error", "windows"],
    // quotes: ["error", "single"],
    // semi: ["error", "always"],
    "no-trailing-spaces":2,
    "space-before-blocks":2,
    "space-before-function-paren":2,
    "space-infix-ops":2,
    "space-in-parens":2,
    "space-unary-ops":2,
    "spaced-comment":2
  }
};