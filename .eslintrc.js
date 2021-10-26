module.exports = {
  env: {
    browser: true,
    es2021: true
  },

  extends: [
    'plugin:vue/essential',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],

  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },

  plugins: [
    'vue',
    '@typescript-eslint'
  ],

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    '@typescript-eslint/no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: false
    }],

    '@typescript-eslint/no-inferrable-types': 'off',

    'import/order': ['error', {
      groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      }
    }]
  }
}
