module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'ignorePackages',
        jsx: 'ignorePackages',
        ts: 'ignorePackages',
        tsx: 'ignorePackages',
      },
    ],

  },
  ignorePatterns: ['jest.config.js'],
}
