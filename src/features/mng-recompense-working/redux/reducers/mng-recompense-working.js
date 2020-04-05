import { doSubmit } from 'react-native-core/api/submit/saga';
import { doRequest } from 'react-native-core/api/request/saga';
import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import indexReducer from 'react-native-core/api/paginate/reducer';
import {
    FETCH_MNG_RECOMPENSE_WORKS_REQUESTED,
    FETCH_MNG_RECOMPENSE_WORKS_REQUESTED_STATE_KEY,
    FETCH_MNG_RECOMPENSE_WORKS_APPROVED,
    FETCH_MNG_RECOMPENSE_WORKS_APPROVED_STATE_KEY,
    FETCH_MNG_RECOMPENSE_WORKS_REFJECTED,
    FETCH_MNG_RECOMPENSE_WORKS_REFJECTED_STATE_KEY
} from "../constants";
import {
    fetchMngRecompenseWorksRequested,
    fetchMngRecompenseWorksApproved,
    fetchMngRecompenseWorksRejected
} from '../actions';
import * as Api from '../../api/mng-recompense-working';

export const watchMngRecompenseWorksRequested = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_RECOMPENSE_WORKS_REQUESTED.REQUEST,
            FETCH_MNG_RECOMPENSE_WORKS_REQUESTED.LOADMORE,
            FETCH_MNG_RECOMPENSE_WORKS_REQUESTED.REFRESH
        ]);

        const data = yield select((state) => state.mngRecompenseWorksApproval[FETCH_MNG_RECOMPENSE_WORKS_REQUESTED_STATE_KEY]);

        yield fork(doRequest, fetchMngRecompenseWorksRequested, {
            apiFunction: Api.mngGetRecompenseWorksRequested,
            args: [
                (action.type === FETCH_MNG_RECOMPENSE_WORKS_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_RECOMPENSE_WORKS_REQUESTED.REQUEST})
    }
};

export const watchMngRecompenseWorksApproved = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_RECOMPENSE_WORKS_APPROVED.REQUEST,
            FETCH_MNG_RECOMPENSE_WORKS_APPROVED.LOADMORE,
            FETCH_MNG_RECOMPENSE_WORKS_APPROVED.REFRESH
        ]);

        const data = yield select((state) => state.mngRecompenseWorksApproval[FETCH_MNG_RECOMPENSE_WORKS_APPROVED_STATE_KEY]);

        yield fork(doRequest, fetchMngRecompenseWorksApproved, {
            apiFunction: Api.mngGetRecompenseWorksApproved,
            args: [
                (action.type === FETCH_MNG_RECOMPENSE_WORKS_APPROVED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_RECOMPENSE_WORKS_APPROVED.REQUEST})
    }
};

export const watchMngRecompenseWorksRejected = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_RECOMPENSE_WORKS_REFJECTED.REQUEST,
            FETCH_MNG_RECOMPENSE_WORKS_REFJECTED.LOADMORE,
            FETCH_MNG_RECOMPENSE_WORKS_REFJECTED.REFRESH
        ]);

        const data = yield select((state) => state.mngRecompenseWorksApproval[FETCH_MNG_RECOMPENSE_WORKS_REFJECTED_STATE_KEY]);

        yield fork(doRequest, fetchMngRecompenseWorksRejected, {
            apiFunction: Api.mngGetRecompenseWorksRejected,
            args: [
                (action.type === FETCH_MNG_RECOMPENSE_WORKS_REFJECTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_RECOMPENSE_WORKS_REFJECTED.REQUEST})
    }
};

export const reducerMngRecompenseWorksRequested = indexReducer(
    FETCH_MNG_RECOMPENSE_WORKS_REQUESTED,
    FETCH_MNG_RECOMPENSE_WORKS_REQUESTED_STATE_KEY
);

export const reducerMngRecompenseWorksApproved = indexReducer(
    FETCH_MNG_RECOMPENSE_WORKS_APPROVED,
    FETCH_MNG_RECOMPENSE_WORKS_APPROVED_STATE_KEY
);

export const reducerMngRecompenseWorksRejected = indexReducer(
    FETCH_MNG_RECOMPENSE_WORKS_REFJECTED,
    FETCH_MNG_RECOMPENSE_WORKS_REFJECTED_STATE_KEY
);
