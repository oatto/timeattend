import { Alert } from 'react-native';
import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork } from 'redux-saga/effects';
import Trans from '_features/common/containers/Trans';
import * as Api from '_features/user/api/forgot_password';
import { FORGOT_PASSWORD } from '../constants';
import { forgotPassword } from '../actions';

export const watchForgotPasswordSubmit = function*() {
    while (true) {
        const submitAction = yield take(FORGOT_PASSWORD.SUBMIT);

        yield fork(doSubmit, forgotPassword, {
            apiFunction: Api.forgotPassword,
            args: [submitAction.payload]
        }, {
            alertOnValidationFailed: false,
        });

        const action = yield take([
            FORGOT_PASSWORD.SUBMIT_VALIDATION_FAILED,
            FORGOT_PASSWORD.SUBMIT_SUCCESS,
            FORGOT_PASSWORD.SUBMIT_FAILURE,
        ]);

        if (action.type === FORGOT_PASSWORD.SUBMIT_VALIDATION_FAILED) {
            Alert.alert(
                Trans.tran('user.login.forget_password.submit_failure_validation_title'),
                Trans.tran('user.login.forget_password.submit_failure_validation_description'),
                [{text: Trans.tran('general.accept')}]
            );
        }

        if (action.type === FORGOT_PASSWORD.SUBMIT_SUCCESS) {
            Alert.alert(
                Trans.tran('user.login.forget_password.submit_success_title'),
                Trans.tran('user.login.forget_password.submit_success_description'),
                [{text: Trans.tran('general.accept')}]
            );
        }
    }
};
