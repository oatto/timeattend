import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import Trans from '_features/common/containers/Trans';
import { TAKE_LEAVE_ALL_CANCEL_TRANSITION } from '../constants';
import { takeLeaveAllCancelTransition, getTakeLeaveRequestByRequested, getTakeLeaveRequestByNoneRequested } from '../actions';
import * as Api from '../../api/take-leave';

export const watchTakeLeaveAllCancelTransitionSubmit = function*() {
    while (true) {
        const submitAction = yield take(TAKE_LEAVE_ALL_CANCEL_TRANSITION.SUBMIT);

        yield fork(doSubmit, takeLeaveAllCancelTransition, {
            apiFunction: Api.takeLeaveAllCancelTransition,
            args: [submitAction.payload]
        });

        const action = yield take([
            TAKE_LEAVE_ALL_CANCEL_TRANSITION.SUBMIT_VALIDATION_FAILED,
            TAKE_LEAVE_ALL_CANCEL_TRANSITION.SUBMIT_SUCCESS,
            TAKE_LEAVE_ALL_CANCEL_TRANSITION.SUBMIT_FAILURE,
        ]);

        if (action.type === TAKE_LEAVE_ALL_CANCEL_TRANSITION.SUBMIT_SUCCESS) {
            let translationDescription = 'general.alert.cancel';
            if (submitAction.payload.transition === 'request_cancel') {
                translationDescription = 'general.alert.requested';
            }

            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran(translationDescription),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(NavigationActions.back());
            yield put(getTakeLeaveRequestByNoneRequested.request());
            yield put(getTakeLeaveRequestByRequested.request(STATE_REQUESTED_AND_REQUESTED_CANCEL));
        }
    }
};
