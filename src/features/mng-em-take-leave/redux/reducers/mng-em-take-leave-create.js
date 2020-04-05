import { doSubmit } from 'react-native-core/api/submit/saga';
import { reset } from "redux-form";
import { NavigationActions } from "react-navigation";
import { Alert } from 'react-native';
import Trans from '_features/common/containers/Trans';
import { alertChannel } from 'react-native-core/features/common/redux/sagas';
import { take, fork, put } from 'redux-saga/effects';
import { NAME as TAKE_LEAVE_REQUEST_FORM_NAME } from "_features/take-leave/forms/TakeLeaveRequestCreateForm";
import { EMPLOYEE_MANAGEMENT_MENUS } from "_features/mng-employee-management/router";
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { MNG_EM_TAKE_LEAVE } from '_features/mng-em-take-leave/router';
import { MNG_EM_TAKE_LEAVE_CREATE_BY_EMPLOYEE } from '../constants';
import { mngEmTakeLeaveCreateByEmployee } from '../actions';
import * as Api from '../../api/mng-em-take-leave';

export const watchMngEmTakeLeaveCreateByEmployeeSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_EM_TAKE_LEAVE_CREATE_BY_EMPLOYEE.SUBMIT);

        yield fork(doSubmit, mngEmTakeLeaveCreateByEmployee, {
            apiFunction: Api.mngEmCreateTakeLeaveByEmployee,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_EM_TAKE_LEAVE_CREATE_BY_EMPLOYEE.SUBMIT_VALIDATION_FAILED,
            MNG_EM_TAKE_LEAVE_CREATE_BY_EMPLOYEE.SUBMIT_SUCCESS,
            MNG_EM_TAKE_LEAVE_CREATE_BY_EMPLOYEE.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_EM_TAKE_LEAVE_CREATE_BY_EMPLOYEE.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('take_leave_request.alert_reducer.add_request_leave'),
                [
                    { text: Trans.tran('general.alert.later') },
                    {
                        text: Trans.tran('general.alert.approve'),
                        onPress: () => alertChannel.put(NavigationActions.navigate({routeName: MNG_EM_TAKE_LEAVE}))
                    }
                ]
            );

            yield put(reset(TAKE_LEAVE_REQUEST_FORM_NAME));
            yield put(NavigationActions.back({ key: EMPLOYEE_MANAGEMENT_MENUS }));

            yield put(resetApprovalBadge());
        }
    }
};
