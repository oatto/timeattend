import {
    TIME_ADJUSTMENT_BY_REQUESTED_STATE_KEY,
    TIME_ADJUSTMENT_IS_NOT_REQUESTED_STATE_KEY
} from './constants';

export const getCheckTimeAdjustmentRequested = (state) => state.checkTimeAdjustment[TIME_ADJUSTMENT_BY_REQUESTED_STATE_KEY];
export const getCheckTimeAdjustmentIsNotRequested = (state) => state.checkTimeAdjustment[TIME_ADJUSTMENT_IS_NOT_REQUESTED_STATE_KEY];
