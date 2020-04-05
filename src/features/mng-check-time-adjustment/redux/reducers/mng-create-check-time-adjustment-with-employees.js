import { doSubmit } from 'react-native-core/api/submit/saga';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { reset } from "redux-form";
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import normalizeErrorsFromApi from 'react-native-core/utils/normalizeErrorsFromApi';
import Trans from '_features/common/containers/Trans';
import { take, fork, put } from 'redux-saga/effects';
import { NAME as CHECK_TIME_ADJUSTMENT_CREATE_FORM } from "_features/check-time-adjustment/forms/CheckTimeAdjustmentCreateForm";
import { MNG_CHECK_TIME_ADJUSTMENT } from '_features/mng-check-time-adjustment/router';
import { MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES } from '../constants';
import { mngCreateCheckTimeAdjustmentWithEmployees } from '../actions';
import * as Api from '../../api/mng-check-time-adjustment';

export const watchMngCreateCheckTimeAdjustmentWithEmployeesSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES.SUBMIT);

        yield fork(doSubmit, mngCreateCheckTimeAdjustmentWithEmployees, {
            apiFunction: Api.mngCreateCheckTimeAdjustmentWithEmployees,
            args: [submitAction.payload]
        }, {
            alertOnValidationFailed: false
        });

        const action = yield take([
            MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES.SUBMIT_VALIDATION_FAILED,
            MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES.SUBMIT_SUCCESS,
            MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('time_adjustment.alert_reducer.add_list_edit_time'),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(reset(CHECK_TIME_ADJUSTMENT_CREATE_FORM));
            yield put(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: MNG_CHECK_TIME_ADJUSTMENT })
                ]
            }));
            yield put(resetApprovalBadge());
        }

        if (action.type === MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES.SUBMIT_VALIDATION_FAILED) {
            if (action.errors.response) {
                let code;
                let errors;

                // todo ถ้ามีการทำ bulk create ของ takeLeave ต้องแสดง errors ของแต่ละ employee
                if (action.errors.response.data[0]) {
                    code = action.errors.response.data[0].code;
                    errors = action.errors.response.data[0].errors;
                } else {
                    code =  action.errors.response.data.code;
                    errors =  action.errors.response.data.message;
                }

                const statusCode = (code) ? code : action.errors.response.status;

                switch (statusCode) {
                    case 400: // Validation Failed
                    {
                        const errTexts = normalizeErrorsFromApi(errors);
                        errTexts.length && Alert.alert(Trans.tran('general.alert.failed'),
                            errTexts.join('\r\n'),
                            [{ text: Trans.tran('general.alert.ok') }]
                        );
                    }
                }
            }
        }
    }
};
