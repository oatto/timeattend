import indexReducer from 'react-native-core/api/paginate/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { take, select, fork } from 'redux-saga/effects';
import {
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED,
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED,
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED,
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY,
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY,
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED_STATE_KEY
} from '../constants';

import {
    fetchMngEmCheckTimeAdjustmentRequested,
    fetchMngEmCheckTimeAdjustmentApproved,
    fetchMngEmCheckTimeAdjustmentRejected
} from '../actions';

import * as Api  from '../../api/mng-em-check-time-adjustment';

export const watchFetchMngEmCheckTimeAdjustmentRequestedPaginate = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED.REQUEST,
            FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED.LOADMORE,
            FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED.REFRESH
        ]);

        const data = yield select((state) => state.mngEmCheckTimeAdjustment[FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY]);

        yield fork(doRequest, fetchMngEmCheckTimeAdjustmentRequested, {
            apiFunction: Api.mngEmGetCheckTimeAdjustmentRequestedByEmployee,
            args: [
                (action.type === FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED.REQUEST})
    }
};

export const watchFetchMngEmCheckTimeAdjustmentApprovedPaginate = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED.REQUEST,
            FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED.LOADMORE,
            FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED.REFRESH
        ]);

        const data = yield select((state) => state.mngEmCheckTimeAdjustment[FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY]);

        yield fork(doRequest, fetchMngEmCheckTimeAdjustmentApproved, {
            apiFunction: Api.mngEmGetCheckTimeAdjustmentApprovedByEmployee,
            args: [
                (action.type === FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED.REQUEST})
    }
};

export const watchFetchMngEmCheckTimeAdjustmentRejectedPaginate = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED.REQUEST,
            FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED.LOADMORE,
            FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED.REFRESH
        ]);

        const data = yield select((state) => state.mngEmCheckTimeAdjustment[FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED_STATE_KEY]);

        yield fork(doRequest, fetchMngEmCheckTimeAdjustmentRejected, {
            apiFunction: Api.mngEmGetCheckTimeAdjustmentRejectedByEmployee,
            args: [
                (action.type === FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED.REQUEST})
    }
};

export const fetchMngEmCheckTimeAdjustmentRequestedReducer = indexReducer(FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED, FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY);
export const fetchMngEmCheckTimeAdjustmentApprovedReducer = indexReducer(FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED, FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY);
export const fetchMngEmCheckTimeAdjustmentRejectedReducer = indexReducer(FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED, FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED_STATE_KEY);
