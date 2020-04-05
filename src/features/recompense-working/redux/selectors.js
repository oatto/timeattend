import {
    RECOMPENSE_WORKING_BY_REQUESTED_STATE_KEY,
    RECOMPENSE_WORKING_BY_NONE_REQUESTED_STATE_KEY
} from './constants';

export const getRecompenseWorkingRequested = (state) => state.recompenseWorking[RECOMPENSE_WORKING_BY_REQUESTED_STATE_KEY];
export const getRecompenseWorkingNoneRequested = (state) => state.recompenseWorking[RECOMPENSE_WORKING_BY_NONE_REQUESTED_STATE_KEY];
