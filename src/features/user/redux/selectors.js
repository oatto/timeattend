import ref from 'react-native-core/utils/ref';
import {
    USER_PROFILE_STATE_KEY,
    USER_TAKE_LEAVE_STATE_KEY,
    COMPANY_HOLIDAY_STATE_KEY,
    PUSH_PLAYER_ID_STATE_KEY,
    GET_MANAGERS_STATE_KEY,
    DEVICE_ACCESS_CHECK_STATE_KEY,
    DIRECT_MESSAGE_RECEIVED_STATE_KEY,
    GET_INBOX_MESSAGE_STATE_KEY
} from './constants';
import moment from "../../../utils/moment";

export const lastUsername = (state) => state.user.lastUsername;

export const isAnon = (state) => {
    return state.user[USER_PROFILE_STATE_KEY].first_name === 'Anonymous';
};
export const isLogged = (state) => {
    return !!ref(userProfile(state), 'id') && true !== state.user.is_resetting_user;
};
export const isMobileCheckedPass = (state) => {
    return !!ref(state.user[DEVICE_ACCESS_CHECK_STATE_KEY], 'enabled');
};

export const pushPlayerId = (state) => state.user[PUSH_PLAYER_ID_STATE_KEY];
export const userProfile = (state) => state.user[USER_PROFILE_STATE_KEY];
export const userTakeLeave = (state) => state.user[USER_TAKE_LEAVE_STATE_KEY];
export const userInboxMessage = (state) => state.user[GET_INBOX_MESSAGE_STATE_KEY];
export const companyHoliday = (state) => state.user[COMPANY_HOLIDAY_STATE_KEY];

export const userHasPermission = (state, k) => {
    return _userHasPermission(userProfile(state), k);
};

export const _userHasPermission = (user, k) => {
    return !!ref(user, 'setting.' + k);
};

export const companyHolidayGroupWithMonth = (state) => {
    let grouped = {};
    companyHoliday(state).map((data) => {
        const month = moment(data.date).month();
        if (!grouped[month]) {
            grouped[month] = [];
        }

        grouped[month].push(data);
    });

    return grouped;
};
export const managers = (state) => state.user[GET_MANAGERS_STATE_KEY];
export const isManagersLoading = (state) => state.user[`${GET_MANAGERS_STATE_KEY}isLoading`];
export const tokenData = (state) => state.user['token_data'];
export const isDirectMessageVisible = (state) => state.user[DIRECT_MESSAGE_RECEIVED_STATE_KEY].isVisible;
export const directMessageNotification = (state) => state.user[DIRECT_MESSAGE_RECEIVED_STATE_KEY].notification;
