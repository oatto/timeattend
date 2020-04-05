import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import Trans from '_features/common/containers/Trans';
import { NavigationActions } from 'react-navigation';
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { MNG_EM_RECOMPENSE_WORKING_ALL_REJECT_TRANSITION } from '../constants';
import {
    mngEmRecompenseWorkingAllRejectTransition,
    fetchMngEmRecompenseWorkingRequested,
    fetchMngEmRecompenseWorkingRejected,
    fetchMngEmRecompenseWorkingApproved
} from '../actions';
import * as Api from '../../api/mng-em-recompense-working';

export const watchMngEmRecompenseWorkingAllRejectTransitionSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_EM_RECOMPENSE_WORKING_ALL_REJECT_TRANSITION.SUBMIT);

        yield fork(doSubmit, mngEmRecompenseWorkingAllRejectTransition, {
            apiFunction: Api.mngRecompenseWorkingAllRejectTransition,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_EM_RECOMPENSE_WORKING_ALL_REJECT_TRANSITION.SUBMIT_VALIDATION_FAILED,
            MNG_EM_RECOMPENSE_WORKING_ALL_REJECT_TRANSITION.SUBMIT_SUCCESS,
            MNG_EM_RECOMPENSE_WORKING_ALL_REJECT_TRANSITION.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_EM_RECOMPENSE_WORKING_ALL_REJECT_TRANSITION.SUBMIT_SUCCESS) {
            const employeeId = submitAction.payload.employeeId;

            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('general.alert.rejected'),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(NavigationActions.back());
            yield put(fetchMngEmRecompenseWorkingRequested.request({
                employeeId: employeeId,
                transition: STATE_REQUESTED_AND_REQUESTED_CANCEL
            }));

            yield put(fetchMngEmRecompenseWorkingRejected.request({
                employeeId: employeeId,
            }));

            yield put(fetchMngEmRecompenseWorkingApproved.request({
                employeeId: employeeId,
            }));

            yield put(resetApprovalBadge());
        }
    }
};
