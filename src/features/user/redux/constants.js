import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createRequestTypes } from 'react-native-core/api/request/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const SET_LAST_USERNAME = 'SET_LAST_USERNAME';

export const GET_USER_PROFILE = createRequestTypes('GET_USER_PROFILE');
export const GET_USER_TAKE_LEAVE = createRequestTypes('GET_USER_TAKE_LEAVE');
export const SET_USER_PRIVATE_KEY = createSubmitTypes('SET_USER_PRIVATE_KEY');
export const REMOVE_USER_PRIVATE_KEY = createSubmitTypes('REMOVE_USER_PRIVATE_KEY');

export const USER_PROFILE_STATE_KEY = 'userProfile';
export const USER_TAKE_LEAVE_STATE_KEY = 'userTakeLeave';

export const CHECKED_CURRENT_PRIVATE_KEY = createSubmitTypes('CHECKED_CURRENT_PRIVATE_KEY');
export const CHECKED_CURRENT_PRIVATE_KEY_STATE_KEY = 'checkedCurrentPrivateKey';

export const REMOVE_CHECKED_CURRENT_PRIVATE_KEY = createSubmitTypes('REMOVE_CHECKED_CURRENT_PRIVATE_KEY');

export const GET_COMPANY_HOLIDAY = createRequestTypes('GET_COMPANY_HOLIDAY');
export const COMPANY_HOLIDAY_STATE_KEY = 'companyHoliday';

export const REFRESH_TOKEN = createRequestTypes('REFRESH_TOKEN');

export const REQUEST_NEW_DEVICE_ACCESS = createSubmitTypes('REQUEST_NEW_DEVICE_ACCESS');
export const GET_DEVICE_ACCESS_CHECK = createRequestTypes('GET_DEVICE_ACCESS_CHECK');
export const DEVICE_ACCESS_CHECK_STATE_KEY = 'deviceAccessCheck';

export const LOGIN = createSubmitTypes('LOGIN');
export const LOGIN_VIA_QR = createSubmitTypes('LOGIN_VIA_QR');
export const LOGOUT = createSubmitTypes('LOGOUT');
export const LOGOUT_REMOVE_TOKEN = createSubmitTypes('LOGOUT_REMOVE_TOKEN');

export const SET_PUSH_PLAYER_ID = 'SET_PUSH_PLAYER_ID';
export const SEND_PUSH_REGISTER_TOKEN = createSubmitTypes('SEND_PUSH_REGISTER_TOKEN');

export const PUSH_PLAYER_ID_STATE_KEY = 'pushPlayerId';
export const GET_MANAGERS = createRequestTypes("GET_MANAGERS");
export const GET_MANAGERS_STATE_KEY = "managers";
export const REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN = createSubmitTypes("REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN");
export const FORGOT_PASSWORD = createSubmitTypes("FORGOT_PASSWORD");

export const DIRECT_MESSAGE_RECEIVED = 'DIRECT_MESSAGE_RECEIVED';
export const DIRECT_MESSAGE_CLOSE_REQUEST = 'DIRECT_MESSAGE_CLOSE_REQUEST';
export const DIRECT_MESSAGE_RECEIVED_STATE_KEY = 'directMessageReceived';

export const GET_INBOX_MESSAGE = createPaginateTypes("GET_INBOX_MESSAGE");
export const GET_INBOX_MESSAGE_STATE_KEY = "getInboxMessage";
