import {
    GET_CHECK_TIME_MONTHLY_STATE_KEY,
    MNG_TAKE_LEAVE_MONTHLY_STATE_KEY,
    MNG_RECOMPENSE_WORK_MONTHLY_STATE_KEY,
    MNG_GET_MY_EMPLOYEES_STATE_KEY
} from './constants';

export const getCheckTimeMonthly = (state) => state.mngMyEmployee[GET_CHECK_TIME_MONTHLY_STATE_KEY];
export const getTakeLeaveMonthly = (state) => state.mngMyEmployee[MNG_TAKE_LEAVE_MONTHLY_STATE_KEY];
export const getRecompenseWorkMonthly = (state) => state.mngMyEmployee[MNG_RECOMPENSE_WORK_MONTHLY_STATE_KEY];
export const mngGetMyEmployees = (state) => state.mngMyEmployee[MNG_GET_MY_EMPLOYEES_STATE_KEY];
