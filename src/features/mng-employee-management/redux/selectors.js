import {
    GET_MNG_EMPLOYEE_PROFILE_STATE_KEY,
    GET_MNG_TAKE_LEAVE_BY_EMPLOYEE_STATE_KEY,
    MNG_EMPLOYEE_PUSH_NOTIFICATION_SETTING_STATE_KEY,
    MNG_EM_GET_INBOX_MESSAGE_STATE_KEY
} from '_features/mng-employee-management/redux/constants';

export const mngCurrentActiveEmployee = (state) => state.mngEmployeeManagement[GET_MNG_EMPLOYEE_PROFILE_STATE_KEY];
export const mngCurrentIsLoadingEmployee = (state) => state.mngEmployeeManagement[`${GET_MNG_EMPLOYEE_PROFILE_STATE_KEY}isLoading`];
export const mngEmployeeTakeLeaves = (state) => state.mngEmployeeManagement[GET_MNG_TAKE_LEAVE_BY_EMPLOYEE_STATE_KEY];

export const mngEmployeePushNotificationSetting = (state) => state.mngEmployeeManagement[MNG_EMPLOYEE_PUSH_NOTIFICATION_SETTING_STATE_KEY];
export const mngEmInboxMessage = (state) => state.mngEmployeeManagement[MNG_EM_GET_INBOX_MESSAGE_STATE_KEY];
