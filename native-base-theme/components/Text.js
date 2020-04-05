import variable from "./../variables/platform";

export default (variables = variable) => {
    const textTheme = {
        fontSize: variables.fontBaseSize,
        fontFamily: variables.fontCustomFamily,
        color: variables.textColor,
        ".note": {
            color: "#a7a7a7",
            fontSize: variables.noteFontSize
        },
        ".bold": {
            fontFamily: variables.fontCustomFamilyBold,
        },
        ".primary": {
            color: variables.primary
        }
    };

    return textTheme;
};
