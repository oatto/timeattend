import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createRequestTypes } from 'react-native-core/api/request/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const GET_MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE = createRequestTypes('GET_MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE');

export const GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED = createPaginateTypes('GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED');
export const GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED = createPaginateTypes('GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED');
export const GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED = createPaginateTypes('GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED');

export const MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE_STATE_KEY = 'mngEmTakeLeaveTypeDataByEmployee';

export const MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED_STATE_KEY = 'mngEmTakeLeaveRequestByUserAndRequested';
export const MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED_STATE_KEY = 'mngEmTakeLeaveRequestByUserAndRejected';
export const MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED_STATE_KEY = 'mngEmTakeLeaveRequestByUserAndApproved';

export const MNG_EM_TAKE_LEAVE_CREATE_BY_EMPLOYEE = createSubmitTypes("MNG_EM_TAKE_LEAVE_CREATE_BY_EMPLOYEE");

export const MNG_EM_TAKE_LEAVE_ALL_APPROVE_TRANSITION = createSubmitTypes("MNG_EM_TAKE_LEAVE_ALL_APPROVE_TRANSITION");
export const MNG_EM_TAKE_LEAVE_ALL_REJECT_TRANSITION = createSubmitTypes("MNG_EM_TAKE_LEAVE_ALL_REJECT_TRANSITION");
