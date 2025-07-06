import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import {globalIgnores} from 'eslint/config'
import reactDom from 'eslint-plugin-react-dom'
import react from "eslint-plugin-react-x";
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        ignores: [
            './src/components/ui/**'
        ],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.strictTypeChecked,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
            react.configs.recommended,
            reactDom.configs.recommended,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@stylistic': stylistic
        },
        "rules": {
            "object-curly-spacing": ["error", "always"],
            '@stylistic/indent': ['error', 2],
        }
    },
])
