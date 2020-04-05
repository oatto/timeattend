import {
    TAKE_LEAVE_REQUEST_BY_REQUESTED_STATE_KEY,
    TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED_STATE_KEY,
    GET_COMPANY_TAKE_LEAVE_SETTINGS_STATE_KEY
} from './constants';

export const takeLeaveRequestByRequested = (state) => state.takeLeave[TAKE_LEAVE_REQUEST_BY_REQUESTED_STATE_KEY];
export const takeLeaveRequestByNoneRequested = (state) => state.takeLeave[TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED_STATE_KEY];
export const companyTakeLeaveSettings = (state) => state.takeLeave[GET_COMPANY_TAKE_LEAVE_SETTINGS_STATE_KEY];
