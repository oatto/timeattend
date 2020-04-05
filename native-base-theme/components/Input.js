import variable from './../variables/platform';

export default (variables = variable) => {
    const inputTheme = {
        '.multiline': {
            height: null,
        },
        '.textWhite': {
            color: 'white',
        },
        height: variables.inputHeightBase,
        color: variables.inputColor,
        paddingHorizontal: variables.inputPaddingHorizontal,
        flex: 1,
        fontSize: variables.inputFontSize,
        lineHeight: variables.inputLineHeight,
        fontFamily: variables.fontCustomFamily
    };

    return inputTheme;
};
