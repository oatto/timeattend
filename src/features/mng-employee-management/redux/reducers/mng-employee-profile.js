import requestReducer from 'react-native-core/api/request/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { call, takeLatest } from 'redux-saga/effects';
import {
    GET_MNG_EMPLOYEE_PROFILE,
    GET_MNG_TAKE_LEAVE_BY_EMPLOYEE,
    GET_MNG_EMPLOYEE_PROFILE_STATE_KEY,
    GET_MNG_TAKE_LEAVE_BY_EMPLOYEE_STATE_KEY
} from '../constants';
import { getMngEmployeeProfile, getMngTakeLeaveByEmployee } from '../actions';
import * as Api from '../../api/mng-employee-profile';
import { getAvailableTakeLeavesFromApiTakeLeave } from "../../../user/redux/reducers/profile";

export const watchGetMngEmployeeProfileRequest = function*() {
    yield takeLatest(GET_MNG_EMPLOYEE_PROFILE.REQUEST, function*({payload}) {
        // do staff
        yield call(doRequest, getMngEmployeeProfile, {
            apiFunction: Api.getMngEmployeeProfile,
            args: [
                payload
            ]
        });
    });
};

export const watchGetMngTakeLeaveByEmployeeRequest = function*() {
    yield takeLatest(GET_MNG_TAKE_LEAVE_BY_EMPLOYEE.REQUEST, function*({payload}) {
        // do staff
        yield call(doRequest, getMngTakeLeaveByEmployee, {
            apiFunction: Api.getMngEmployeeTakeLeaveData,
            args: [
                payload
            ]
        })
    });
};

export const fetchTakeLeaveDataByEmployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_MNG_TAKE_LEAVE_BY_EMPLOYEE.SUCCESS:
            return {
                ...state,
                [GET_MNG_TAKE_LEAVE_BY_EMPLOYEE_STATE_KEY]: getAvailableTakeLeavesFromApiTakeLeave(action.data.take_leaves)
            };
        default:
            return state;
    }
};

export const getMngEmployeeProfileReducer = requestReducer(GET_MNG_EMPLOYEE_PROFILE, GET_MNG_EMPLOYEE_PROFILE_STATE_KEY, {ownLoading: true});
