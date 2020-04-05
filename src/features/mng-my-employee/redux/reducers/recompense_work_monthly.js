import { call, takeLatest } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import requestReducer from 'react-native-core/api/request/reducer';
import { MNG_RECOMPENSE_WORK_MONTHLY, MNG_RECOMPENSE_WORK_MONTHLY_STATE_KEY } from '../constants';
import { mngRecompenseWorkMonthly } from '../actions';
import * as Api from '../../api/monthly';

export const watchMngRecompenseWorkMonthlyRequest = function*() {
    yield takeLatest(MNG_RECOMPENSE_WORK_MONTHLY.REQUEST, function*({payload}) {
        // do staff
        yield call(doRequest, mngRecompenseWorkMonthly, {
            apiFunction: Api.mngGetRecompenseWorkMonthly,
            args: [payload]
        })
    });
};

export const mngRecompenseWorkMonthlyReducer = requestReducer(MNG_RECOMPENSE_WORK_MONTHLY, MNG_RECOMPENSE_WORK_MONTHLY_STATE_KEY);
