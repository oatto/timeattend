import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractRequestAction } from 'react-native-core/api/request/action';
import {
    SERVER_TIME_REQUEST,
    NOTIFICATION_OPENED,
    NOTIFICATION_RECEIVED,
    GET_APP_VERSION,
    GET_CURRENT_LOCATION,
    RESET_MONTHLY_FILTER_FORM,
    RESET_EMPLOYEE_FILTER_FORM,
    GET_NOTIFICATION_CENTER_LIST,
    GET_NOTIFICATION_CENTER_BAGDE,
    GET_NOTIFICATION_CENTER_BADGE_RESET,
    NOTIFICATION_CENTER_READ
} from './constants';

export const serverTimeRequestAction = AbstractRequestAction(SERVER_TIME_REQUEST);

export const notificationOpened = (payload) => ({
    type: NOTIFICATION_OPENED,
    payload
});

export const notificationReceived = (payload) => ({
    type: NOTIFICATION_RECEIVED,
    payload
});

export const getCurrentLocation = AbstractRequestAction(GET_CURRENT_LOCATION);

export const getAppVersion = AbstractRequestAction(GET_APP_VERSION);

export const resetMonthlyFilterForm = (payload) => ({
    type: RESET_MONTHLY_FILTER_FORM,
    payload
});

export const resetEmployeeFilterForm = (payload) => ({
    type: RESET_EMPLOYEE_FILTER_FORM,
    payload
});

export const getNotificationCenterList = AbstractPaginateAction(GET_NOTIFICATION_CENTER_LIST);
export const getNotificationCenterBagde = AbstractRequestAction(GET_NOTIFICATION_CENTER_BAGDE);
export const resetNotificationCenterBadge = (payload) => ({
    type: GET_NOTIFICATION_CENTER_BADGE_RESET,
    payload
});

export const notificationCenterRead = AbstractRequestAction(NOTIFICATION_CENTER_READ);
