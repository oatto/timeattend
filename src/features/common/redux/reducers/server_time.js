import { fork, takeLatest } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import { serverTimeRequestAction } from '../actions';
import { SERVER_TIME_REQUEST, SERVER_TIME_REQUEST_STATE_KEY } from '../constants';
import * as Api from "../../api/appVersion";
import moment from "../../../../utils/moment";

export const watchGetServerTime = function*() {
    yield takeLatest(SERVER_TIME_REQUEST.REQUEST, function*() {
        yield fork(doRequest, serverTimeRequestAction, {
            apiFunction: Api.getServerTime,
            args: []
        }, {showLoading: false});
    });
};

export const watchOnBack = function*() {
    yield takeLatest('Navigation/BACK', function*() {
        yield fork(doRequest, serverTimeRequestAction, {
            apiFunction: Api.getServerTime,
            args: []
        }, {showLoading: false});
    });
};

export const serverTimeReducer = (state = {}, action) => {
    switch (action.type) {
        case SERVER_TIME_REQUEST.REQUEST: {
            return {
                ...state,
                serverTimeReceiving: true,
                serverTimeReceived: false,
                serverTimeReceiveFailed: false,
                [SERVER_TIME_REQUEST_STATE_KEY]: undefined,
            };
        }
        case SERVER_TIME_REQUEST.SUCCESS: {
            const payload = action.data;

            return {
                ...state,
                serverTimeReceiving: false,
                serverTimeReceived: true,
                serverTimeReceiveFailed: false,
                [SERVER_TIME_REQUEST_STATE_KEY]: moment(payload.serverTime),
            };
        }
        default:
            return state;
    }
};
