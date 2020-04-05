import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createRequestTypes } from 'react-native-core/api/request/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const FETCH_MNG_TAKE_LEAVE_REQUESTED = createPaginateTypes('FETCH_MNG_TAKE_LEAVE_REQUESTED');
export const FETCH_MNG_TAKE_LEAVE_APPROVED = createPaginateTypes('FETCH_MNG_TAKE_LEAVE_APPROVED');
export const FETCH_MNG_TAKE_LEAVE_REJECTED = createPaginateTypes('FETCH_MNG_TAKE_LEAVE_REJECTED');

export const FETCH_MNG_TAKE_LEAVE_REQUESTED_STATE_KEY = 'fetchMngTakeLeaveRequested';
export const FETCH_MNG_TAKE_LEAVE_APPROVED_STATE_KEY = 'fetchMngTakeLeaveApproved';
export const FETCH_MNG_TAKE_LEAVE_REJECTED_STATE_KEY = 'fetchMngTakeLeaveRejected';

export const MNG_FETCH_TAKE_LEAVE_DETAIL_DATA = "MNG_FETCH_TAKE_LEAVE_DETAIL_DATA";
export const MNG_FETCH_TAKE_LEAVE_DETAIL_DATA_DONE = "MNG_FETCH_TAKE_LEAVE_DETAIL_DATA_DONE";

export const FETCH_TAKE_LEAVE_DATA_BY_EMPLOYEE = createRequestTypes("FETCH_TAKE_LEAVE_DATA_BY_EMPLOYEE");
export const TAKE_LEAVE_DATA_BY_EMPLOYEE_STATE_KEY = 'takeLeaveDataByEmployee';

export const MNG_TAKE_LEAVE_ALL_APPROVE_TRANSITION = createSubmitTypes("MNG_TAKE_LEAVE_ALL_APPROVE_TRANSITION");
export const MNG_TAKE_LEAVE_ALL_REJECT_TRANSITION = createSubmitTypes("MNG_TAKE_LEAVE_ALL_REJECT_TRANSITION");
