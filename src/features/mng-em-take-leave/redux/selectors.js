import {
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED_STATE_KEY,
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED_STATE_KEY,
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED_STATE_KEY,
    MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE_STATE_KEY,
} from './constants';

export const mngEmTakeLeaveByRequested = (state) => state.mngEmTakeLeave[MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED_STATE_KEY];
export const mngEmTakeLeaveRequestByRejected = (state) => state.mngEmTakeLeave[MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED_STATE_KEY];
export const mngEmTakeLeaveRequestByApproved = (state) => state.mngEmTakeLeave[MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED_STATE_KEY];

export const mngEmTakeLeaveDataTypeByEmployee = (state) => state.mngEmTakeLeave[MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE_STATE_KEY];
