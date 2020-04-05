import { doSubmit } from 'react-native-core/api/submit/saga';
import { Alert } from 'react-native';
import Trans from '_features/common/containers/Trans';
import { reset } from 'redux-form';
import { take, fork, put } from 'redux-saga/effects';
import { NAME as PUSH_MESSAGE_FORM } from '_features/mng-employee-management/forms/PushMessageForm';
import { MNG_PUSH_MESSAGE_TO_EMPLOYEE } from '../constants';
import { mngPushMessageToEmployee } from '../actions';
import * as Api from '../../api/mng-push-message-to-employee';

export const watchMngPushMessageToEmployeeSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_PUSH_MESSAGE_TO_EMPLOYEE.SUBMIT);

        yield fork(doSubmit, mngPushMessageToEmployee, {
            apiFunction: Api.mngPushMessageToEmployee,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_PUSH_MESSAGE_TO_EMPLOYEE.SUBMIT_VALIDATION_FAILED,
            MNG_PUSH_MESSAGE_TO_EMPLOYEE.SUBMIT_SUCCESS,
            MNG_PUSH_MESSAGE_TO_EMPLOYEE.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_PUSH_MESSAGE_TO_EMPLOYEE.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('general.alert.send_message_success'),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(reset(PUSH_MESSAGE_FORM));
        }
    }
};
