module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended', // Enable Prettier rules
  ],
  ignorePatterns: ['node_modules/', 'dist/', 'docs/', '/types'],
  // rules: {
  //   'prettier/prettier': 'error',
  // },
};