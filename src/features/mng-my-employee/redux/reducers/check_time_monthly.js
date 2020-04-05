import { take, select, fork } from 'redux-saga/effects';
import indexReducer from 'react-native-core/api/paginate/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { GET_CHECK_TIME_MONTHLY, GET_CHECK_TIME_MONTHLY_STATE_KEY } from '../constants';
import { getCheckTimeMonthly } from '../actions';
import * as Api from '../../api/monthly';

export const watchGetCheckTimeMonthlyPaginate = function*() {
    while (true) {
        const action = yield take([GET_CHECK_TIME_MONTHLY.REQUEST, GET_CHECK_TIME_MONTHLY.LOADMORE, GET_CHECK_TIME_MONTHLY.REFRESH]);
        const data = yield select((state) => state.mngMyEmployee[GET_CHECK_TIME_MONTHLY_STATE_KEY]);

        yield fork(doRequest, getCheckTimeMonthly, {
            apiFunction: Api.mngGetCheckTimeMonthly,
            args: [
                (action.type === GET_CHECK_TIME_MONTHLY.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_CHECK_TIME_MONTHLY.REQUEST})
    }
};

export const getCheckTimeMonthlyReducer = indexReducer(GET_CHECK_TIME_MONTHLY, GET_CHECK_TIME_MONTHLY_STATE_KEY);
