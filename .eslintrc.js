module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node':true
  },
  'plugins': [
    'vue'
  ],
  'extends': 'plugin:vue/recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'eqeqeq': ['error', 'smart'], // 必须全等号代替等号
    'vue/no-v-html':0,
    'vue/html-indent':[
      'error',
      2
    ],
    'indent': [
      'error',
      2
    ],
    // 禁止出现多个空格
    'no-multi-spaces': [
      'error'
    ],
    'space-infix-ops': ['error'], // 二元运算符左右两边要有一个空格
    'comma-spacing': ['error', { 'before': false, 'after': true }], // 逗号前没空格，逗号后有空格
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
