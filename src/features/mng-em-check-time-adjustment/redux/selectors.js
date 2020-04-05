import {
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY,
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY,
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED_STATE_KEY
} from './constants';

export const mngEmCheckTimeAdjustmentRequested = (state) => state.mngEmCheckTimeAdjustment[FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY];
export const mngEmCheckTimeAdjustmentApproved = (state) => state.mngEmCheckTimeAdjustment[FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY];
export const mngEmCheckTimeAdjustmentRejected = (state) => state.mngEmCheckTimeAdjustment[FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED_STATE_KEY];
