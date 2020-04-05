import { takeLatest, put, select, take, race, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
    MNG_FETCH_TAKE_LEAVE_DETAIL_DATA,
    FETCH_TAKE_LEAVE_DATA_BY_EMPLOYEE,
    MNG_FETCH_TAKE_LEAVE_DETAIL_DATA_DONE
} from "../constants";
import {fetchTakeLeaveDataByEmployee} from "../actions";
import {mngEmployeeTakeLeaveByEmployee} from "../selectors";


export const watchMngTakeLeaveDetailedDataFetch = function*() {
    yield takeLatest(MNG_FETCH_TAKE_LEAVE_DETAIL_DATA, function* ({payload}) {
        const employeeId = payload.takeLeave.employee.id;
        // check if exist take leave data
        const takeLeaveData = yield select((state) => mngEmployeeTakeLeaveByEmployee(state, employeeId));

        if (!takeLeaveData) {
            yield put(fetchTakeLeaveDataByEmployee.request({employeeId}));

            yield race({
                result: take(FETCH_TAKE_LEAVE_DATA_BY_EMPLOYEE.SUCCESS),
                timeout: call(delay, 3000)
            });
        }

        // done
        yield put({
            type: MNG_FETCH_TAKE_LEAVE_DETAIL_DATA_DONE
        });
    })
};

export const reducerMngTakeLeaveDetail = (state = {}, action) => {
    switch (action.type) {
        case MNG_FETCH_TAKE_LEAVE_DETAIL_DATA:
            return {
                ...state,
                isTakeLeaveDetailLoading: true
            };
        case MNG_FETCH_TAKE_LEAVE_DETAIL_DATA_DONE:
            return {
                ...state,
                isTakeLeaveDetailLoading: false
            };
        default:
            return state;
    }
};
