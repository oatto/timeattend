import variable from "./../variables/platform";

export default (variables = variable) => {
    const cardTheme = {
        ".transparent": {
            shadowColor: null,
            shadowOffset: null,
            shadowOpacity: null,
            shadowRadius: null,
            elevation: null
        },
        ".padder": {
            padding: variables.sp3
        },
        ".withSpace": {
            marginBottom: variables.sp2
        },
        ".padderHorizontal": {
            paddingHorizontal: variables.sp3
        },
        ".padderVertical": {
            paddingVertical: variables.sp3
        },
        ".widthForAndriod": {
            width: variables.isAndroid ? '99.5%' : undefined
        },
        flex: 1,
        borderWidth: variables.borderWidth,
        borderRadius: 6,
        borderColor: variables.cardBorderColor,
        flexWrap: "nowrap",
        backgroundColor: variables.cardDefaultBg,
        shadowColor: variables.gray,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3
    };

    return cardTheme;
};
