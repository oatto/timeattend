import variable from "./../variables/platform";

export default (variables = variable) => {
    const textAreaTheme = {
        ".underline": {
            borderBottomWidth: variables.borderWidth,
            marginTop: 5,
            borderColor: variables.inputBorderColor
        },
        ".bordered": {
            borderWidth: 1,
            marginTop: 5,
            borderColor: variables.inputBorderColor
        },
        color: variables.textColor,
        fontFamily: variables.fontCustomFamily,
        fontSize: variables.inputFontSize,
        paddingLeft: 10,
        paddingRight: 5,
        borderWidth: variables.inputBorderWidth,
        borderColor: variables.inputBorderColor,
        borderRadius: variables.inputBorderRadius,
        textAlignVertical: "top"
    };

    return textAreaTheme;
};
