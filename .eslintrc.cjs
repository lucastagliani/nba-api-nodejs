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
    "import/extensions": ["warn", "ignorePackages"]
    
  },
  ignorePatterns: ['jest.config.js'],
}
