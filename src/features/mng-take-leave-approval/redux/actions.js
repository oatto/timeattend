import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractRequestAction } from 'react-native-core/api/request/action';

import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    FETCH_MNG_TAKE_LEAVE_REQUESTED,
    FETCH_MNG_TAKE_LEAVE_APPROVED,
    FETCH_MNG_TAKE_LEAVE_REJECTED,
    MNG_FETCH_TAKE_LEAVE_DETAIL_DATA,
    FETCH_TAKE_LEAVE_DATA_BY_EMPLOYEE,
    MNG_TAKE_LEAVE_ALL_APPROVE_TRANSITION,
    MNG_TAKE_LEAVE_ALL_REJECT_TRANSITION
} from './constants';

export const fetchMngTakeLeaveRequested = AbstractPaginateAction(FETCH_MNG_TAKE_LEAVE_REQUESTED);
export const fetchMngTakeLeaveApproved = AbstractPaginateAction(FETCH_MNG_TAKE_LEAVE_APPROVED);
export const fetchMngTakeLeaveRejected = AbstractPaginateAction(FETCH_MNG_TAKE_LEAVE_REJECTED);

export const fetchMngTakeLeaveDetailWithData = (takeLeave) => ({
    type: MNG_FETCH_TAKE_LEAVE_DETAIL_DATA,
    payload: {
        takeLeave
    }
});

export const fetchTakeLeaveDataByEmployee = AbstractRequestAction(FETCH_TAKE_LEAVE_DATA_BY_EMPLOYEE);

export const mngTakeLeaveAllApproveTransition = AbstractSubmitAction(MNG_TAKE_LEAVE_ALL_APPROVE_TRANSITION);
export const mngTakeLeaveAllRejectTransition = AbstractSubmitAction(MNG_TAKE_LEAVE_ALL_REJECT_TRANSITION);
