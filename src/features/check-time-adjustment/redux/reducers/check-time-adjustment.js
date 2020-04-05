import { reset } from 'redux-form';
import { Alert } from 'react-native';
import { fork, select, put, take } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import ref from 'react-native-core/utils/ref';
import { doSubmit } from 'react-native-core/api/submit/saga';
import { doRequest } from 'react-native-core/api/request/saga';
import indexReducer from 'react-native-core/api/paginate/reducer';
import { alertChannel } from "react-native-core/features/common/redux/sagas";
import Trans from '_features/common/containers/Trans';
import { GET_CHECK_TIME_LATEST } from "_features/check-time/redux/constants";
import { NOTIFICATION_OPENED, NOTIFICATION_RECEIVED } from '_features/common/redux/constants';
import {
    createTimeAdjustment,
    rejectedTimeAdjustment,
    getTimeAdjustmentByRequested,
    getTimeAdjustmentIsNotRequested
} from '../actions'
import {
    CREATE_TIME_ADJUSTMENT,
    REJECTED_TIME_ADJUSTMENT,
    GET_TIME_ADJUSTMENT_BY_REQUESTED,
    GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED,
    TIME_ADJUSTMENT_BY_REQUESTED_STATE_KEY,
    TIME_ADJUSTMENT_IS_NOT_REQUESTED_STATE_KEY
} from '../constants';
import * as Api from '../../api/check-time-adjustment';
import { CHECK_TIME_ADJUSTMENT } from '../../router';
import { NAME as checkTimeAdjustmentCreateForm } from '../../forms/CheckTimeAdjustmentCreateForm';

export const watchCheckTimeAdjustmentPermissionNotificationReceived = function*() {
    while (true) {
        const { payload, type } = yield take([NOTIFICATION_OPENED, NOTIFICATION_RECEIVED]);

        if (type === NOTIFICATION_OPENED) {
            yield take(GET_CHECK_TIME_LATEST.SUCCESS);
        }

        const topic = ref(payload.notification, 'payload.additionalData.topic');
        const topic_type = ref(payload.notification, 'payload.additionalData.topic_type');

        if (topic !== 'time_adjustment') {
            continue;
        }

        if (['approve', 'reject'].indexOf(topic_type) === -1) {
            continue;
        }

        const actionNavigate = NavigationActions.navigate({
            routeName: CHECK_TIME_ADJUSTMENT,
            params: {
                isRootPage: true,
                tabIndexInit: 2,
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

export const watchCheckTimeAdjustmentRequest = function*() {
    while (true) {
        const action = yield take([
            GET_TIME_ADJUSTMENT_BY_REQUESTED.REQUEST,
            GET_TIME_ADJUSTMENT_BY_REQUESTED.LOADMORE,
            GET_TIME_ADJUSTMENT_BY_REQUESTED.REFRESH
        ]);
        const data = yield select((state) => state.checkTimeAdjustment[TIME_ADJUSTMENT_BY_REQUESTED_STATE_KEY]);

        yield fork(doRequest, getTimeAdjustmentByRequested, {
            apiFunction: Api.getCheckTimeAdjustmentByState,
            args: [
                (action.type === GET_TIME_ADJUSTMENT_BY_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_TIME_ADJUSTMENT_BY_REQUESTED.REQUEST})
    }
};

export const watchCheckTimeAdjustmentIsNotRequest = function*() {
    while (true) {
        const action = yield take([
            GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED.REQUEST,
            GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED.LOADMORE,
            GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED.REFRESH
        ]);
        const data = yield select((state) => state.checkTimeAdjustment[TIME_ADJUSTMENT_IS_NOT_REQUESTED_STATE_KEY]);

        yield fork(doRequest, getTimeAdjustmentIsNotRequested, {
            apiFunction: Api.getCheckTimeAdjustmentIsNotRequested,
            args: [
                (action.type === GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED.REQUEST})
    }
};

export const watchCreateCheckTimeAdjustment = function*() {
    while (true) {
        const action = yield take(CREATE_TIME_ADJUSTMENT.SUBMIT);

        yield fork(doSubmit, createTimeAdjustment, {
            apiFunction: Api.createCheckTimeAdjustment,
            args: [action.payload]
        })
    }
};

export const watchCreateCheckTimeAdjustmentSuccess = function*() {
    while (true) {
        yield take(CREATE_TIME_ADJUSTMENT.SUBMIT_SUCCESS);

        Alert.alert(Trans.tran('time_adjustment.alert_reducer.success'),
            Trans.tran('time_adjustment.alert_reducer.add_list_edit_time'),
            [{ text: Trans.tran('time_adjustment.alert_reducer.ok') }]
        );

        yield put(reset(checkTimeAdjustmentCreateForm));
        yield put(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: CHECK_TIME_ADJUSTMENT,
                    params: {
                        isRootPage: true,
                        tabIndexInit: 1
                    }
                })
            ]
        }));
    }
};

export const watchRejectedCheckTimeAdjustment = function*() {
    while (true) {
        const action = yield take(REJECTED_TIME_ADJUSTMENT.SUBMIT);

        yield fork(doSubmit, rejectedTimeAdjustment, {
            apiFunction: Api.rejectedCheckTimeAdjustment,
            args: [action.payload]
        })
    }
};

export const watchRejectedCheckTimeAdjustmentSuccess = function*() {
    while (true) {
        yield take(REJECTED_TIME_ADJUSTMENT.SUBMIT_SUCCESS);

        Alert.alert(Trans.tran('time_adjustment.show.cancel_list'),
            Trans.tran('recompense_working.alert_reducer.request_canceled'),
            [{ text: Trans.tran('recompense_working.alert_reducer.ok') }]
        );

        yield put(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: CHECK_TIME_ADJUSTMENT,
                    params: {
                        isRootPage: true,
                        tabIndexInit: 2
                    }
                })
            ]
        }));
        yield put(getTimeAdjustmentIsNotRequested.request());
        yield put(getTimeAdjustmentByRequested.request('requested'));
    }
};

export const checkTimeAdjustmentReducerByRequested = indexReducer(GET_TIME_ADJUSTMENT_BY_REQUESTED, TIME_ADJUSTMENT_BY_REQUESTED_STATE_KEY);
export const checkTimeAdjustmentReducerIsNotRequested = indexReducer(GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED, TIME_ADJUSTMENT_IS_NOT_REQUESTED_STATE_KEY);
