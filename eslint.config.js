import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginJs.configs.recommended,
  {
    plugins: { prettier: pluginPrettier },
    rules: { 'prettier/prettier': 'error' },
  },
];
