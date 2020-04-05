import { call, takeLatest, select } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import { getAvailableTakeLeavesFromApiTakeLeave } from '_features/user/redux/reducers/profile';
import {
    FETCH_TAKE_LEAVE_DATA_BY_EMPLOYEE,
    TAKE_LEAVE_DATA_BY_EMPLOYEE_STATE_KEY
} from '../constants';
import { fetchTakeLeaveDataByEmployee } from '../actions';
import * as Api from '../../api/mng-take-leave';

export const watchFetchTakeLeaveDataByEmployeeRequest = function*() {
    yield takeLatest(FETCH_TAKE_LEAVE_DATA_BY_EMPLOYEE.REQUEST, function*({payload}) {
        // do staff
        yield call(doRequest, fetchTakeLeaveDataByEmployee, {
            apiFunction: Api.mngGetEmployeeTakeLeaveData,
            args: [payload.employeeId]
        }, {showLoading: false, meta: {employeeId: payload.employeeId}})
    });
};

export const reducerFetchTakeLeaveDataByEmployee = (state = {}, action) => {
    switch (action.type) {
        case FETCH_TAKE_LEAVE_DATA_BY_EMPLOYEE.SUCCESS:
            const { employeeId } = action.__meta__;

            return {
                ...state,
                [TAKE_LEAVE_DATA_BY_EMPLOYEE_STATE_KEY]: {
                    ...state[TAKE_LEAVE_DATA_BY_EMPLOYEE_STATE_KEY],
                    [employeeId]: getAvailableTakeLeavesFromApiTakeLeave(action.data.take_leaves)
                }
            };
        default:
            return state;
    }
};
