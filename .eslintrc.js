module.exports = {
    env: { node: true },
    globals: { uni: true, wx: true, my: true, swan: true },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'vue/multi-word-component-names': 0,
    },
}
