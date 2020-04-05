import {
    OUTSIDE_CHECK_TIME_TRANSACTION_STATE_KEY,
    CHECK_TIME_OUTSIDE_TODAY_LIST_STATE_KEY
} from './constants';

export const checkTimeOutsideTransaction = (state) => state.checkTimeOutside[OUTSIDE_CHECK_TIME_TRANSACTION_STATE_KEY];
export const checkTimeOutsideTodayTransaction = (state) => state.checkTimeOutside[CHECK_TIME_OUTSIDE_TODAY_LIST_STATE_KEY];
