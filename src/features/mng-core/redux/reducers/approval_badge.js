import { call, takeLatest, put, select } from 'redux-saga/effects';
import requestReducer from 'react-native-core/api/request/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { APPROVAL_BADGE, APPROVAL_BADGE_STATE_KEY, APPROVAL_BADGE_RESET } from '../constants';
import { approvalBadge } from '../actions';
import { isManager as isManagerSelector } from '../selectors';
import * as Api from '../../api/approval-badges';

export const watchApprovalBadgeRequest = function*() {
    yield takeLatest(APPROVAL_BADGE.REQUEST, function*() {
        // do stuff
        yield call(doRequest, approvalBadge, {
            apiFunction: Api.mngGetApprovalBadges,
            args: []
        }, {showLoading: false})
    });
};

export const watchCalleeApprovalBadge = function *() {
    yield takeLatest([APPROVAL_BADGE_RESET, 'RESET_USER_SUCCESS'], function*() {
        const isManager = yield select((state) => isManagerSelector(state));

        if (false === isManager) {
            return;
        }

        yield put(approvalBadge.request());
    });
};

export const approvalBadgeReducer = requestReducer(APPROVAL_BADGE, APPROVAL_BADGE_STATE_KEY);
