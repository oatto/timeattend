import { take, fork, put } from 'redux-saga/effects';
import { doSubmit } from 'react-native-core/api/submit/saga';
import { Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import Trans from "../../../common/containers/Trans";
import { MNG_APPROVE_CHECK_TIME_ADJUSTMENT } from '../constants';
import { mngApproveCheckTimeAdjustment, fetchMngCheckTimeAdjustmentRequested, fetchMngCheckTimeAdjustmentApproved } from '../actions';
import * as Api from '../../api/mng-check-time-adjustment';
import { resetApprovalBadge } from "../../../mng-core/redux/actions";

export const watchMngApproveCheckTimeAdjustmentSubmit = function*() {
    while (true) {
        const submitAction = yield take(MNG_APPROVE_CHECK_TIME_ADJUSTMENT.SUBMIT);

        yield fork(doSubmit, mngApproveCheckTimeAdjustment, {
            apiFunction: Api.mngApproveCheckTimeAdjustment,
            args: [submitAction.payload]
        });

        const action = yield take([
            MNG_APPROVE_CHECK_TIME_ADJUSTMENT.SUBMIT_VALIDATION_FAILED,
            MNG_APPROVE_CHECK_TIME_ADJUSTMENT.SUBMIT_SUCCESS,
            MNG_APPROVE_CHECK_TIME_ADJUSTMENT.SUBMIT_FAILURE,
        ]);

        if (action.type === MNG_APPROVE_CHECK_TIME_ADJUSTMENT.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('general.alert.approved'),
                [{ text: Trans.tran('general.alert.ok') }]
            );

            yield put(NavigationActions.back());
            yield put(fetchMngCheckTimeAdjustmentRequested.request());
            yield put(fetchMngCheckTimeAdjustmentApproved.request());

            yield put(resetApprovalBadge());
        }
    }
};
