module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // 'no-unused-vars': 'warn',
    'unicorn/no-array-callback-reference': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/restrict-template-expressions': 'off',
    // 'jest/expect-expect': [
    //   'error',
    //   {
    //     assertFunctionNames: ['expect', 'verify', 'dbTest'],
    //   },
    // ],
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
      },
    ],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          null: false,
        },
      },
    ],
  },
};
