import { Alert } from 'react-native';
import { doSubmit } from 'react-native-core/api/submit/saga';
import { doRequest } from 'react-native-core/api/request/saga';
import indexReducer from 'react-native-core/api/paginate/reducer';
import { fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { resetApprovalBadge } from '_features/mng-core/redux/actions';
import Trans from '_features/common/containers/Trans';
import { MNG_MOBILE_ACCESS_APPROVAL } from '../../router';
import {
    FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL,
    FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL_STATE_KEY,
    FETCH_MNG_MOBILE_ACCESS_APPROVED,
    FETCH_MNG_MOBILE_ACCESS_APPROVED_STATE_KEY,
    APPROVED_MOBILE_ACCESS,
    REJECTED_MOBILE_ACCESS,
    DELETE_MOBILE_ACCESS
} from "../constants";

import {
    fetchMngMobileAccessApprovalRequested,
    fetchMngMobileAccessApproved,
    mngApprovedMobileAccess,
    mngRejectedMobileAccess,
    mngDeleteMobileAccess
} from '../actions';

import * as Api from '../../api/mng-mobile-access-approval';

export const watchMngMobileAccessApprovalRequest = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL.REQUEST,
            FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL.LOADMORE,
            FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL.REFRESH
        ]);

        const data = yield select((state) => state.mngMobileAccessApproval[FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL_STATE_KEY]);

        yield fork(doRequest, fetchMngMobileAccessApprovalRequested, {
            apiFunction: Api.mngGetMobileAccessRequested,
            args: [
                (action.type === FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL.REQUEST})
    }
};

export const watchMngMobileAccessApproved = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_MOBILE_ACCESS_APPROVED.REQUEST,
            FETCH_MNG_MOBILE_ACCESS_APPROVED.LOADMORE,
            FETCH_MNG_MOBILE_ACCESS_APPROVED.REFRESH
        ]);

        const data = yield select((state) => state.mngMobileAccessApproval[FETCH_MNG_MOBILE_ACCESS_APPROVED_STATE_KEY]);

        yield fork(doRequest, fetchMngMobileAccessApproved, {
            apiFunction: Api.mngGetMobileAccessApproved,
            args: [
                (action.type === FETCH_MNG_MOBILE_ACCESS_APPROVED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_MOBILE_ACCESS_APPROVED.REQUEST})
    }
};

export const watchMngApprovedMobileAccessSubmit = function* () {
    yield takeLatest(APPROVED_MOBILE_ACCESS.SUBMIT, function* ({payload}) {
        yield fork(doSubmit, mngApprovedMobileAccess, {
            apiFunction: Api.mngApprovedMobileAccess,
            args: [payload.id]
        });

        yield take(APPROVED_MOBILE_ACCESS.SUBMIT_SUCCESS);

        Alert.alert(Trans.tran('general.alert.success'),
            Trans.tran('general.alert.approved'),
            [{ text: Trans.tran('general.alert.ok') }]
        );

        yield put(resetApprovalBadge());

        yield put(fetchMngMobileAccessApprovalRequested.request());
    });
};

export const watchMngRejectedMobileAccessSubmit = function* () {
    yield takeLatest(REJECTED_MOBILE_ACCESS.SUBMIT, function* ({payload}) {
        yield fork(doSubmit, mngRejectedMobileAccess, {
            apiFunction: Api.mngRejectedMobileAccess,
            args: [payload]
        });

        yield take(REJECTED_MOBILE_ACCESS.SUBMIT_SUCCESS);

        Alert.alert(Trans.tran('general.alert.success'),
            Trans.tran('general.alert.rejected'),
            [{ text: Trans.tran('general.alert.ok') }]
        );

        yield put(resetApprovalBadge());

        yield put(fetchMngMobileAccessApprovalRequested.request());
    });
};

export const watchMngDeleteMobileAccessSubmit = function* () {
    yield takeLatest(DELETE_MOBILE_ACCESS.SUBMIT, function* ({payload}) {
        yield fork(doSubmit, mngDeleteMobileAccess, {
            apiFunction: Api.mngDeleteMobileAccess,
            args: [
                payload.id
            ]
        });

        yield take(DELETE_MOBILE_ACCESS.SUBMIT_SUCCESS);

        Alert.alert(Trans.tran('general.alert.success'),
            Trans.tran('general.alert.deleted'),
            [{ text: Trans.tran('general.alert.ok') }]
        );

        yield put(fetchMngMobileAccessApproved.request());
    });
};

export const reducerMngMobileAccessApprovalRequested = indexReducer(FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL, FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL_STATE_KEY);
export const reducerMngMobileAccessApproved = indexReducer(FETCH_MNG_MOBILE_ACCESS_APPROVED, FETCH_MNG_MOBILE_ACCESS_APPROVED_STATE_KEY);
