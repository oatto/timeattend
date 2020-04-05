import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork, put } from 'redux-saga/effects';
import { NavigationActions } from "react-navigation";
import Trans from '_features/common/containers/Trans';
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { Alert } from 'react-native';
import { MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED } from '../constants';
import { mngEmCheckTimeAdjustmentApproved, fetchMngEmCheckTimeAdjustmentRequested } from '../actions';
import * as Api from '../../api/mng-em-check-time-adjustment';

export const watchMngEmCheckTimeAdjustmentApprovedSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED.SUBMIT);

        yield fork(doSubmit, mngEmCheckTimeAdjustmentApproved, {
            apiFunction: Api.mngEmCheckTimeAdjustmentApproved,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED.SUBMIT_VALIDATION_FAILED,
            MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED.SUBMIT_SUCCESS,
            MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('general.alert.approved'),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(NavigationActions.back());
            yield put(fetchMngEmCheckTimeAdjustmentRequested.request({employeeId: submitAction.payload.employeeId}));

            yield put(resetApprovalBadge());
        }
    }
};
