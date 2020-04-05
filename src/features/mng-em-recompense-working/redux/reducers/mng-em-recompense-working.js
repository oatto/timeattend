import indexReducer from 'react-native-core/api/paginate/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { take, select, fork } from 'redux-saga/effects';
import {
    FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED,
    FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED,
    FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED,
    FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED_STATE_KEY,
    FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED_STATE_KEY,
    FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED_STATE_KEY
} from '../constants';

import {
    fetchMngEmRecompenseWorkingRequested,
    fetchMngEmRecompenseWorkingApproved,
    fetchMngEmRecompenseWorkingRejected
} from '../actions';

import * as Api from '../../api/mng-em-recompense-working';

export const watchMngEmRecompenseWorkingRequestedPaginate = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED.REQUEST,
            FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED.LOADMORE,
            FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED.REFRESH
        ]);

        const data = yield select((state) => state.mngEmRecompenseWorking[FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED_STATE_KEY]);

        yield fork(doRequest, fetchMngEmRecompenseWorkingRequested, {
            apiFunction: Api.mngEmGetRecompenseWorkingRequestedByEmployee,
            args: [
                (action.type === FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED.REQUEST})
    }
};

export const watchMngEmRecompenseWorkingApprovedPaginate = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED.REQUEST,
            FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED.LOADMORE,
            FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED.REFRESH
        ]);

        const data = yield select((state) => state.mngEmRecompenseWorking[FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED_STATE_KEY]);

        yield fork(doRequest, fetchMngEmRecompenseWorkingApproved, {
            apiFunction: Api.mngEmGetRecompenseWorkingApprovedByEmployee,
            args: [
                (action.type === FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED.REQUEST})
    }
};

export const watchMngEmRecompenseWorkingRejectedPaginate = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED.REQUEST,
            FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED.LOADMORE,
            FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED.REFRESH
        ]);

        const data = yield select((state) => state.mngEmRecompenseWorking[FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED_STATE_KEY]);

        yield fork(doRequest, fetchMngEmRecompenseWorkingRejected, {
            apiFunction: Api.mngEmGetRecompenseWorkingRejectedByEmployee,
            args: [
                (action.type === FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED.REQUEST})
    }
};

export const fetchMngEmRecompenseWorkingRequestedReducer = indexReducer(FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED, FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED_STATE_KEY);
export const fetchMngEmRecompenseWorkingApprovedReducer = indexReducer(FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED, FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED_STATE_KEY);
export const fetchMngEmRecompenseWorkingRejectedReducer = indexReducer(FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED, FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED_STATE_KEY);
