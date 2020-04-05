import ref from "react-native-core/utils/ref";
import {
    FETCH_MNG_TAKE_LEAVE_REQUESTED_STATE_KEY,
    FETCH_MNG_TAKE_LEAVE_APPROVED_STATE_KEY,
    FETCH_MNG_TAKE_LEAVE_REJECTED_STATE_KEY, TAKE_LEAVE_DATA_BY_EMPLOYEE_STATE_KEY
} from './constants';

export const mngTakeLeaveRequested = (state) => state.mngTakeLeaveApproval[FETCH_MNG_TAKE_LEAVE_REQUESTED_STATE_KEY];
export const mngTakeLeaveApproved = (state) => state.mngTakeLeaveApproval[FETCH_MNG_TAKE_LEAVE_APPROVED_STATE_KEY];
export const mngTakeLeaveRejected = (state) => state.mngTakeLeaveApproval[FETCH_MNG_TAKE_LEAVE_REJECTED_STATE_KEY];

export const mngEmployeeTakeLeave = (state) => state.mngTakeLeaveApproval[TAKE_LEAVE_DATA_BY_EMPLOYEE_STATE_KEY];
export const mngEmployeeTakeLeaveByEmployee = (state, employeeId) => ref(state.mngTakeLeaveApproval, `${TAKE_LEAVE_DATA_BY_EMPLOYEE_STATE_KEY}.${employeeId}`);
export const mngIsTakeLeaveDetailLoading = (state) => state.mngTakeLeaveApproval.isTakeLeaveDetailLoading;
