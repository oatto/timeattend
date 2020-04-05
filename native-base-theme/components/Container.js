import { Platform, Dimensions } from "react-native";

import variable from "./../variables/platform";

const deviceHeight = Dimensions.get("window").height;
export default (variables = variable) => {
    const theme = {
        flex: 1,
        height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20,
        backgroundColor: 'white',
        ".iPhoneXSupport": {
            paddingBottom: variables.isIphoneX ? 34 : 0,
        },
        ".withBackground": {
            backgroundColor: variables.contentBg
        }
    };

    return theme;
};
