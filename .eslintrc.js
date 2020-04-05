module.exports = {
    "extends": [
        "airbnb",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "env": {
        "jest": true,
        "browser": true,
        "node": true
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
        "indent": [
            "error", 4, {
                "SwitchCase": 1
            }
        ],
        "no-console": 0,
        "comma-dangle": 0,
        "import/prefer-default-export": 0,
        "react/jsx-filename-extension": 0,
        "react/forbid-prop-types": 0,
        "react/no-unused-prop-types": 0,
        "react/prop-types": 0,
        "react/jsx-curly-brace-presence": 0,
        "react/jsx-indent": [1, 4],
        "react/jsx-indent-props": [1, 4],
        "import/no-extraneous-dependencies": [
            "error", {
                "devDependencies": false,
                "optionalDependencies": false,
                "peerDependencies": false
            }
        ]
    },
    "settings": {
        "import/resolver": {
            "babel-module": {
                "extensions": [
                    ".js",
                    ".ios.js",
                    ".android.js"
                ],
                "paths": [
                    "./public",
                    "./native-base-theme/variables/platform",
                    "./src/utils",
                    "./src/features"
                ]
            }
        }
    },
    "globals": {
        "fetch": false
    }
};
