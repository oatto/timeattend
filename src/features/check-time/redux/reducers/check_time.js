import { Alert } from 'react-native';
import { call, fork, put, take, takeLatest, select } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import { doSubmit } from 'react-native-core/api/submit/saga';
import { NavigationActions } from 'react-navigation';
import indexReducer from 'react-native-core/api/paginate/reducer';
import { resetNotificationCenterBadge } from '_features/common/redux/actions';
import { DASHBOARD } from '_features/common/router';
import { CHECK_TIME } from '_features/check-time/router';
import {
    createCheckIn,
    createCheckOut,
    getCheckTimeLatest,
    getCheckTimeHistory,
    getCheckTimeTodayList,
    getCheckTimeTransactionsDailyHistory,
    getCheckTimeTransactionsOutsideHistory,
    getLocationByToken
} from '../actions'
import {
    CREATE_CHECK_IN,
    CREATE_CHECK_OUT,
    GET_CHECK_TIME_LATEST,
    GET_CHECK_TIME_HISTORY,
    GET_CHECK_TIME_TODAY_LIST,
    GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY,
    GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY,
    CHECK_TIME_LATEST_STATE_KEY,
    CHECK_TIME_HISTORY_STATE_KEY,
    CHECK_TIME_TODAY_LIST_STATE_KEY,
    CHECK_TIME_TRANSACTIONS_DAILY_HISTORY_STATE_KEY,
    CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY_STATE_KEY,
    GET_LOCATION_BY_TOKEN
} from '../constants';
import * as Api from '../../api/check-time';
import Trans from "../../../common/containers/Trans";
import * as LocationApi from '../../../location/api/location';

export const watchCheckInSubmit = function*() {
    while (true) {
        const action = yield take(CREATE_CHECK_IN.SUBMIT);

        yield fork(doSubmit, createCheckIn, {
            apiFunction: Api.checkIn,
            args: [action.payload]
        })
    }
};

export const watchCheckOutSubmit = function*() {
    while (true) {
        const action = yield take(CREATE_CHECK_OUT.SUBMIT);

        yield fork(doSubmit, createCheckOut, {
            apiFunction: Api.checkOut,
            args: [action.payload]
        })
    }
};

export const watchCheckTimeSuccess = function*() {
    while (true) {
        yield take([CREATE_CHECK_IN.SUBMIT_SUCCESS, CREATE_CHECK_OUT.SUBMIT_SUCCESS]);

        Alert.alert(Trans.tran('recompense_working.alert_reducer.success'),
            Trans.tran('check_time.alert_reducer.time_saved_success'),
            [{ text: Trans.tran('recompense_working.alert_reducer.ok') }]
        );

        yield put(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: DASHBOARD })
            ]
        }));
    }
};

export const watchGetCheckTimeLatestRequest = function*() {
    while (true) {
        yield take(GET_CHECK_TIME_LATEST.REQUEST);

        yield call(doRequest, getCheckTimeLatest, Api.getCheckTimeLatest, {
            showLoading: false,
            meta: {disabledDisplayGlobalError: true}
        });

        yield put(resetNotificationCenterBadge());
    }
};

export const watchGetCheckTimeTodayListRequest = function*() {
    while (true) {
        yield take(GET_CHECK_TIME_TODAY_LIST.REQUEST);

        yield call(doRequest, getCheckTimeTodayList, Api.getCheckTimeTodayList, {
            showLoading: false
        });
    }
};

export const watchGetCheckTimeHistoryRequest = function*() {
    while (true) {
        const { payload } = yield take(GET_CHECK_TIME_HISTORY.REQUEST);
        yield call(doRequest, getCheckTimeHistory, {
            apiFunction: Api.getCheckTimeHistory,
            args: [
                payload.year,
                payload.month,
            ]
        });
    }
};

export const watchGetCheckTimeTransactionsDailyHistoryRequest = function*() {
    while (true) {
        const action = yield take([
            GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY.REQUEST,
            GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY.LOADMORE,
            GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY.REFRESH
        ]);

        const data = yield select((state) => state.checkTime[CHECK_TIME_TRANSACTIONS_DAILY_HISTORY_STATE_KEY]);

        yield fork(doRequest, getCheckTimeTransactionsDailyHistory, {
            apiFunction: Api.getCheckTimeTransactionsDailyHistory,
            args: [
                (action.type === GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY.REQUEST});
    }
};

export const watchGetCheckTimeTransactionsOutsideHistoryRequest = function*() {
    while (true) {
        const action = yield take([
            GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY.REQUEST,
            GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY.LOADMORE,
            GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY.REFRESH
        ]);

        const data = yield select((state) => state.checkTime[CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY_STATE_KEY]);

        yield fork(doRequest, getCheckTimeTransactionsOutsideHistory, {
            apiFunction: Api.getCheckTimeTransactionsOutsideHistory,
            args: [
                (action.type === GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY.REQUEST});
    }
};

export function checkTimeReducer(state, action) {
    switch (action.type) {
        case GET_CHECK_TIME_LATEST.REQUEST: {
            return {
                ...state,
                [CHECK_TIME_LATEST_STATE_KEY]: undefined,
                checkTimeLatestLoading: true // see DASHBOARDSCEEEN FOR LOADING
            }
        }
        case GET_CHECK_TIME_LATEST.SUCCESS: {
            return {
                ...state,
                [CHECK_TIME_LATEST_STATE_KEY]: action.data,
                checkTimeLatestLoading: false
            }
        }
        case GET_CHECK_TIME_LATEST.FAILURE: {
            return {
                ...state,
                [CHECK_TIME_LATEST_STATE_KEY]: action.data,
                checkTimeLatestLoading: false
            }
        }
        case GET_CHECK_TIME_TODAY_LIST.SUCCESS: {
            return {
                ...state,
                [CHECK_TIME_TODAY_LIST_STATE_KEY]: action.data,
            }
        }
        case GET_CHECK_TIME_HISTORY.REQUEST: {
            return {
                ...state,
                [CHECK_TIME_HISTORY_STATE_KEY]: [],
            }
        }
        case GET_CHECK_TIME_HISTORY.SUCCESS: {
            return {
                ...state,
                [CHECK_TIME_HISTORY_STATE_KEY]: action.data,
            }
        }
        default:
            return state;
    }
}

export const watchSelectLocaionByQrCode = function*() {
    yield takeLatest('SELECT_LOCATION_BY_QR_CODE', function*({payload}) {
        yield put(getLocationByToken.request({
            token: payload.token
        }));

        const { data } = yield take(GET_LOCATION_BY_TOKEN.SUCCESS);

        yield put(NavigationActions.navigate({ routeName: CHECK_TIME, params: {
            checkType: {
                typeName: payload.forwardedParams.typeName,
                typeValue: payload.forwardedParams.typeValue,
            },
            place: data,
            deviceLatitude: payload.forwardedParams.coordinate.latitude,
            deviceLongitude: payload.forwardedParams.coordinate.longitude
        } }));
    });
};

export const watchGetLocationByTokenRequest = function*() {
    yield takeLatest(GET_LOCATION_BY_TOKEN.REQUEST, function*(action) {
        // do staff
        yield call(doRequest, getLocationByToken, {
            apiFunction: LocationApi.getLocationWithToken,
            args: [action.payload.token]
        })
    });
};

export const reducerCheckTimeTransactionsDaily = indexReducer(GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY, CHECK_TIME_TRANSACTIONS_DAILY_HISTORY_STATE_KEY);
export const reducerCheckTimeTransactionsOutside = indexReducer(GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY, CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY_STATE_KEY);
