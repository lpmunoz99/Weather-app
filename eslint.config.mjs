import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([

  globalIgnores([
      'node_modules/',
      'dist/',
      'build/',
      '*.html',
      '*.css',
      '*.md',
      '*.json'
  ]),

  // 🔹 Browser environment (e.g., your src/ files)
  { files: ['**/*.{js,mjs,cjs}'], 
    plugins: { js }, 
    extends: ['js/recommended'], 
    languageOptions: { 
      globals: globals.browser 
    },
    rules: {
			'no-unused-vars': 'warn',
      'no-undef': 'error',
      'eqeqeq': 'error',
		},
  },

  // 🔹 Node environment (e.g., webpack.*.js)
  {
    files: ['webpack.*.js'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': 'warn',
      'eqeqeq': 'error',
    },
  },

  eslintConfigPrettier
]);
