import { call, takeLatest } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import requestReducer from 'react-native-core/api/request/reducer';
import { GET_MANAGERS, GET_MANAGERS_STATE_KEY } from '../constants';
import { getManagers } from '../actions';
import * as Api from '../../api/profile';

export const watchGetManagersRequest = function*() {
    yield takeLatest(GET_MANAGERS.REQUEST, function*() {
        // do staff
        yield call(doRequest, getManagers, {
            apiFunction: Api.getManagers,
            args: []
        }, {showLoading: false})
    });
};

export const getManagersReducer = requestReducer(GET_MANAGERS, GET_MANAGERS_STATE_KEY, {
    ownLoading: true
});
