import { call, fork, select, take } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import { doSubmit } from 'react-native-core/api/submit/saga';
import indexReducer from 'react-native-core/api/paginate/reducer';
import * as Api from '../../api/mng-em-check-time';
import {
    GET_MNG_EM_CHECK_TIME_HISTORY,
    GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY,
    GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY,
    MNG_EM_CHECK_TIME_HISTORY_STATE_KEY,
    MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_STATE_KEY,
    MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_STATE_KEY
} from '../constants';
import {
    getMngEmCheckTimeHistory,
    getMngEmCheckTimeTransactionsDailyHistory,
    getMngEmCheckTimeTransactionsOutsideHistory
} from '../actions';

export const watchMngEmCheckTimeHistoryRequest = function*() {
    while (true) {
        const { payload } = yield take(GET_MNG_EM_CHECK_TIME_HISTORY.REQUEST);
        yield call(doRequest, getMngEmCheckTimeHistory, {
            apiFunction: Api.getMngEmCheckTimeHistory,
            args: [
                payload
            ]
        });
    }
};

export const watchMngEmCheckTimeTransactionsDailyHistory = function*() {
    while (true) {
        const action = yield take([
            GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY.REQUEST,
            GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY.LOADMORE,
            GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY.REFRESH
        ]);
        const data = yield select((state) => state.mngEmCheckTimeTransactionsHistory[MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_STATE_KEY]);

        yield fork(doRequest, getMngEmCheckTimeTransactionsDailyHistory, {
            apiFunction: Api.getMngEmCheckTimeTransactionsDaily,
            args: [
                action.payload,
                (action.type === GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY.LOADMORE) ? data.pagination.currentPage + 1 : 1,
            ]
        }, {showLoading: action.type === GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY.REQUEST})
    }
};

export const watchMngEmCheckTimeTransactionsOutsideHistory = function*() {
    while (true) {
        const action = yield take([
            GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY.REQUEST,
            GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY.LOADMORE,
            GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY.REFRESH
        ]);
        const data = yield select((state) => state.mngEmCheckTimeTransactionsHistory[MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_STATE_KEY]);

        yield fork(doRequest, getMngEmCheckTimeTransactionsOutsideHistory, {
            apiFunction: Api.getMngEmCheckTimeTransactionsOutside,
            args: [
                action.payload,
                (action.type === GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY.LOADMORE) ? data.pagination.currentPage + 1 : 1,
            ]
        }, {showLoading: action.type === GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY.REQUEST})
    }
};

export function mngEmCheckTimeReducer(state, action) {
    switch (action.type) {
        case GET_MNG_EM_CHECK_TIME_HISTORY.REQUEST: {
            return {
                ...state,
                [MNG_EM_CHECK_TIME_HISTORY_STATE_KEY]: [],
            }
        }
        case GET_MNG_EM_CHECK_TIME_HISTORY.SUCCESS: {
            return {
                ...state,
                [MNG_EM_CHECK_TIME_HISTORY_STATE_KEY]: action.data,
            }
        }
        default:
            return state;
    }
}

export const reducerMngEmCheckTimeTransactionsDailyHistory = indexReducer(
    GET_MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY,
    MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_STATE_KEY
);

export const reducerMngEmCheckTimeTransactionsOutsideHistory = indexReducer(
    GET_MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY,
    MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_STATE_KEY
);
