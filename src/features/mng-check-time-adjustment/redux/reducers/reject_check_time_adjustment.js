import { take, fork, put } from 'redux-saga/effects';
import { Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import { doSubmit } from 'react-native-core/api/submit/saga';
import { MNG_REJECT_CHECK_TIME_ADJUSTMENT } from '../constants';
import * as Api from '../../api/mng-check-time-adjustment';
import Trans from "../../../common/containers/Trans";
import {
    mngRejectCheckTimeAdjustment,
    fetchMngCheckTimeAdjustmentRejected,
    fetchMngCheckTimeAdjustmentRequested
} from "../actions";
import { resetApprovalBadge } from "../../../mng-core/redux/actions";

export const watchMngRejectCheckTimeAdjustmentSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_REJECT_CHECK_TIME_ADJUSTMENT.SUBMIT);

        yield fork(doSubmit, mngRejectCheckTimeAdjustment, {
            apiFunction: Api.mngRejectCheckTimeAdjustment,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_REJECT_CHECK_TIME_ADJUSTMENT.SUBMIT_VALIDATION_FAILED,
            MNG_REJECT_CHECK_TIME_ADJUSTMENT.SUBMIT_SUCCESS,
            MNG_REJECT_CHECK_TIME_ADJUSTMENT.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_REJECT_CHECK_TIME_ADJUSTMENT.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('general.alert.rejected'),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(NavigationActions.back());
            yield put(fetchMngCheckTimeAdjustmentRejected.request());
            yield put(fetchMngCheckTimeAdjustmentRequested.request());

            yield put(resetApprovalBadge());
        }
    }
};
