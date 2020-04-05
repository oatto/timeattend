import { AbstractRequestAction } from 'react-native-core/api/request/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    CREATE_OUTSIDE_CHECK_IN,
    CREATE_OUTSIDE_CHECK_OUT,
    GET_CHECK_TIME_OUTSIDE_TODAY_LIST,
    FETCH_OUTSIDE_CHECK_TIME_TRANSACTION
} from './constants';

export const getCheckTimeOutsideTodayList = AbstractRequestAction(GET_CHECK_TIME_OUTSIDE_TODAY_LIST);
export const fetchOutsideCheckTimeTransaction = AbstractRequestAction(FETCH_OUTSIDE_CHECK_TIME_TRANSACTION);
export const createOutsideCheckIn = AbstractSubmitAction(CREATE_OUTSIDE_CHECK_IN);
export const createOutsideCheckOut = AbstractSubmitAction(CREATE_OUTSIDE_CHECK_OUT);
