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
    'react-app',
    'prettier',
    'plugin:import/recommended',
  ],
  plugins: ['react', 'prettier', '@typescript-eslint/eslint-plugin'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-nested-ternary': 0,
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
