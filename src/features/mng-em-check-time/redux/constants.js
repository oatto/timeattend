import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createRequestTypes } from 'react-native-core/api/request/action';
import { createSubmitTypes } from "react-native-core/api/submit/action";

export const GET_MNG_EM_CHECK_TIME_HISTORY = createRequestTypes('GET_MNG_EM_CHECK_TIME_HISTORY');
export const GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY = createPaginateTypes('GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY');
export const GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY = createPaginateTypes('GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY');

export const MNG_EM_CHECK_TIME_HISTORY_STATE_KEY = 'mngEmCheckTimeHistory';
export const MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_STATE_KEY = 'mngEmCheckTimeTransactionsDailyHistory';
export const MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_STATE_KEY = 'mngEmCheckTimeTransactionsOutsideHistory';
