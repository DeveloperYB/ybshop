module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-underscore-dangle': [
      'error',
      { allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] },
    ],
    'no-useless-escape': ['off', 'always'],
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': ['**/*.stories.js', '**/*.test.js'] }],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/require-default-props': 'off',
    "camelcase": ["off"],
    "lines-between-class-members": ["off"],
    'react/forbid-prop-types': 'off',
  },
};
