import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractRequestAction } from 'react-native-core/api/request/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED,
    GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED,
    GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED,
    GET_MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE,
    MNG_EM_TAKE_LEAVE_CREATE_BY_EMPLOYEE,
    MNG_EM_TAKE_LEAVE_ALL_APPROVE_TRANSITION,
    MNG_EM_TAKE_LEAVE_ALL_REJECT_TRANSITION
} from './constants';

export const getMngEmTakeLeaveTypeDataByEmployee = AbstractRequestAction(GET_MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE);

export const getMngEmTakeLeaveRequestByUserAndRequested = AbstractPaginateAction(GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED);
export const getMngEmTakeLeaveRequestByUserAndRejected = AbstractPaginateAction(GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED);
export const getMngEmTakeLeaveRequestByUserAndApproved = AbstractPaginateAction(GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED);

export const mngEmTakeLeaveCreateByEmployee = AbstractSubmitAction(MNG_EM_TAKE_LEAVE_CREATE_BY_EMPLOYEE);

export const mngEmTakeLeaveAllApproveTransition = AbstractSubmitAction(MNG_EM_TAKE_LEAVE_ALL_APPROVE_TRANSITION);
export const mngEmTakeLeaveAllRejectTransition = AbstractSubmitAction(MNG_EM_TAKE_LEAVE_ALL_REJECT_TRANSITION);
