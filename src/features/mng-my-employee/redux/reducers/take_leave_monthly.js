import { call, takeLatest } from 'redux-saga/effects';
import requestReducer from 'react-native-core/api/request/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { MNG_TAKE_LEAVE_MONTHLY, MNG_TAKE_LEAVE_MONTHLY_STATE_KEY } from '../constants';
import { mngTakeLeaveMonthly } from '../actions';
import * as Api from '../../api/monthly';

export const watchMngTakeLeaveMonthlyRequest = function*() {
    yield takeLatest(MNG_TAKE_LEAVE_MONTHLY.REQUEST, function*({payload}) {
        // do staff
        yield call(doRequest, mngTakeLeaveMonthly, {
            apiFunction: Api.mngGetTakeLeaveMonthly,
            args: [payload]
        })
    });
};

export const mngTakeLeaveMonthlyReducer = requestReducer(MNG_TAKE_LEAVE_MONTHLY, MNG_TAKE_LEAVE_MONTHLY_STATE_KEY);
