import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import sortExports from 'eslint-plugin-sort-exports';
import globals from 'globals';

export default [
  { ignores: [ 'dist' ] },
  {
    files: [ '**/*.{js,jsx}' ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
      'import': importPlugin,
      'sort-exports': sortExports,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-trailing-spaces': [ 'error', { 'skipBlankLines': true } ],
      'array-bracket-spacing': [ 'error', 'always' ],
      'object-curly-spacing': [ 'error', 'always' ],
      'comma-dangle': [ 'error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
      } ],
      'indent': [ 'error', 2 ],
      'no-unused-vars': [ 'error', { varsIgnorePattern: '^[A-Z_]' } ],
      'react/jsx-no-undef': 'error',
      'no-undef': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'quotes': [ 'error', 'single' ],
      '@stylistic/semi': [ 'error', 'always' ],
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'pathGroups': [
            {
              'pattern': '*.{css,scss,sass,less}',
              'patternOptions': { 'matchBase': true },
              'group': 'object',
              'position': 'after',
            },
            {
              'pattern': '@/**',
              'group': 'internal',
            },
          ],
          'newlines-between': 'always',
          'warnOnUnassignedImports': true,
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true,
          },
        },
      ],
      'sort-exports/sort-exports': [ 'error', { 'sortDir': 'asc' } ],
    },
  },
];
