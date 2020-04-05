import indexReducer from 'react-native-core/api/paginate/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { take, select, fork } from 'redux-saga/effects';
import { MNG_GET_MY_EMPLOYEES, MNG_GET_MY_EMPLOYEES_STATE_KEY } from '../constants';
import { mngGetMyEmployees } from '../actions';
import * as Api from '../../api/mng-my-employee'

export const watchMngGetMyEmployeesPaginate = function*() {
    while (true) {
        const action = yield take([
            MNG_GET_MY_EMPLOYEES.REQUEST,
            MNG_GET_MY_EMPLOYEES.LOADMORE,
            MNG_GET_MY_EMPLOYEES.REFRESH
        ]);

        const data = yield select((state) => state.mngMyEmployee[MNG_GET_MY_EMPLOYEES_STATE_KEY]);

        yield fork(doRequest, mngGetMyEmployees, {
            apiFunction: Api.mngGetMyEmployees,
            args: [
                (action.type === MNG_GET_MY_EMPLOYEES.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === MNG_GET_MY_EMPLOYEES.REQUEST})
    }
};

export const mngGetMyEmployeesReducer = indexReducer(MNG_GET_MY_EMPLOYEES, MNG_GET_MY_EMPLOYEES_STATE_KEY);
