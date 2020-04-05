import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractRequestAction } from 'react-native-core/api/request/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    GET_MNG_EMPLOYEE_PROFILE,
    GET_MNG_TAKE_LEAVE_BY_EMPLOYEE,
    MNG_PUSH_MESSAGE_TO_EMPLOYEE,
    MNG_GET_EMPLOYEE_PUSH_NOTIFICATION_SETTING,
    MNG_UPDATE_EMPLOYEE_PUSH_NOTIFICATION_SETTING,
    MNG_EM_GET_INBOX_MESSAGE
} from './constants';

export const getMngEmployeeProfile = AbstractRequestAction(GET_MNG_EMPLOYEE_PROFILE);
export const getMngTakeLeaveByEmployee = AbstractRequestAction(GET_MNG_TAKE_LEAVE_BY_EMPLOYEE);
export const mngPushMessageToEmployee = AbstractSubmitAction(MNG_PUSH_MESSAGE_TO_EMPLOYEE);

export const mngGetEmployeePushNotificationSetting = AbstractRequestAction(MNG_GET_EMPLOYEE_PUSH_NOTIFICATION_SETTING);
export const mngUpdateEmployeePushNotificationSetting = AbstractSubmitAction(MNG_UPDATE_EMPLOYEE_PUSH_NOTIFICATION_SETTING);

export const mngEmGetInboxMessage = AbstractPaginateAction(MNG_EM_GET_INBOX_MESSAGE);
