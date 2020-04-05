import { Alert } from 'react-native';
import { reset } from 'redux-form';
import { fork, select, put, take } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import ref from 'react-native-core/utils/ref';
import indexReducer from 'react-native-core/api/paginate/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { doSubmit } from 'react-native-core/api/submit/saga';
import { alertChannel } from "react-native-core/features/common/redux/sagas";
import Trans from '_features/common/containers/Trans';
import { NOTIFICATION_OPENED, NOTIFICATION_RECEIVED } from '_features/common/redux/constants';
import { GET_CHECK_TIME_LATEST } from "_features/check-time/redux/constants";
import {
    createRecompenseWorking,
    getRecompenseWorkingByRequested,
    getRecompenseWorkingByNoneRequested
} from '../actions'
import {
    CREATE_RECOMPENSE_WORKING,
    GET_RECOMPENSE_WORKING_BY_REQUESTED,
    GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED,
    RECOMPENSE_WORKING_BY_REQUESTED_STATE_KEY,
    RECOMPENSE_WORKING_BY_NONE_REQUESTED_STATE_KEY
} from '../constants';
import { RECOMPENSE_WORKING } from '../../router';
import * as Api from '../../api/recompense-working';
import { NAME as recompenseWorkingCreateForm } from '../../forms/RecompenseWorkingCreateForm';

export const watchRecompenseWorkPermissionNotificationReceived = function*() {
    while (true) {
        const { payload, type } = yield take([NOTIFICATION_OPENED, NOTIFICATION_RECEIVED]);

        if (type === NOTIFICATION_OPENED) {
            yield take(GET_CHECK_TIME_LATEST.SUCCESS);
        }

        const topic = ref(payload.notification, 'payload.additionalData.topic');
        const topic_type = ref(payload.notification, 'payload.additionalData.topic_type');

        if (topic !== 'recompense_work_request') {
            continue;
        }

        if (['approve', 'reject', 'approve_cancel', 'reject_cancel', 'cancel_after_approve'].indexOf(topic_type) === -1) {
            continue;
        }

        const actionNavigate = NavigationActions.navigate({
            routeName: RECOMPENSE_WORKING,
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
        )
    }
};

export const watchRecompenseWorkingByRequested = function*() {
    while (true) {
        const action = yield take([
            GET_RECOMPENSE_WORKING_BY_REQUESTED.REQUEST,
            GET_RECOMPENSE_WORKING_BY_REQUESTED.LOADMORE,
            GET_RECOMPENSE_WORKING_BY_REQUESTED.REFRESH
        ]);
        const data = yield select((state) => state.recompenseWorking[RECOMPENSE_WORKING_BY_REQUESTED_STATE_KEY]);

        yield fork(doRequest, getRecompenseWorkingByRequested, {
            apiFunction: Api.getRecompenseWorkingByState,
            args: [
                (action.type === GET_RECOMPENSE_WORKING_BY_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_RECOMPENSE_WORKING_BY_REQUESTED.REQUEST})
    }
};

export const watchCheckTimeAdjustmentIsNotRequest = function*() {
    while (true) {
        const action = yield take([
            GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED.REQUEST,
            GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED.LOADMORE,
            GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED.REFRESH
        ]);
        const data = yield select((state) => state.recompenseWorking[RECOMPENSE_WORKING_BY_NONE_REQUESTED_STATE_KEY]);

        yield fork(doRequest, getRecompenseWorkingByNoneRequested, {
            apiFunction: Api.getRecompenseWorkingNoneRequested,
            args: [
                (action.type === GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED.REQUEST})
    }
};

export const watchRecompenseWorkingCreateRequest = function*() {
    while (true) {
        const action = yield take(CREATE_RECOMPENSE_WORKING.SUBMIT);

        yield fork(doSubmit, createRecompenseWorking, {
            apiFunction: Api.createRecompenseWorking,
            args: [action.payload]
        })
    }
};

export const watchRecompenseWorkingCreateRequestSuccess = function*() {
    while (true) {
        yield take(CREATE_RECOMPENSE_WORKING.SUBMIT_SUCCESS);

        Alert.alert(Trans.tran('recompense_working.alert_reducer.success'),
            Trans.tran('recompense_working.alert_reducer.Workdays_change_request'),
            [{ text: Trans.tran('recompense_working.alert_reducer.ok') }]
        );

        yield put(reset(recompenseWorkingCreateForm));
        yield put(NavigationActions.navigate({
            routeName: RECOMPENSE_WORKING
        }))
    }
};

export const recompenseWorkingByRequestedReducer = indexReducer(GET_RECOMPENSE_WORKING_BY_REQUESTED, RECOMPENSE_WORKING_BY_REQUESTED_STATE_KEY);
export const recompenseWorkingNoneRequestedReducer = indexReducer(GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED, RECOMPENSE_WORKING_BY_NONE_REQUESTED_STATE_KEY);
