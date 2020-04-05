module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        '@babel/plugin-transform-react-jsx-source',
        [
            'module-resolver',
            {
                extension: [
                    '.js',
                    '.ios.js',
                    '.android.js'],
                alias: {
                    _public: './public/assets',
                    _theme: './native-base-theme/variables/platform',
                    _utils: './src/utils',
                    _features: './src/features',
                    _components: './src/features/common/components',
                },
            },
        ],
    ],
};
