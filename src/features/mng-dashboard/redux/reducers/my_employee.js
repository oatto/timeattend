import { take, select, fork } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import indexReducer from 'react-native-core/api/paginate/reducer';
import { GET_MY_EMPLOYEES, GET_MY_EMPLOYEES_STATE_KEY } from '../constants';
import { getMyEmployees } from '../actions';
import * as Api from '../../api/my_employee';

export const watchGetMyEmployeesPaginate = function*() {
    while (true) {
        const action = yield take([GET_MY_EMPLOYEES.REQUEST, GET_MY_EMPLOYEES.LOADMORE, GET_MY_EMPLOYEES.REFRESH]);
        const data = yield select((state) => state.mngDashboard[GET_MY_EMPLOYEES_STATE_KEY]);

        yield fork(doRequest, getMyEmployees, {
            apiFunction: Api.mngGetMyEmployees,
            args: [
                (action.type === GET_MY_EMPLOYEES.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_MY_EMPLOYEES.REQUEST});
    }
};

export const getMyEmployeesReducer = indexReducer(GET_MY_EMPLOYEES, GET_MY_EMPLOYEES_STATE_KEY);
