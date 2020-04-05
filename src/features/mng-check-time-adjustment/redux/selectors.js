import {
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED_STATE_KEY
} from './constants';

export const mngCheckTimeAdjustmentRequested = (state) => state.mngCheckTimeAdjustmentApproval[FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY];
export const mngCheckTimeAdjustmentApproved = (state) => state.mngCheckTimeAdjustmentApproval[FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY];
export const mngCheckTimeAdjustmentRejected = (state) => state.mngCheckTimeAdjustmentApproval[FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED_STATE_KEY];
