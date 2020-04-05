import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import Trans from '_features/common/containers/Trans';
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { NavigationActions } from 'react-navigation';
import { MNG_RECOMPENSE_WORKING_ALL_APPROVAL_TRANSITION } from '../constants';
import { mngRecompenseWorkingAllApprovalTransition, fetchMngRecompenseWorksRequested, fetchMngRecompenseWorksApproved, fetchMngRecompenseWorksRejected } from '../actions';
import * as Api from '../../api/mng-recompense-working';

export const watchMngRecompenseWorkingAllApprovalTransitionSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_RECOMPENSE_WORKING_ALL_APPROVAL_TRANSITION.SUBMIT);

        yield fork(doSubmit, mngRecompenseWorkingAllApprovalTransition, {
            apiFunction: Api.mngRecompenseWorkingAllApprovalTransition,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_RECOMPENSE_WORKING_ALL_APPROVAL_TRANSITION.SUBMIT_VALIDATION_FAILED,
            MNG_RECOMPENSE_WORKING_ALL_APPROVAL_TRANSITION.SUBMIT_SUCCESS,
            MNG_RECOMPENSE_WORKING_ALL_APPROVAL_TRANSITION.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_RECOMPENSE_WORKING_ALL_APPROVAL_TRANSITION.SUBMIT_SUCCESS) {
            let translationDescription = 'general.alert.approved';
            if (submitAction.payload.transition === 'cancel_after_approve') {
                translationDescription = 'general.alert.cancel';
            }

            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran(translationDescription),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(NavigationActions.back());
            yield put(fetchMngRecompenseWorksRequested.request({transition: STATE_REQUESTED_AND_REQUESTED_CANCEL}));
            yield put(fetchMngRecompenseWorksApproved.request());
            yield put(fetchMngRecompenseWorksRejected.request());

            yield put(resetApprovalBadge());
        }
    }
};
