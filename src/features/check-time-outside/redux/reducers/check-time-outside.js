import moment from '_utils/moment';
import { Alert } from 'react-native';
import { call, fork, put, take } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import requestReducer from 'react-native-core/api/request/reducer';
import { doSubmit } from 'react-native-core/api/submit/saga';
import { NavigationActions } from 'react-navigation';
import Trans from "_features/common/containers/Trans";
import {
    createOutsideCheckIn,
    createOutsideCheckOut,
    getCheckTimeOutsideTodayList,
    fetchOutsideCheckTimeTransaction
} from '../actions'
import {
    CREATE_OUTSIDE_CHECK_IN,
    CREATE_OUTSIDE_CHECK_OUT,
    GET_CHECK_TIME_OUTSIDE_TODAY_LIST,
    CHECK_TIME_OUTSIDE_TODAY_LIST_STATE_KEY,
    FETCH_OUTSIDE_CHECK_TIME_TRANSACTION,
    OUTSIDE_CHECK_TIME_TRANSACTION_STATE_KEY
} from '../constants';
import * as Api from '../../api/check-time-outside';
import { CHECK_TIME_OUTSIDE } from '../../router';

export const watchOutsideCheckInSubmit = function*() {
    while (true) {
        const action = yield take(CREATE_OUTSIDE_CHECK_IN.SUBMIT);

        yield fork(doSubmit, createOutsideCheckIn, {
            apiFunction: Api.checkInOutside,
            args: [action.payload]
        })
    }
};

export const watchOutsideCheckOutSubmit = function*() {
    while (true) {
        const action = yield take(CREATE_OUTSIDE_CHECK_OUT.SUBMIT);

        yield fork(doSubmit, createOutsideCheckOut, {
            apiFunction: Api.checkOutOutside,
            args: [action.payload]
        })
    }
};

export const watchOutsideCheckTimeSuccess = function*() {
    while (true) {
        yield take([CREATE_OUTSIDE_CHECK_IN.SUBMIT_SUCCESS, CREATE_OUTSIDE_CHECK_OUT.SUBMIT_SUCCESS]);

        Alert.alert(Trans.tran('recompense_working.alert_reducer.success'),
            Trans.tran('check_time.alert_reducer.time_saved_success'),
            [{ text: Trans.tran('recompense_working.alert_reducer.ok') }]
        );

        yield put(fetchOutsideCheckTimeTransaction.request());
        yield put(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: CHECK_TIME_OUTSIDE })
            ]
        }));
    }
};

export const watchOutsideCheckTimeFailure = function*() {
    while (true) {
        const action = yield take([CREATE_OUTSIDE_CHECK_IN.SUBMIT_VALIDATION_FAILED, CREATE_OUTSIDE_CHECK_OUT.SUBMIT_VALIDATION_FAILED]);

        // TODO: Validation alert errors response message
        yield put({
            ...action,
            type: '_TRIGGER_REQUEST_FAILURE',
            __meta__: {}
        });
    }
};

export const watchFetchOutsideCheckTimeTransactionRequest = function*() {
    while (true) {
        yield take(FETCH_OUTSIDE_CHECK_TIME_TRANSACTION.REQUEST);

        const date = moment();
        const y = date.format('YYYY');
        const m = date.format('MM');
        const d = date.format('DD');

        yield call(doRequest, fetchOutsideCheckTimeTransaction, {
            apiFunction: Api.getCheckTimeOutSideTodayList,
            args: [y, m, d]
        }, {
            meta: {disabledDisplayGlobalError: true}
        });
    }
};

export const watchGetCheckTimeOutsideTodayListRequest = function*() {
    while (true) {
        yield take(GET_CHECK_TIME_OUTSIDE_TODAY_LIST.REQUEST);

        yield call(doRequest, getCheckTimeOutsideTodayList, Api.getCheckTimeOutsideLatestTodayList, {
            showLoading: false
        });
    }
};

export const checkTimeOutsideTodayListReducer = requestReducer(GET_CHECK_TIME_OUTSIDE_TODAY_LIST, CHECK_TIME_OUTSIDE_TODAY_LIST_STATE_KEY);
export const checkTimeOutsideReducer = requestReducer(FETCH_OUTSIDE_CHECK_TIME_TRANSACTION, OUTSIDE_CHECK_TIME_TRANSACTION_STATE_KEY);
