import requestReducer from 'react-native-core/api/request/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { call, takeLatest } from 'redux-saga/effects';
import { MNG_GET_EMPLOYEE_PUSH_NOTIFICATION_SETTING, MNG_EMPLOYEE_PUSH_NOTIFICATION_SETTING_STATE_KEY } from '../constants';
import { mngGetEmployeePushNotificationSetting } from '../actions';
import * as Api from '../../api/mng-employee-push-notification-setting';

export const watchMngGetEmployeePushNotificationSettingRequest = function*() {
    yield takeLatest(MNG_GET_EMPLOYEE_PUSH_NOTIFICATION_SETTING.REQUEST, function*({payload}) {
        // do staff
        yield call(doRequest, mngGetEmployeePushNotificationSetting, {
            apiFunction: Api.getEmployeePushConfiguration,
            args: [payload]
        }, { showLoading: false })
    });
};

export const mngGetEmployeePushNotificationSettingReducer = requestReducer(MNG_GET_EMPLOYEE_PUSH_NOTIFICATION_SETTING, MNG_EMPLOYEE_PUSH_NOTIFICATION_SETTING_STATE_KEY);
