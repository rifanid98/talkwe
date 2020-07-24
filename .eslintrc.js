module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'prettier'
    ],
    'rules': {
        indent: [
            'error',
            2,
            { SwitchCase: 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single',
            { avoidEscape: true }
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'prettier/prettier': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    "lint-staged": {
        "src/**/*.{ts,tsx}": [
            "eslint --ext .tsx --ext .ts src/ --fix"
        ],
        "./src/**": [
            "prettier --write ."
        ]
    },
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
};