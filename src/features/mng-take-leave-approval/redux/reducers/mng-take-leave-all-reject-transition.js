import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork, put } from 'redux-saga/effects';
import Trans from '_features/common/containers/Trans';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import { resetApprovalBadge } from '_features/mng-core/redux/actions';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import { MNG_TAKE_LEAVE_ALL_REJECT_TRANSITION } from '../constants';
import { mngTakeLeaveAllRejectTransition, fetchMngTakeLeaveRequested, fetchMngTakeLeaveApproved, fetchMngTakeLeaveRejected } from '../actions';
import * as Api from '../../api/mng-take-leave-approval';

export const watchMngTakeLeaveAllRejectTransitionSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_TAKE_LEAVE_ALL_REJECT_TRANSITION.SUBMIT);

        yield fork(doSubmit, mngTakeLeaveAllRejectTransition, {
            apiFunction: Api.mngTakeLeaveAllRejectTransition,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_TAKE_LEAVE_ALL_REJECT_TRANSITION.SUBMIT_VALIDATION_FAILED,
            MNG_TAKE_LEAVE_ALL_REJECT_TRANSITION.SUBMIT_SUCCESS,
            MNG_TAKE_LEAVE_ALL_REJECT_TRANSITION.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_TAKE_LEAVE_ALL_REJECT_TRANSITION.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('general.alert.rejected'),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(NavigationActions.back());
            yield put(fetchMngTakeLeaveRequested.request({transition: STATE_REQUESTED_AND_REQUESTED_CANCEL}));
            yield put(fetchMngTakeLeaveApproved.request());
            yield put(fetchMngTakeLeaveRejected.request());

            yield put(resetApprovalBadge());
        }
    }
};
