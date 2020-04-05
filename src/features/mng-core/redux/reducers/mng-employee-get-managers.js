import { doRequest } from 'react-native-core/api/request/saga';
import { call, takeLatest } from 'redux-saga/effects';
import requestReducer from 'react-native-core/api/request/reducer';
import { MNG_EMPLOYEE_GET_MANAGERS, MNG_EMPLOYEE_GET_MANAGERS_STATE_KEY } from '../constants';
import { mngEmployeeGetManagers as mngEmployeeGetManagersAction } from '../actions';
import * as Api from '../../api/mng-employee-get-managers';

export const watchMngEmployeeGetManagersRequest = function*() {
    yield takeLatest(MNG_EMPLOYEE_GET_MANAGERS.REQUEST, function*({payload}) {
        // do staff
        yield call(doRequest, mngEmployeeGetManagersAction, {
            apiFunction: Api.mngEmployeeGetManagers,
            args: [payload]
        }, {showLoading: false})
    });
};

export const mngEmployeeGetManagers = requestReducer(MNG_EMPLOYEE_GET_MANAGERS, MNG_EMPLOYEE_GET_MANAGERS_STATE_KEY, {
    ownLoading: true
});

