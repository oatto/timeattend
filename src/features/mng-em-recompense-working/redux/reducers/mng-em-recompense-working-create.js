import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork, put } from 'redux-saga/effects';
import { reset } from "redux-form";
import { Alert } from 'react-native';
import Trans from '_features/common/containers/Trans';
import { alertChannel } from 'react-native-core/features/common/redux/sagas';
import { NavigationActions } from "react-navigation";
import { EMPLOYEE_MANAGEMENT_MENUS } from "_features/mng-employee-management/router";
import { NAME as RECOMPENSE_WORKING_CREATE_FORM_NAME } from "_features/recompense-working/forms/RecompenseWorkingCreateForm";
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { MNG_EM_RECOMPENSE_WORKING_INDEX } from '_features/mng-em-recompense-working/router';
import { CREATE_MNG_EM_RECOMPENSE_WORKING } from '../constants';
import { createMngEmRecompenseWorking } from '../actions';
import * as Api from '../../api/mng-em-recompense-working';

export const watchCreateMngEmRecompenseWorkingSubmit = function*() {
    while (true) {
        const submitAction = yield take(CREATE_MNG_EM_RECOMPENSE_WORKING.SUBMIT);

        yield fork(doSubmit, createMngEmRecompenseWorking, {
            apiFunction: Api.mngEmCreateRecompenseWorkingByEmployee,
            args: [submitAction.payload]
        });

        const action = yield take([
            CREATE_MNG_EM_RECOMPENSE_WORKING.SUBMIT_VALIDATION_FAILED,
            CREATE_MNG_EM_RECOMPENSE_WORKING.SUBMIT_SUCCESS,
            CREATE_MNG_EM_RECOMPENSE_WORKING.SUBMIT_FAILURE,
        ]);

        if (action.type === CREATE_MNG_EM_RECOMPENSE_WORKING.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('recompense_working.alert_reducer.Workdays_change_request'),
                [
                    { text: Trans.tran('general.alert.later') },
                    {
                        text: Trans.tran('general.alert.approve'),
                        onPress: () => alertChannel.put(NavigationActions.navigate({routeName: MNG_EM_RECOMPENSE_WORKING_INDEX}))
                    }
                ]
            );

            yield put(reset(RECOMPENSE_WORKING_CREATE_FORM_NAME));
            yield put(NavigationActions.back({ key: EMPLOYEE_MANAGEMENT_MENUS }));

            yield put(resetApprovalBadge());
        }
    }
};
