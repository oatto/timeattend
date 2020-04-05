import { call, takeLatest } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import requestReducer from 'react-native-core/api/request/reducer';
import { GET_DEPARTMENTS, GET_DEPARTMENTS_STATE_KEY } from '../constants';
import { getDepartments } from '../actions';
import * as Api from '../../api/department';

export const watchGetDepartmentsRequest = function*() {
    yield takeLatest(GET_DEPARTMENTS.REQUEST, function*() {
        yield call(doRequest, getDepartments, {
            apiFunction: Api.mngGetDepartments,
            args: []
        })
    });
};

export const getDepartmentsReducer = requestReducer(GET_DEPARTMENTS, GET_DEPARTMENTS_STATE_KEY);
