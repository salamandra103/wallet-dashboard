/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    // indent: ["error", 2]
    'svelte/valid-compile': [
      'error',
      {
        ignoreWarnings: true
      }
    ],
    'no-console': 0,
    'no-debugger': 0
  }
};
