import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractRequestAction } from 'react-native-core/api/request/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    LOGIN,
    LOGOUT,
    LOGIN_VIA_QR,
    REFRESH_TOKEN,
    GET_COMPANY_HOLIDAY,
    GET_USER_PROFILE,
    GET_USER_TAKE_LEAVE,
    GET_DEVICE_ACCESS_CHECK,
    CHECKED_CURRENT_PRIVATE_KEY,
    SET_USER_PRIVATE_KEY,
    REMOVE_USER_PRIVATE_KEY,
    REQUEST_NEW_DEVICE_ACCESS,
    REMOVE_CHECKED_CURRENT_PRIVATE_KEY,
    SET_PUSH_PLAYER_ID,
    SEND_PUSH_REGISTER_TOKEN,
    GET_MANAGERS,
    REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN,
    FORGOT_PASSWORD,
    DIRECT_MESSAGE_RECEIVED,
    DIRECT_MESSAGE_CLOSE_REQUEST,
    GET_INBOX_MESSAGE
} from './constants';

export { setLastUsername } from './reducers/login';

export const getUserProfile = AbstractRequestAction(GET_USER_PROFILE);
export const getUserTakeLeave = AbstractRequestAction(GET_USER_TAKE_LEAVE);
export const checkedUserCurrentPrivateKey = AbstractSubmitAction(CHECKED_CURRENT_PRIVATE_KEY);
export const setUserPrivateKey = AbstractSubmitAction(SET_USER_PRIVATE_KEY);
export const removeUserPrivateKey = AbstractSubmitAction(REMOVE_USER_PRIVATE_KEY);
export const removeCheckedCurrentPrivateKey = AbstractSubmitAction(REMOVE_CHECKED_CURRENT_PRIVATE_KEY);

export const getCompanyHoliday = AbstractRequestAction(GET_COMPANY_HOLIDAY);

export const refreshToken = AbstractRequestAction(REFRESH_TOKEN);
export const getDeviceAccessCheck = AbstractRequestAction(GET_DEVICE_ACCESS_CHECK);

export const recheckDeviceAccess = () => ({
    type: 'RECHECK_DEVICE_ACCESS',
});
export const checkDeviceAccessOnLogin = () => ({
    type: 'RECHECK_DEVICE_ACCESS_ON_LOGIN',
});

export const requestNewDeviceAccess = AbstractSubmitAction(REQUEST_NEW_DEVICE_ACCESS);

export const login = AbstractSubmitAction(LOGIN);
export const loginViaQr = AbstractSubmitAction(LOGIN_VIA_QR);
export const logout = AbstractSubmitAction(LOGOUT);

export const setPushPlayerId = (playerId) => ({
    type: SET_PUSH_PLAYER_ID,
    payload: {
        playerId
    }
});
export const sendPushRegisterToken = AbstractSubmitAction(SEND_PUSH_REGISTER_TOKEN);

export const getManagers = AbstractRequestAction(GET_MANAGERS);

export const regenerateEmployeeIdentifierToken = AbstractSubmitAction(REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN);

export const forgotPassword = AbstractSubmitAction(FORGOT_PASSWORD);

export const directMessageReceived = (payload) => ({
    type: DIRECT_MESSAGE_RECEIVED,
    payload: payload
});

export const directMessageCloseRequest = () => ({
    type: DIRECT_MESSAGE_CLOSE_REQUEST,
});

export const getInboxMessage = AbstractPaginateAction(GET_INBOX_MESSAGE);
