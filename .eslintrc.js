module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        'airbnb-typescript'
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        project: './tsconfig.json'
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/destructuring-assignment': 'off',
        'class-methods-use-this': 'off'
    }
};
