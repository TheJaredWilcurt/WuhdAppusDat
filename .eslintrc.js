module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    requireConfigFile: false
  },
  env: {
    es6: true,
    node: true
  },
  globals: {
    'nw': true,
    'Vue': true
  },
  extends: [
    'tjw-base'
  ]
};
