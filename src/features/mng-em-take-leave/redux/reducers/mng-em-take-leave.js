import { fork, select, take } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import indexReducer from 'react-native-core/api/paginate/reducer';
import * as Api from '../../api/mng-em-take-leave';
import {
    GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED,
    GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED,
    GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED,
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED_STATE_KEY,
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED_STATE_KEY,
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED_STATE_KEY,
} from '../constants';
import {
    getMngEmTakeLeaveRequestByUserAndApproved,
    getMngEmTakeLeaveRequestByUserAndRequested,
    getMngEmTakeLeaveRequestByUserAndRejected,
} from '../actions';

export const watchMngTakeLeaveRequestByUserAndRequested = function*() {
    while (true) {
        const action = yield take([
            GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED.REQUEST,
            GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED.LOADMORE,
            GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED.REFRESH
        ]);
        const data = yield select((state) => state.mngEmTakeLeave[MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED_STATE_KEY]);

        yield fork(doRequest, getMngEmTakeLeaveRequestByUserAndRequested, {
            apiFunction: Api.getMngTakeLeaveRequestByUserAndRequested,
            args: [
                action.payload,
                (action.type === GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
            ]
        }, {showLoading: action.type === GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED.REQUEST})
    }
};

export const watchMngTakeLeaveRequestByUserAndRejected = function*() {
    while (true) {
        const action = yield take([
            GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED.REQUEST,
            GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED.LOADMORE,
            GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED.REFRESH
        ]);
        const data = yield select((state) => state.mngEmTakeLeave[MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED_STATE_KEY]);

        yield fork(doRequest, getMngEmTakeLeaveRequestByUserAndRejected, {
            apiFunction: Api.getMngTakeLeaveRequestByUserAndRejected,
            args: [
                action.payload,
                (action.type === GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
            ]
        }, {showLoading: action.type === GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED.REQUEST})
    }
};

export const watchMngTakeLeaveRequestByUserAndApproved = function*() {
    while (true) {
        const action = yield take([
            GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED.REQUEST,
            GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED.LOADMORE,
            GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED.REFRESH
        ]);
        const data = yield select((state) => state.mngEmTakeLeave[MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED_STATE_KEY]);

        yield fork(doRequest, getMngEmTakeLeaveRequestByUserAndApproved, {
            apiFunction: Api.getMngTakeLeaveRequestByUserAndApproved,
            args: [
                action.payload,
                (action.type === GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
            ]
        }, {showLoading: action.type === GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED.REQUEST})
    }
};

export const reducerByRequested = indexReducer(
    GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED,
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED_STATE_KEY
);

export const reducerByRejected = indexReducer(
    GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED,
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED_STATE_KEY
);

export const reducerByApproved = indexReducer(
    GET_MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED,
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED_STATE_KEY
);
