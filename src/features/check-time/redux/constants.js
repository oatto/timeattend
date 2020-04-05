import { createRequestTypes } from 'react-native-core/api/request/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';
import { createPaginateTypes } from 'react-native-core/api/paginate/action';

export const GET_CHECK_TIME_HISTORY = createRequestTypes('GET_CHECK_TIME_HISTORY');
export const CHECK_TIME_HISTORY_STATE_KEY = 'checkTimeHistory';

export const GET_CHECK_TIME_LATEST = createRequestTypes('GET_CHECK_TIME_LATEST');
export const CHECK_TIME_LATEST_STATE_KEY = 'checkTimeLatest';

export const GET_CHECK_TIME_TODAY_LIST = createRequestTypes('GET_CHECK_TIME_TODAY_LIST');
export const CHECK_TIME_TODAY_LIST_STATE_KEY = 'checkTimeTodayList';

export const GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY = createPaginateTypes('GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY');
export const CHECK_TIME_TRANSACTIONS_DAILY_HISTORY_STATE_KEY = 'checkTimeTransactionsDailyHistory';

export const GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY = createPaginateTypes('GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY');
export const CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY_STATE_KEY = 'checkTimeTransactionsOutsideHistory';

export const CREATE_CHECK_IN = createSubmitTypes('CREATE_CHECK_IN');
export const CREATE_CHECK_OUT = createSubmitTypes('CREATE_CHECK_OUT');
export const GET_LOCATION_BY_TOKEN = createRequestTypes("GET_LOCATION_BY_TOKEN");

export const CHECK_TIME_PLACE_TYPE_QR = 'qr';