import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork, put } from 'redux-saga/effects';
import { NavigationActions } from "react-navigation";
import { Alert } from 'react-native';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import Trans from '_features/common/containers/Trans';
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { MNG_EM_TAKE_LEAVE_ALL_APPROVE_TRANSITION } from '../constants';
import {
    mngEmTakeLeaveAllApproveTransition,
    getMngEmTakeLeaveRequestByUserAndRequested,
    getMngEmTakeLeaveRequestByUserAndApproved,
    getMngEmTakeLeaveRequestByUserAndRejected
} from '../actions';
import * as Api from '../../api/mng-em-take-leave';

export const watchMngEmTakeLeaveAllApproveTransitionSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_EM_TAKE_LEAVE_ALL_APPROVE_TRANSITION.SUBMIT);

        yield fork(doSubmit, mngEmTakeLeaveAllApproveTransition, {
            apiFunction: Api.mngEmTakeLeaveAllApprovTransition,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_EM_TAKE_LEAVE_ALL_APPROVE_TRANSITION.SUBMIT_VALIDATION_FAILED,
            MNG_EM_TAKE_LEAVE_ALL_APPROVE_TRANSITION.SUBMIT_SUCCESS,
            MNG_EM_TAKE_LEAVE_ALL_APPROVE_TRANSITION.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_EM_TAKE_LEAVE_ALL_APPROVE_TRANSITION.SUBMIT_SUCCESS) {
            let translationDescription = 'general.alert.approved';
            const employeeId = submitAction.payload.employeeId;

            if (submitAction.payload.transition === 'cancel_after_approve') {
                translationDescription = 'general.alert.cancel';
            }

            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran(translationDescription),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(NavigationActions.back());
            yield put(getMngEmTakeLeaveRequestByUserAndRequested.request({
                employeeId: employeeId,
                transition: STATE_REQUESTED_AND_REQUESTED_CANCEL
            }));

            yield put(getMngEmTakeLeaveRequestByUserAndApproved.request({
                employeeId: employeeId
            }));

            yield put(getMngEmTakeLeaveRequestByUserAndRejected.request({
                employeeId: employeeId
            }));

            yield put(resetApprovalBadge());
        }
    }
};
