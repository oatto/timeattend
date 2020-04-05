import color from "color";
import isArray from "lodash/isArray";
import { Platform, Dimensions, PixelRatio, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
    platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
const isAndroid = platform === 'android';

const TACHYONS_REM_SCALE = [0, 0.25, 0.5, 1, 2, 4, 8, 16, 32];

const globalStyle = StyleSheet.create({
    inputFrontIcon: {
        marginLeft: 15,
        marginRight: 20
    },
    flex0: {
        flex: 0
    },
    flexGrow0: {
        flexGrow: 0
    },
    w100: {
        width: '100%'
    }
});

export default {
    platformStyle,
    platform,
    isAndroid,
    globalStyle,

    // Android
    androidRipple: true,
    androidRippleColor: "rgba(256, 256, 256, 0.3)",
    androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
    btnUppercaseAndroidText: true,

    // Badge
    badgeBg: "#ED1727",
    badgeColor: "#fff",
    badgePadding: platform === "ios" ? 3 : 0,

    // Button
    get btnFontFamily() {
        return this.fontCustomFamily;
    },
    btnDisabledBg: "#b5b5b5",
    buttonPadding: 8,
    get btnPrimaryBg() {
        return this.brandPrimary;
    },
    get btnPrimaryColor() {
        return this.inverseTextColor;
    },
    get btnInfoBg() {
        return this.brandInfo;
    },
    get btnInfoColor() {
        return this.inverseTextColor;
    },
    get btnSuccessBg() {
        return this.brandSuccess;
    },
    get btnSuccessColor() {
        return this.inverseTextColor;
    },
    get btnDangerBg() {
        return this.brandDanger;
    },
    get btnDangerColor() {
        return this.inverseTextColor;
    },
    get btnWarningBg() {
        return this.brandWarning;
    },
    get btnWarningColor() {
        return this.inverseTextColor;
    },
    get btnTextSize() {
        return platform === "ios" ? this.fontSizeBase * 1.5 : this.fontSizeBase - 1;
    },
    get btnTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get btnTextSizeSmall() {
        return this.fontSizeBase * 0.8;
    },
    get borderRadiusLarge() {
        return 5;
    },
    get iconSizeLarge() {
        return this.iconFontSize * 1.5;
    },
    get iconSizeSmall() {
        return this.iconFontSize * 0.6;
    },

    // Card
    cardDefaultBg: "#fff",
    
    get cardHeaderBgColor() {
        return this.primary;
    },
    get cardBorderColor() {
        return this.grayLighter;
    },

    // CheckBox
    CheckboxRadius: platform === "ios" ? 13 : 0,
    CheckboxBorderWidth: platform === "ios" ? 1 : 2,
    CheckboxPaddingLeft: platform === "ios" ? 4 : 2,
    CheckboxPaddingBottom: platform === "ios" ? 0 : 5,
    CheckboxIconSize: platform === "ios" ? 21 : 14,
    CheckboxIconMarginTop: platform === "ios" ? undefined : 1,
    CheckboxFontSize: platform === "ios" ? 23 / 0.9 : 18,
    DefaultFontSize: 17,
    checkboxBgColor: "#039BE5",
    checkboxSize: 20,
    checkboxTickColor: "#fff",

    // Color
    // Base color
    transparent: 'transparent',
    primary: '#ac152b',
    secondary: '#808184',
    success: '#018412',
    info: '#3d8184',
    danger: '#d9534f',
    warning: '#f0ad4e',
    muted: '#999',
    gray: '#d2d3d5',
    white: '#fff',
    black: '#000',
    green: '#15993f',
    grayLighter: '#ebeaeb',
    red: 'red',

    modalBackgroundColor: 'rgba(210, 211, 213, 0.95)',

    get brandPrimary() {return this.primary;},
    get brandSecondary() {return this.secondary;},
    get brandInfo() {return this.info;},
    get brandSuccess() {return this.success;},
    get brandDanger() {return this.danger;},
    get brandWarning() {return this.warning;},
    get brandDark() {return this.black;},
    get brandLight() {return this.grayLighter;},

    // cant return array without function
    getGradientColor() {
        return [this.brandPrimary, '#c83a31'];
    },
    get gradientColor0() {return this.getGradientColor()[0]},
    get gradientColor1() {return this.getGradientColor()[1]},


    fontFamily: platform === "ios" ? "System" : "Roboto",

    // fontFamilyLight: 'Prompt-Light',
    // fontFamilyRegular: 'Prompt-Regular',
    // fontFamilySemiBold: 'Prompt-SemiBold',
    // fontFamilyBold: 'Prompt-Bold',
    // fontBaseSize: 18,

    fontCustomFamily: 'THSarabunNew',
    fontCustomFamilyBold: 'THSarabunNew-Bold',
    fontCustomSizeBase: isAndroid ? 20 : (deviceWidth > 340 ? 22 : 19),
    iconFontCustomSizeBase: isAndroid ? 18 : (deviceWidth > 340 ? 22 : 19),

    // Font size custom scale
    get fontBaseSize() {return this.fontCustomSizeBase},
    get fontSizeBase() {return this.fontCustomSizeBase},

    get fontSizeH1() {
        return this.fontSizeBase * 1.8;
    },
    get fontSizeH2() {
        return this.fontSizeBase * 1.6;
    },
    get fontSizeH3() {
        return this.fontSizeBase * 1.4;
    },

    get fs1() {return this.fontCustomSizeBase * 3},
    get fs2() {return this.fontCustomSizeBase * 2.25},
    get fs3() {return this.fontCustomSizeBase * 1.5},
    get fs4() {return this.fontCustomSizeBase * 1.25},
    get fs5() {return this.fontCustomSizeBase * 1},
    get fs6() {return this.fontCustomSizeBase * 0.875},
    get fs7() {return this.fontCustomSizeBase * 0.675},

    // Spacing size custom scale
    get sp0() {return TACHYONS_REM_SCALE[0] * this.fontCustomSizeBase},
    get sp1() {return TACHYONS_REM_SCALE[1] * this.fontCustomSizeBase},
    get sp2() {return TACHYONS_REM_SCALE[2] * this.fontCustomSizeBase},
    get sp3() {return TACHYONS_REM_SCALE[3] * this.fontCustomSizeBase},
    get sp4() {return TACHYONS_REM_SCALE[4] * this.fontCustomSizeBase},
    get sp5() {return TACHYONS_REM_SCALE[5] * this.fontCustomSizeBase},
    get sp6() {return TACHYONS_REM_SCALE[6] * this.fontCustomSizeBase},
    get sp7() {return TACHYONS_REM_SCALE[7] * this.fontCustomSizeBase},
    get sp8() {return TACHYONS_REM_SCALE[8] * this.fontCustomSizeBase},

    get ifs1() {return this.iconFontCustomSizeBase * 3},
    get ifs2() {return this.iconFontCustomSizeBase * 2.25},
    get ifs3() {return this.iconFontCustomSizeBase * 1.5},
    get ifs4() {return this.iconFontCustomSizeBase * 1.25},
    get ifs5() {return this.iconFontCustomSizeBase * 1},
    get ifs6() {return this.iconFontCustomSizeBase * 0.875},
    get ifs7() {return this.iconFontCustomSizeBase * 0.675},

    // Footer
    footerHeight: 60,
    footerDefaultBg: platform === "ios" ? "#F8F8F8" : "#4179F7",
    footerPaddingBottom: isIphoneX ? 34 : 0,

    // FooterTab
    tabBarTextColor: "#2874F0",
    tabBarTextSize: platform === "ios" ? 14 : 11,
    activeTab: "#fff",
    sTabBarActiveTextColor: "#007aff",
    tabBarActiveTextColor: "#2874F0",
    tabActiveBgColor: "#cde1f9",

    // Header
    toolbarBtnColor: "#007aff",
    toolbarDefaultBg: platform === "ios" ? "#F8F8F8" : "#3F51B5",
    toolbarHeight: platform === "ios" ? (isIphoneX ? 64 : 64) : 56,
    toolbarSearchIconSize: platform === "ios" ? 20 : 23,
    toolbarInputColor: platform === "ios" ? "#CECDD2" : "#fff",
    searchBarHeight: platform === "ios" ? 30 : 40,
    searchBarInputHeight: platform === "ios" ? 30 : 50,
    toolbarBtnTextColor: "#000",
    toolbarDefaultBorder: "#a7a6ab",
    iosStatusbar: platform === "ios" ? "dark-content" : "light-content",
    get statusBarColor() {
        return color(this.toolbarDefaultBg)
            .darken(0.2)
            .hex();
    },
    get darkenHeader() {
        return color(this.tabBgColor)
            .darken(0.03)
            .hex();
    },

    // Icon
    iconFamily: "Ionicons",
    iconFontSize: platform === "ios" ? 30 : 28,
    iconHeaderSize: platform === "ios" ? 33 : 24,
    iconActiveColor: '#323133',

    // InputGroup
    get inputFontSize() {
        return this.fontCustomSizeBase;
    },
    inputBorderColor: "#D9D5DC",
    inputSuccessBorderColor: "#2b8339",
    inputErrorBorderColor: "#ed2f2f",
    inputBorderRadius: 3,
    inputBorderWidth: 1,
    inputHeightBase: 40,
    inputGroupRoundedBorderRadius: 30,
    inputMarginBottom: 14,
    inputPaddingHorizontal: 14,
    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return "#999999";
    },

    // Line Height
    btnLineHeight: 22,
    btnModalLineHieght: 24,
    lineHeightH1: 32,
    lineHeightH2: 27,
    lineHeightH3: 22,
    lineHeight: platform === "ios" ? 20 : 24,

    // List
    listBg: "#fff",
    get listBorderColor() {
        return this.transparent;
    },
    listDividerBg: "#f4f4f4",
    listBtnUnderlayColor: "#DDD",
    listItemPadding: platform === "ios" ? 0 : 0,
    listNoteColor: "#808080",
    listNoteSize: 13,

    // Progress Bar
    defaultProgressColor: "#E4202D",
    inverseProgressColor: "#1A191B",

    // Radio Button
    radioBtnSize: platform === "ios" ? 25 : 23,
    radioSelectedColorAndroid: "#3F51B5",
    radioBtnLineHeight: platform === "ios" ? 29 : 24,
    get radioColor() {
        return this.brandPrimary;
    },

    // Segment
    segmentBackgroundColor: platform === "ios" ? "#F8F8F8" : "#3F51B5",
    segmentActiveBackgroundColor: platform === "ios" ? "#007aff" : "#fff",
    segmentTextColor: platform === "ios" ? "#007aff" : "#fff",
    segmentActiveTextColor: platform === "ios" ? "#fff" : "#3F51B5",
    segmentBorderColor: platform === "ios" ? "#007aff" : "#fff",
    segmentBorderColorMain: platform === "ios" ? "#a7a6ab" : "#3F51B5",

    // Spinner
    defaultSpinnerColor: "#45D56E",
    inverseSpinnerColor: "#1A191B",

    // Tab
    tabDefaultBg: platform === "ios" ? "transparent" : "transparent",
    get topTabBarTextColor() {return platform === "ios" ? this.primary : this.primary;} ,
    get topTabBarActiveTextColor() {return platform === "ios" ? this.white : this.white;} ,
    get topTabBarBorderColor() {return platform === "ios" ? this.transparent : this.transparent;} ,
    get topTabBarActiveBorderColor() {return platform === "ios" ? this.transparent : this.transparent;} ,

    // Tabs
    tabBgColor: "#F8F8F8",
    tabFontSize: 15,

    // Text
    textColor: "#2a2a2a",
    inverseTextColor: "#fff",
    noteFontSize: 14,
    get defaultTextColor() {
        return this.textColor;
    },

    // Title
    titleFontfamily: platform === "ios" ? "System" : "Roboto_medium",
    titleFontSize: platform === "ios" ? 17 : 19,
    subTitleFontSize: platform === "ios" ? 12 : 14,
    subtitleColor: platform === "ios" ? "#8e8e93" : "#FFF",
    titleFontColor: platform === "ios" ? "#000" : "#FFF",

    // Other
    borderRadiusBase: platform === "ios" ? 5 : 2,
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    contentPadding: 12,
    contentBg: '#f3f3f3',
    dropdownLinkColor: "#414142",
    inputLineHeight: 24,
    keyboardBehavior: isAndroid ? null : 'padding',
    keyboardVerticalOffset: isAndroid ? 0 : 10,
    deviceWidth,
    deviceHeight,
    isIphoneX,
    boxShadow: {
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },


    getKeyColorForState: function(state) {
        switch (state) {
            case 'requested':
                return 'warning';
            case 'cancelled':
                return 'gray';
            case 'approved':
                return 'success';
            case 'rejected':
                return 'danger';
            case 'requested_cancel':
                return 'warning';
        }

        return 'textColor';
    },

    //For App Employee
    getTransitionForState: function(state) {
        switch (state) {
            case 'approved':
                return {
                    state: 'request_cancel',
                    translationTitle: 'general.alert.cancel_from_approve_title',
                    translationDescription: 'general.alert.cancel_from_approve_description'
                };
            case 'requested':
                return {
                    state: 'cancel',
                    translationTitle: 'general.alert.cancel_request_cancel_title',
                    translationDescription: 'general.alert.cancel_request_cancel_description'
                };
            case 'requested_cancel':
                return {
                    state: 'cancel_request_cancel',
                    translationTitle: 'general.alert.cancel_request_cancel_title',
                    translationDescription: 'general.alert.cancel_request_cancel_description'
                };
        }
    },

    //For App Manager
    getMngApproveTransitionFromState: function(state) {
        switch (state) {
            case 'requested':
                return {
                    state: 'approve',
                    translationTitle: '',
                    translationDescription: ''
                };
            case 'requested_cancel':
                return {
                    state: 'approve_cancel',
                    translationTitle: 'general.alert.approve_cancel_title',
                    translationDescription: 'general.alert.approve_cancel_description'
                };

        }
    },

    //For App Manager
    getMngRejectTransitionFromState: function(state) {
        switch (state) {
            case 'requested':
                return 'reject';
            case 'requested_cancel':
                return 'reject_cancel';
            case 'approved':
                return 'cancel_after_approve'
        }
    },

    combineStyles: function(/* arg1, arg2, ... */) {
        let styles = [];

        for (let i = 0; i < arguments.length; i++) {
            if (isArray(arguments[i])) {
                styles = [
                    ...styles,
                    ...arguments[i],
                ]
            } else {
                styles = [
                    ...styles,
                    arguments[i],
                ]
            }
        }

        return styles;
    },
};
