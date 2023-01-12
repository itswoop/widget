module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2022,
  },
  extends: [
    'plugin:import/typescript',
    'plugin:import/recommended',
    'react-app',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint/eslint-plugin', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-key': ['error'],
    'no-unused-vars': 'off',
    'import/default': ['error'],
    'import/named': ['error'],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          ['internal', 'parent', 'index'],
          'sibling',
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        arrowParens: 'avoid',
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        endOfLine: 'lf',
      },
    ],
  },
}
