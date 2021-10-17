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
    'httpVueLoader': true,
    'nw': true,
    'Vue': true,
    'Vuex': true
  },
  extends: [
    'tjw-base',
    'tjw-vue'
  ],
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'never'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        'ignore': []
      }
    ]
  }
};
