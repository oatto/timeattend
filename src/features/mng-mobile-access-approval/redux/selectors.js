import {
    FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL_STATE_KEY,
    FETCH_MNG_MOBILE_ACCESS_APPROVED_STATE_KEY
} from './constants';

export const mngMobileAccessApprovalRequested = (state) => state.mngMobileAccessApproval[FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL_STATE_KEY];
export const mngMobileAccessApproved = (state) => state.mngMobileAccessApproval[FETCH_MNG_MOBILE_ACCESS_APPROVED_STATE_KEY];
