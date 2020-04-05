import { doSubmit } from 'react-native-core/api/submit/saga';
import { take, fork, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import Trans from '_features/common/containers/Trans';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import { RECOMPENSE_WORKING_ALL_CANCEL_TRANSITION } from '../constants';
import { recompenseWorkingAllCancelTransition, getRecompenseWorkingByNoneRequested, getRecompenseWorkingByRequested } from '../actions';
import * as Api from '../../api/recompense-working';

export const watchRecompenseWorkingRequestTransitionSubmit = function*() {
    while (true) {
        const submitAction = yield take(RECOMPENSE_WORKING_ALL_CANCEL_TRANSITION.SUBMIT);

        yield fork(doSubmit, recompenseWorkingAllCancelTransition, {
            apiFunction: Api.recompenseWorkingAllCancelTransition,
            args: [submitAction.payload]
        });

        const action = yield take([
            RECOMPENSE_WORKING_ALL_CANCEL_TRANSITION.SUBMIT_VALIDATION_FAILED,
            RECOMPENSE_WORKING_ALL_CANCEL_TRANSITION.SUBMIT_SUCCESS,
            RECOMPENSE_WORKING_ALL_CANCEL_TRANSITION.SUBMIT_FAILURE,
        ]);

        if (action.type === RECOMPENSE_WORKING_ALL_CANCEL_TRANSITION.SUBMIT_SUCCESS) {
            let translationDescription = 'general.alert.cancel';
            if (submitAction.payload.transition === 'request_cancel') {
                translationDescription = 'general.alert.requested';
            }

            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran(translationDescription),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(NavigationActions.back());
            yield put(getRecompenseWorkingByNoneRequested.request());
            yield put(getRecompenseWorkingByRequested.request(STATE_REQUESTED_AND_REQUESTED_CANCEL));
        }
    }
};
