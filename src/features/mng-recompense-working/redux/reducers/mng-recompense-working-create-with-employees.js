import { doSubmit } from 'react-native-core/api/submit/saga';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import Trans from '_features/common/containers/Trans';
import { reset } from "redux-form";
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { take, fork, put } from 'redux-saga/effects';
import { MNG_RECOMPENSE_WORKS } from '_features/mng-recompense-working/router';
import normalizeErrorsFromApi from 'react-native-core/utils/normalizeErrorsFromApi';
import { NAME as RECOMPENSE_WORKING_CREATE_FORM_NAME } from "_features/recompense-working/forms/RecompenseWorkingCreateForm";
import { MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES } from '../constants';
import { mngCreateRecompenseWorksWithEmployees } from '../actions';
import * as Api from '../../api/mng-recompense-working';

export const watchMngCreateRecompenseWorksWithEmployeesSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES.SUBMIT);

        yield fork(doSubmit, mngCreateRecompenseWorksWithEmployees, {
            apiFunction: Api.mngCreateRecompenseWorkWithEmployees,
            args: [submitAction.payload]
        }, {
            alertOnValidationFailed: false
        });

        const action = yield take([
            MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES.SUBMIT_VALIDATION_FAILED,
            MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES.SUBMIT_SUCCESS,
            MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('recompense_working.alert_reducer.Workdays_change_request'),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(reset(RECOMPENSE_WORKING_CREATE_FORM_NAME));
            yield put(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: MNG_RECOMPENSE_WORKS })
                ]
            }));
            yield put(resetApprovalBadge());
        }

        if (action.type === MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES.SUBMIT_VALIDATION_FAILED) {
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
