import { call, takeLatest } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import { getAvailableTakeLeavesFromApiTakeLeave } from "_features/user/redux/reducers/profile";
import * as Api from '../../api/mng-em-take-leave';
import {
    GET_MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE,
    MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE_STATE_KEY,
} from '../constants';
import {
    getMngEmTakeLeaveTypeDataByEmployee,
} from '../actions';

export const watchFetchTakeLeaveTypeByEmployeeRequest = function*() {
    yield takeLatest(GET_MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE.REQUEST, function*({payload}) {

        yield call(doRequest, getMngEmTakeLeaveTypeDataByEmployee, {
            apiFunction: Api.getMngTakeLeaveDataByEmployee,
            args: [payload]
        });
    });
};

export const reducerFetchTakeLeaveTypeByEmployee = (state = {}, action) => {
    switch (action.type) {
        case GET_MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE.SUCCESS: {
            return {
                ...state,
                [MNG_EM_TAKE_LEAVE_TYPE_DATA_BY_EMPLOYEE_STATE_KEY]: getAvailableTakeLeavesFromApiTakeLeave(action.data.take_leaves)
            };
        }
        default:
            return state;
    }
};
