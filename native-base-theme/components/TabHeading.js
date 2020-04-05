import { styles as s } from "react-native-style-tachyons";
import variable from "./../variables/platform";

export default (variables = variable) => {
    const platform = variables.platform;

    const tabHeadingTheme = {
        flexDirection: "row",
        backgroundColor: variables.tabDefaultBg,
        flex: variables.isAndroid ? 1 : 0,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: variables.isAndroid ? 1 : 0.5,
        borderColor: variables.primary,
        marginVertical: 10,
        paddingVertical: 2,
        ".scrollable": {
            paddingHorizontal: 20,
            flex: platform === "android" ? 0 : 1,
            minWidth: platform === "android" ? undefined : 60
        },
        "NativeBase.Text": {
            color: variables.topTabBarTextColor,
            fontFamily: variables.fontCustomFamily,
            fontSize: variables.fs5,
            marginHorizontal: 7,
            textAlign: 'center',
            paddingVertical: 5
        },
        "NativeBase.Icon": {
            color: variables.topTabBarTextColor,
            fontSize: platform === "ios" ? 26 : undefined
        },
        ".first": {
            borderTopLeftRadius: variables.borderRadiusBase,
            borderBottomLeftRadius: variables.borderRadiusBase,

            // FIX: Need to know why add this and color bug has gone
            borderTopRightRadius: variables.isAndroid ? 0 : 1,
        },
        ".last": {
            borderTopRightRadius: variables.borderRadiusBase,
            borderBottomRightRadius: variables.borderRadiusBase,

            // FIX: Need to know why add this and color bug has gone
            borderTopLeftRadius: variables.isAndroid ? 0 : 1,
        },
        ".active": {
            backgroundColor: variables.primary,
            "NativeBase.Text": {
                color: variables.topTabBarActiveTextColor,
                fontFamily: variable.fontCustomFamily
            },
            "NativeBase.Icon": {
                color: variables.topTabBarActiveTextColor
            }
        },
    };

    return tabHeadingTheme;
};
