import { doSubmit } from 'react-native-core/api/submit/saga';
import { reset } from "redux-form";
import { NavigationActions } from 'react-navigation';
import { take, fork, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import Trans from '_features/common/containers/Trans';
import { alertChannel } from 'react-native-core/features/common/redux/sagas';
import { NAME as CHECK_TIME_ADJUSTMENT_CREATE_FORM_NAME } from "_features/check-time-adjustment/forms/CheckTimeAdjustmentCreateForm";
import { EMPLOYEE_MANAGEMENT_MENUS } from "_features/mng-employee-management/router";
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { MNG_EM_CHECK_TIME_ADJUSTMENT_INDEX } from '_features/mng-em-check-time-adjustment/router';
import { mngEmCheckTimeAdjustmentCreateByEmployee } from '../actions';
import { MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE_BY_EMPLOYEE } from '../constants';
import * as Api from '../../api/mng-em-check-time-adjustment';

export const watchMngEmCheckTimeAdjustmentCreateByEmployeeSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE_BY_EMPLOYEE.SUBMIT);

        yield fork(doSubmit, mngEmCheckTimeAdjustmentCreateByEmployee, {
            apiFunction: Api.mngEmCreateCheckTimeAdjustmentByEmployee,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE_BY_EMPLOYEE.SUBMIT_VALIDATION_FAILED,
            MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE_BY_EMPLOYEE.SUBMIT_SUCCESS,
            MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE_BY_EMPLOYEE.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE_BY_EMPLOYEE.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('time_adjustment.alert_reducer.add_list_edit_time'),
                [
                    { text: Trans.tran('general.alert.later') },
                    {
                        text: Trans.tran('general.alert.approve'),
                        onPress: () => alertChannel.put(NavigationActions.navigate({routeName: MNG_EM_CHECK_TIME_ADJUSTMENT_INDEX}))
                    }
                ]
            );

            yield put(reset(CHECK_TIME_ADJUSTMENT_CREATE_FORM_NAME));
            yield put(NavigationActions.back({ key: EMPLOYEE_MANAGEMENT_MENUS }));

            yield put(resetApprovalBadge());
        }
    }
};
