import { call, takeLatest } from 'redux-saga/effects';
import requestReducer from 'react-native-core/api/request/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { GET_COMPANY_TAKE_LEAVE_SETTINGS, GET_COMPANY_TAKE_LEAVE_SETTINGS_STATE_KEY } from '../constants';
import { getCompanyTakeLeaveSettings } from '../actions';
import * as Api from '../../api/take-leave';

export const watchGetCompanyTakeLeaveSettingsRequest = function*() {
    yield takeLatest(GET_COMPANY_TAKE_LEAVE_SETTINGS.REQUEST, function*() {
        yield call(doRequest, getCompanyTakeLeaveSettings, {
            apiFunction: Api.getCompanyTakeLeaveSettings,
            args: []
        })
    });
};

export const getCompanyTakeLeaveSettingsReducer = requestReducer(GET_COMPANY_TAKE_LEAVE_SETTINGS, GET_COMPANY_TAKE_LEAVE_SETTINGS_STATE_KEY);
