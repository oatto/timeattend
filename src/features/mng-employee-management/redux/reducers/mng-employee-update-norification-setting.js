import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork, put } from 'redux-saga/effects';
import { MNG_UPDATE_EMPLOYEE_PUSH_NOTIFICATION_SETTING } from '../constants';
import { mngUpdateEmployeePushNotificationSetting, mngGetEmployeePushNotificationSetting } from '../actions';
import * as Api from '../../api/mng-employee-push-notification-setting';

export const watchMngUpdateEmployeePushNotificationSettingSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_UPDATE_EMPLOYEE_PUSH_NOTIFICATION_SETTING.SUBMIT);

        yield fork(doSubmit, mngUpdateEmployeePushNotificationSetting, {
            apiFunction: Api.updateEmployeePushConfiguration,
            args: [submitAction.payload]
        }, { showLoading: false });

        const action = yield take([
            MNG_UPDATE_EMPLOYEE_PUSH_NOTIFICATION_SETTING.SUBMIT_VALIDATION_FAILED,
            MNG_UPDATE_EMPLOYEE_PUSH_NOTIFICATION_SETTING.SUBMIT_SUCCESS,
            MNG_UPDATE_EMPLOYEE_PUSH_NOTIFICATION_SETTING.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_UPDATE_EMPLOYEE_PUSH_NOTIFICATION_SETTING.SUBMIT_SUCCESS) {
            yield put(mngGetEmployeePushNotificationSetting.request({employeeId: submitAction.payload.employeeId}));
        }
    }
};
