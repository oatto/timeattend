import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createRequestTypes } from 'react-native-core/api/request/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const GET_TAKE_LEAVE_REQUEST_BY_REQUESTED = createPaginateTypes('GET_TAKE_LEAVE_REQUEST_BY_REQUESTED');
export const GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED = createPaginateTypes('GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED');

export const TAKE_LEAVE_REQUEST_BY_REQUESTED_STATE_KEY = 'takeLeaveRequestByRequested';
export const TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED_STATE_KEY = 'takeLeaveRequestByNoneRequested';

export const TAKE_LEAVE_REQUEST_CREATE = createSubmitTypes('TAKE_LEAVE_REQUEST_CREATE');
export const GET_COMPANY_TAKE_LEAVE_SETTINGS = createRequestTypes("GET_COMPANY_TAKE_LEAVE_SETTINGS");
export const GET_COMPANY_TAKE_LEAVE_SETTINGS_STATE_KEY = "company_take_leave_settings";

export const TAKE_LEAVE_ALL_CANCEL_TRANSITION = createSubmitTypes("TAKE_LEAVE_ALL_CANCEL_TRANSITION");
