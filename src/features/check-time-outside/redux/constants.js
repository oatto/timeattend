import { createRequestTypes } from 'react-native-core/api/request/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const GET_CHECK_TIME_OUTSIDE_TODAY_LIST = createRequestTypes('GET_CHECK_TIME_OUTSIDE_TODAY_LIST');
export const CHECK_TIME_OUTSIDE_TODAY_LIST_STATE_KEY = 'checkTimeOutsideTodayList';

export const CREATE_OUTSIDE_CHECK_IN = createSubmitTypes('CREATE_OUTSIDE_CHECK_IN');
export const CREATE_OUTSIDE_CHECK_OUT = createSubmitTypes('CREATE_OUTSIDE_CHECK_OUT');
export const FETCH_OUTSIDE_CHECK_TIME_TRANSACTION = createRequestTypes('FETCH_OUTSIDE_CHECK_TIME_TRANSACTION');

export const OUTSIDE_CHECK_TIME_TRANSACTION_STATE_KEY = 'outsideCheckTimeTransaction';
