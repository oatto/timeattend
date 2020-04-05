import {
    FETCH_MNG_RECOMPENSE_WORKS_REQUESTED_STATE_KEY,
    FETCH_MNG_RECOMPENSE_WORKS_APPROVED_STATE_KEY,
    FETCH_MNG_RECOMPENSE_WORKS_REFJECTED_STATE_KEY
} from './constants';

export const mngRecompenseWorksRequested = (state) => state.mngRecompenseWorksApproval[FETCH_MNG_RECOMPENSE_WORKS_REQUESTED_STATE_KEY];
export const mngRecompenseWorksApproved = (state) => state.mngRecompenseWorksApproval[FETCH_MNG_RECOMPENSE_WORKS_APPROVED_STATE_KEY];
export const mngRecompenseWorksRejected = (state) => state.mngRecompenseWorksApproval[FETCH_MNG_RECOMPENSE_WORKS_REFJECTED_STATE_KEY];
