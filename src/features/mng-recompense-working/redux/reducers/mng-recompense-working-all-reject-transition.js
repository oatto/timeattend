import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import Trans from '_features/common/containers/Trans';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import { NavigationActions } from 'react-navigation';
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { MNG_RECOMNPENSE_WORKING_ALL_REJECT_TRANSITION } from '../constants';
import { mngRecomnpenseWorkingAllRejectTransition, fetchMngRecompenseWorksRequested, fetchMngRecompenseWorksRejected, fetchMngRecompenseWorksApproved } from '../actions';
import * as Api from '../../api/mng-recompense-working';

export const watchMngRecomnpenseWorkingAllRejectTransitionSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_RECOMNPENSE_WORKING_ALL_REJECT_TRANSITION.SUBMIT);

        yield fork(doSubmit, mngRecomnpenseWorkingAllRejectTransition, {
            apiFunction: Api.mngRecompenseWorkingAllRejectTransition,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_RECOMNPENSE_WORKING_ALL_REJECT_TRANSITION.SUBMIT_VALIDATION_FAILED,
            MNG_RECOMNPENSE_WORKING_ALL_REJECT_TRANSITION.SUBMIT_SUCCESS,
            MNG_RECOMNPENSE_WORKING_ALL_REJECT_TRANSITION.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_RECOMNPENSE_WORKING_ALL_REJECT_TRANSITION.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('general.alert.rejected'),
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
