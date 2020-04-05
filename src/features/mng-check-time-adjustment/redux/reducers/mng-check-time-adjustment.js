import { doSubmit } from 'react-native-core/api/submit/saga';
import { doRequest } from 'react-native-core/api/request/saga';
import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import indexReducer from 'react-native-core/api/paginate/reducer';
import {
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED_STATE_KEY
} from "../constants";
import {
    fetchMngCheckTimeAdjustmentRequested,
    fetchMngCheckTimeAdjustmentApproved,
    fetchMngCheckTimeAdjustmentRejected
} from '../actions';
import * as Api from '../../api/mng-check-time-adjustment';

export const watchMngCheckTimeAdjustmentRequested = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED.REQUEST,
            FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED.LOADMORE,
            FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED.REFRESH
        ]);

        const data = yield select((state) => state.mngCheckTimeAdjustmentApproval[FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY]);

        yield fork(doRequest, fetchMngCheckTimeAdjustmentRequested, {
            apiFunction: Api.mngGetCheckTimeAdjustmentRequested,
            args: [
                (action.type === FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED.REQUEST})
    }
};

export const watchMngCheckTimeAdjustmentApproved = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED.REQUEST,
            FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED.LOADMORE,
            FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED.REFRESH
        ]);

        const data = yield select((state) => state.mngCheckTimeAdjustmentApproval[FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY]);

        yield fork(doRequest, fetchMngCheckTimeAdjustmentApproved, {
            apiFunction: Api.mngGetCheckTimeAdjustmentApproved,
            args: [
                (action.type === FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED.REQUEST})
    }
};

export const watchMngCheckTimeAdjustmentRejected = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED.REQUEST,
            FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED.LOADMORE,
            FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED.REFRESH
        ]);

        const data = yield select((state) => state.mngCheckTimeAdjustmentApproval[FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED_STATE_KEY]);

        yield fork(doRequest, fetchMngCheckTimeAdjustmentRejected, {
            apiFunction: Api.mngGetCheckTimeAdjustmentRejected,
            args: [
                (action.type === FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED.REQUEST})
    }
};

export const reducerMngCheckTimeAdjustmentRequested = indexReducer(
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY
);

export const reducerMngCheckTimeAdjustmentApproved = indexReducer(
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY
);

export const reducerMngCheckTimeAdjustmentRejected = indexReducer(
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED_STATE_KEY
);
