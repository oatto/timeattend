import variable from "./../variables/platform";

export default (variables = variable) => {
    const viewTheme = {
        ".fill": {
            flex: 1,
        },
        ".flex": {
            display: 'flex',
        },
        ".withSpace": {
            marginBottom: variables.sp2
        },
        ".iPhoneXSupport": {
            paddingBottom: variables.isIphoneX ? 22 : 0,
        },
        ".padder": {
            padding: variables.contentPadding
        },
        ".padderVertical": {
            paddingVertical: variables.contentPadding
        },
        ".padderHorizontal": {
            paddingHorizontal: variables.contentPadding,
        },
        ".padderBottom": {
            paddingBottom: variables.contentPadding
        },
        ".transparent": {
            backgroundColor: 'transparent'
        },
        ".withBackground": {
            backgroundColor: variables.contentBg
        },
        ".whiteBackground": {
            backgroundColor: variables.white
        },
        ".row" : {
            flexDirection: 'row'
        }
    };
    return viewTheme;
};
