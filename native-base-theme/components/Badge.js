import variable from "./../variables/platform";

export default (variables = variable) => {
    const badgeTheme = {
        ".primary": {
            backgroundColor: variables.btnPrimaryBg
        },
        ".warning": {
            backgroundColor: variables.btnWarningBg
        },
        ".info": {
            backgroundColor: variables.btnInfoBg
        },
        ".success": {
            backgroundColor: variables.btnSuccessBg
        },
        ".danger": {
            backgroundColor: variables.btnDangerBg
        },
        "NativeBase.Text": {
            color: variables.badgeColor,
            fontSize: variables.fontSizeBase,
            textAlign: "center",
        },
        backgroundColor: variables.badgeBg,
        padding: variables.badgePadding,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-start",
        borderRadius: 15,
        height: 30,
        width: 30
    };
    return badgeTheme;
};
