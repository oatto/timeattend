import { doRequest } from 'react-native-core/api/request/saga';
import { fork, select, take } from 'redux-saga/effects';
import indexReducer from 'react-native-core/api/paginate/reducer';
import {
    FETCH_MNG_TAKE_LEAVE_REQUESTED,
    FETCH_MNG_TAKE_LEAVE_REQUESTED_STATE_KEY,
    FETCH_MNG_TAKE_LEAVE_APPROVED,
    FETCH_MNG_TAKE_LEAVE_APPROVED_STATE_KEY,
    FETCH_MNG_TAKE_LEAVE_REJECTED,
    FETCH_MNG_TAKE_LEAVE_REJECTED_STATE_KEY,
} from "../constants";

import {
    fetchMngTakeLeaveRequested,
    fetchMngTakeLeaveApproved,
    fetchMngTakeLeaveRejected,
} from '../actions';
import * as Api from '../../api/mng-take-leave-approval';

export const watchMngTakeLeaveRequested = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_TAKE_LEAVE_REQUESTED.REQUEST,
            FETCH_MNG_TAKE_LEAVE_REQUESTED.LOADMORE,
            FETCH_MNG_TAKE_LEAVE_REQUESTED.REFRESH
        ]);

        const data = yield select((state) => state.mngTakeLeaveApproval[FETCH_MNG_TAKE_LEAVE_REQUESTED_STATE_KEY]);

        yield fork(doRequest, fetchMngTakeLeaveRequested, {
            apiFunction: Api.mngGetTakeLeaveRequested,
            args: [
                (action.type === FETCH_MNG_TAKE_LEAVE_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_TAKE_LEAVE_REQUESTED.REQUEST})
    }
};

export const watchMngTakeLeaveApproved = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_TAKE_LEAVE_APPROVED.REQUEST,
            FETCH_MNG_TAKE_LEAVE_APPROVED.LOADMORE,
            FETCH_MNG_TAKE_LEAVE_APPROVED.REFRESH
        ]);

        const data = yield select((state) => state.mngTakeLeaveApproval[FETCH_MNG_TAKE_LEAVE_APPROVED_STATE_KEY]);

        yield fork(doRequest, fetchMngTakeLeaveApproved, {
            apiFunction: Api.mngGetTakeLeaveApproved,
            args: [
                (action.type === FETCH_MNG_TAKE_LEAVE_APPROVED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_TAKE_LEAVE_APPROVED.REQUEST})
    }
};

export const watchMngTakeLeaveRejected = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_TAKE_LEAVE_REJECTED.REQUEST,
            FETCH_MNG_TAKE_LEAVE_REJECTED.LOADMORE,
            FETCH_MNG_TAKE_LEAVE_REJECTED.REFRESH
        ]);

        const data = yield select((state) => state.mngTakeLeaveApproval[FETCH_MNG_TAKE_LEAVE_REJECTED_STATE_KEY]);

        yield fork(doRequest, fetchMngTakeLeaveRejected, {
            apiFunction: Api.mngGetTakeLeaveRejected,
            args: [
                (action.type === FETCH_MNG_TAKE_LEAVE_REJECTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_TAKE_LEAVE_REJECTED.REQUEST})
    }
};

export const reducerMngTakeLeaveRequested = indexReducer(
    FETCH_MNG_TAKE_LEAVE_REQUESTED,
    FETCH_MNG_TAKE_LEAVE_REQUESTED_STATE_KEY
);

export const reducerMngTakeLeaveApproved = indexReducer(
    FETCH_MNG_TAKE_LEAVE_APPROVED,
    FETCH_MNG_TAKE_LEAVE_APPROVED_STATE_KEY
);

export const reducerMngTakeLeaveRejected = indexReducer(
    FETCH_MNG_TAKE_LEAVE_REJECTED,
    FETCH_MNG_TAKE_LEAVE_REJECTED_STATE_KEY
);
