import LoginScreen from "./screen/LoginScreen";
import LoginQrScreen from "./screen/LoginQrScreen";
import ProfileScreen from "./screen/ProfileScreen";
import DeviceAccessCheckScreen from "./screen/DeviceAccessCheckScreen";
import HolidayScreen from "./screen/HolidayScreen";
import QrProfileScreen from "./screen/QrProfileScreen";
import PrivateKeyScreen from "./screen/PrivateKeyScreen";
import PrivateKeySettingScreen from "./screen/PrivateKeySettingScreen";
import ProfileListScreen from "./screen/ProfileListScreen";
import ProfileInboxMessage from "./screen/ProfileInboxMessage";

export const LOGIN = 'LOGIN';
export const LOGIN_QR = 'LOGIN_QR';
export const PROFILE = 'PROFILE';
export const DEVICE_ACCESS_CHECK = 'DEVICE_ACCESS_CHECK';
export const HOLIDAY = 'HOLIDAY';
export const QR_PROFILE = 'QR_PROFILE';
export const PRIVATE_SETTING_KEY = 'PRIVATE_SETTING_KEY';
export const PROFILE_LIST = 'PROFILE_LIST';
export const PERSONAL_CODE = 'PERSONAL_CODE';
export const PRIVATE_KEY = 'PRIVATE_KEY';
export const PROFILE_INBOX_MESSAGE = 'PROFILE_INBOX_MESSAGE';

const headerStyle = {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: 44,
    display: 'none',
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 0
};

export default {};

export const UserRouter = {
    [LOGIN]: {
        screen: LoginScreen,
        navigationOptions: () => ({
            header: null,
            drawerLockMode: 'locked-closed'
        })
    },
    [LOGIN_QR]: {
        screen: LoginQrScreen,
        navigationOptions: () => ({
            drawerLockMode: 'locked-closed',
            mode: 'modal'
        })
    },
    [DEVICE_ACCESS_CHECK]: {
        screen: DeviceAccessCheckScreen,
        navigationOptions: () => ({
            drawerLockMode: 'locked-closed'
        })
    },
    [PROFILE]: {
        screen: ProfileScreen,
        navigationOptions: headerStyle
    },
    [HOLIDAY]: {
        screen: HolidayScreen
    },
    [QR_PROFILE]: {
        screen: QrProfileScreen
    },
    [PRIVATE_KEY]: {
        screen: PrivateKeyScreen
    },
    [PRIVATE_SETTING_KEY]: {
        screen: PrivateKeySettingScreen
    },
    [PROFILE_LIST]: {
        screen: ProfileListScreen
    },
    [PROFILE_INBOX_MESSAGE]: {
        screen: ProfileInboxMessage
    }
};
