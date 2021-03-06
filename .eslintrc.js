module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['css-modules'],
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:css-modules/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/indent': 'off',
        indent: ['error', 4],
        'react/display-name': 'off',
    },
};
