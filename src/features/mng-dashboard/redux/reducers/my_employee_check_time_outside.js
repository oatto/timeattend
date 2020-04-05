import indexReducer from 'react-native-core/api/paginate/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { take, select, fork } from 'redux-saga/effects';
import { GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE, GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE_STATE_KEY } from '../constants';
import { getMyEmployeeCheckTimeOutside } from '../actions';
import * as Api from '../../api/my_employee';

export const watchGetMyEmployeeCheckTimeOutsidePaginate = function*() {
    while (true) {
        const action = yield take([GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE.REQUEST, GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE.LOADMORE, GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE.REFRESH]);
        const data = yield select((state) => state.mngDashboard[GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE_STATE_KEY]);

        yield fork(doRequest, getMyEmployeeCheckTimeOutside, {
            apiFunction: Api.mngGetMyEmployeesCheckTimeTransactionsOutsideHistory,
            args: [
                (action.type === GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE.REQUEST});
    }
};

export const getMyEmployeeCheckTimeOutsideReducer = indexReducer(GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE, GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE_STATE_KEY);
