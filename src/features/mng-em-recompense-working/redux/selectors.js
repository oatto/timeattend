import {
    FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED_STATE_KEY,
    FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED_STATE_KEY,
    FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED_STATE_KEY
} from './constants';

export const mngEmRecompenseWorkingRequested = (state) => state.mngEmRecompenseWorking[FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED_STATE_KEY];
export const mngEmRecompenseWorkingApproved = (state) => state.mngEmRecompenseWorking[FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED_STATE_KEY];
export const mngEmRecompenseWorkingRejected = (state) => state.mngEmRecompenseWorking[FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED_STATE_KEY];
