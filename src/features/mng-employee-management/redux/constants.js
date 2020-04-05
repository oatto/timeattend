import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createRequestTypes } from 'react-native-core/api/request/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const GET_MNG_EMPLOYEE_PROFILE = createRequestTypes("GET_MNG_EMPLOYEE_PROFILE");
export const GET_MNG_EMPLOYEE_PROFILE_STATE_KEY = "mngEmployeeProfile";

export const GET_MNG_TAKE_LEAVE_BY_EMPLOYEE = createRequestTypes("GET_MNG_TAKE_LEAVE_BY_EMPLOYEE");
export const GET_MNG_TAKE_LEAVE_BY_EMPLOYEE_STATE_KEY = "mngTakeLeaveByEmployee";

export const MNG_PUSH_MESSAGE_TO_EMPLOYEE = createSubmitTypes("MNG_PUSH_MESSAGE_TO_EMPLOYEE");

export const MNG_GET_EMPLOYEE_PUSH_NOTIFICATION_SETTING = createRequestTypes("MNG_GET_EMPLOYEE_PUSH_NOTIFICATION_SETTING");
export const MNG_EMPLOYEE_PUSH_NOTIFICATION_SETTING_STATE_KEY = "mngEmployeePushNotificationSetting";

export const MNG_UPDATE_EMPLOYEE_PUSH_NOTIFICATION_SETTING = createSubmitTypes("MNG_UPDATE_EMPLOYEE_PUSH_NOTIFICATION_SETTING");

export const MNG_EM_GET_INBOX_MESSAGE = createPaginateTypes("MNG_EM_GET_INBOX_MESSAGE");
export const MNG_EM_GET_INBOX_MESSAGE_STATE_KEY = createPaginateTypes("mngEmInboxMessage");
