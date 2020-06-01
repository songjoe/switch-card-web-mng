/*
 * @Author: SongYijie
 * @Date: 2020-03-09 14:47:19
 * @LastEditors: SongYijie
 */
module.exports = {
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jquery: true,
  },
  parser: 'babel-eslint',
  plugins: ['react', 'babel'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'prefer-destructuring': 0,
    'no-else-return': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': [2, { ignore: ['^@/'] }],
    'import/extensions': ['off', 'never'],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: false,
        assignment: false,
      },
    ],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'comma-dangle': ['error', 'always-multiline'],
  },
};
