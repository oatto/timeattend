import isUndefined from 'lodash/isUndefined';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { call, fork, put, select, take } from 'redux-saga/effects';
import ref from 'react-native-core/utils/ref';
import { doRequest } from 'react-native-core/api/request/saga';
import { doSubmit } from 'react-native-core/api/submit/saga';
import indexReducer from 'react-native-core/api/paginate/reducer';
import { alertChannel } from "react-native-core/features/common/redux/sagas";
import { NOTIFICATION_OPENED, NOTIFICATION_RECEIVED } from '_features/common/redux/constants';
import { getUserTakeLeave } from '_features/user/redux/actions';
import { GET_CHECK_TIME_LATEST } from "_features/check-time/redux/constants";
import * as Api from '../../api/take-leave';
import {
    GET_TAKE_LEAVE_REQUEST_BY_REQUESTED,
    GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED,
    TAKE_LEAVE_REQUEST_BY_REQUESTED_STATE_KEY,
    TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED_STATE_KEY,
    TAKE_LEAVE_REQUEST_CREATE,
} from '../constants';
import {
    getTakeLeaveRequestByRequested as getTakeLeaveRequestByRequestedActions,
    getTakeLeaveRequestByNoneRequested,
    createTakeLeaveRequest
} from '../actions';
import { TAKE_LEAVE_REQUEST } from '../../router';
import Trans from "../../../common/containers/Trans";

export const watchTakeLeavePermissionNotificationReceived = function*() {
    while (true) {
        const { payload, type } = yield take([NOTIFICATION_OPENED, NOTIFICATION_RECEIVED]);

        if (type === NOTIFICATION_OPENED) {
            yield take(GET_CHECK_TIME_LATEST.SUCCESS);
        }

        const topic = ref(payload.notification, 'payload.additionalData.topic');
        const topic_type = ref(payload.notification, 'payload.additionalData.topic_type');

        if (topic !== 'take_leave_request') {
            continue;
        }

        if (['approve', 'reject', 'approve_cancel', 'reject_cancel', 'cancel_after_approve'].indexOf(topic_type) === -1) {
            continue;
        }

        const actionNavigate = NavigationActions.navigate({
            routeName: TAKE_LEAVE_REQUEST,
            params: {
                isRootPage: true,
                tabIndexInit: 1,
            }
        });

        Alert.alert(
            Trans.tran('general.notice'),
            ref(payload.notification, 'payload.body'), [
                {text: Trans.tran('general.close')},
                {
                    text: Trans.tran('general.detail'),
                    onPress: () => alertChannel.put(actionNavigate)
                }
            ]
        );
    }
};

export const watchTakeLeaveRequestByRequestedList = function*() {
    while (true) {
        const action = yield take([GET_TAKE_LEAVE_REQUEST_BY_REQUESTED.REQUEST, GET_TAKE_LEAVE_REQUEST_BY_REQUESTED.LOADMORE, GET_TAKE_LEAVE_REQUEST_BY_REQUESTED.REFRESH]);
        const data = yield select((state) => state.takeLeave[TAKE_LEAVE_REQUEST_BY_REQUESTED_STATE_KEY]);

        yield fork(doRequest, getTakeLeaveRequestByRequestedActions, {
            apiFunction: Api.getTakeLeaveRequest,
            args: [
                (action.type === GET_TAKE_LEAVE_REQUEST_BY_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_TAKE_LEAVE_REQUEST_BY_REQUESTED.REQUEST})
    }
};

export const watchTakeLeaveRequestByNoneRequestedList = function*() {
    while (true) {
        const action = yield take([GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED.REQUEST, GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED.LOADMORE, GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED.REFRESH]);
        const data = yield select((state) => state.takeLeave[TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED_STATE_KEY]);

        yield fork(doRequest, getTakeLeaveRequestByNoneRequested, {
            apiFunction: Api.getTakeLeaveRequestNoneRequested,
            args: [
                (action.type === GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED.REQUEST})
    }
};

export const watchTakeLeaveRequestSubmit = function* () {
    while (true) {
        const action = yield take(TAKE_LEAVE_REQUEST_CREATE.SUBMIT);

        yield call(doSubmit, createTakeLeaveRequest, {
            apiFunction: Api.createTakeLeaveRequest,
            args: [action.payload]
        });
    }
};

export const watchTakeLeaveRequestSubmitSuccess = function* () {
    while (true) {
        yield take(TAKE_LEAVE_REQUEST_CREATE.SUBMIT_SUCCESS);

        Alert.alert(Trans.tran('recompense_working.alert_reducer.success'),
            Trans.tran('take_leave_request.alert_reducer.add_request_leave'),
            [{ text: Trans.tran('recompense_working.alert_reducer.ok') }]
        );

        yield put(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: TAKE_LEAVE_REQUEST, params: {isRootPage: true} })
            ]
        }));
    }
};

export const watchTakeLeaveRequestFormStart = function* () {
    while (true) {
        const action = yield take(['@@redux-form/INITIALIZE']);

        if ('takeLeaveRequestCreateForm' !== action.meta.form) {
            continue;
        }

        const data = yield select((state) => state.user.userTakeLeave);

        if (isUndefined(data)) {
            yield put(getUserTakeLeave.request())
        }
    }
};

export const reducerByRequested = indexReducer(GET_TAKE_LEAVE_REQUEST_BY_REQUESTED, TAKE_LEAVE_REQUEST_BY_REQUESTED_STATE_KEY);
export const reducerByNoneRequested = indexReducer(GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED, TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED_STATE_KEY);
