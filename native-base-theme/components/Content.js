import variable from "./../variables/platform";

export default (variables = variable) => {
    const contentTheme = {
        ".padder": {
            padding: variables.contentPadding
        },
        ".padderVertical": {
            paddingVertical: variables.contentPadding
        },
        ".padderHorizontal": {
            paddingHorizontal: variables.contentPadding
        },
        ".whiteBackground": {
            backgroundColor: variables.white
        },
        flex: 1,
        backgroundColor: variables.contentBg,
        "NativeBase.Segment": {
            borderWidth: 0,
            backgroundColor: "transparent"
        }
    };

    return contentTheme;
};
