import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createRequestTypes } from 'react-native-core/api/request/action';

export const SERVER_TIME_REQUEST = createRequestTypes('SERVER_TIME_REQUEST');
export const SERVER_TIME_REQUEST_STATE_KEY = 'serverDateTime';

export const NOTIFICATION_OPENED = 'NOTIFICATION_OPENED';
export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED';

export const RESET_MONTHLY_FILTER_FORM = 'RESET_MONTHLY_FILTER_FORM';
export const RESET_EMPLOYEE_FILTER_FORM = 'RESET_EMPLOYEE_FILTER_FORM';

export const GET_CURRENT_LOCATION = createRequestTypes('GET_CURRENT_LOCATION');
export const GET_APP_VERSION = createRequestTypes("GET_APP_VERSION");
export const GET_APP_VERSION_STATE_KEY = "appVersion";

export const STATE_REQUESTED_AND_REQUESTED_CANCEL = ['requested', 'requested_cancel'];
export const STATE_REJECTED_AND_CANCELLED = ['rejected', 'cancelled'];

export const NOTIFICATION_TAKE_LEAVE_TYPE = 'take_leave_request';
export const NOTIFICATION_TIME_ADJUSTMENT_TYPE = 'time_adjustment';
export const NOTIFICATION_RECOMPENSE_WORK_TYPE = 'recompense_work_request';
export const NOTIFICATION_DIRECT_MESSAGE_TYPE = 'direct_message';
export const NOTIFICATION_CHECK_TIME_TYPE = 'check_time';
export const NOTIFICATION_MOBILE_ACCESS_TYPE = 'mobile_access';

export const GET_NOTIFICATION_CENTER_LIST = createPaginateTypes("GET_NOTIFICATION_CENTER_LIST");
export const GET_NOTIFICATION_CENTER_LIST_STATE_KEY = "getNotificationCenterList";

export const GET_NOTIFICATION_CENTER_BAGDE = createRequestTypes("GET_NOTIFICATION_CENTER_BAGDE");
export const GET_NOTIFICATION_CENTER_BAGDE_STATE_KEY = "getNotificationCenterBadge";
export const GET_NOTIFICATION_CENTER_BADGE_RESET = 'GET_NOTIFICATION_CENTER_BAGDE_RESET';

export const NOTIFICATION_CENTER_READ = createRequestTypes("NOTIFICATION_CENTER_READ");
export const NOTIFICATION_CENTER_READ_STATE_KEY = "notificationCenterRead";
