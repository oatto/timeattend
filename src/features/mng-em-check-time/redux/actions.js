import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractRequestAction } from 'react-native-core/api/request/action';
import { AbstractSubmitAction } from "react-native-core/api/submit/action";
import {
    GET_MNG_EM_CHECK_TIME_HISTORY,
    GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY,
    GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY
} from './constants';

export const getMngEmCheckTimeHistory = AbstractRequestAction(GET_MNG_EM_CHECK_TIME_HISTORY);
export const getMngEmCheckTimeTransactionsDailyHistory = AbstractPaginateAction(GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY);
export const getMngEmCheckTimeTransactionsOutsideHistory = AbstractPaginateAction(GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY);
