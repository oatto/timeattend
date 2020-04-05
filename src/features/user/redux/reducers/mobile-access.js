import { call, put, take, takeLatest, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import ref from 'react-native-core/utils/ref';
import { doRequest } from 'react-native-core/api/request/saga';
import { doSubmit } from 'react-native-core/api/submit/saga';
import DeviceInfo from 'react-native-device-info';
import requestReducer from 'react-native-core/api/request/reducer';
import { NOTIFICATION_OPENED, NOTIFICATION_RECEIVED } from '_features/common/redux/constants';
import { registerPushPlayerId } from '_features/user/redux/reducers/oauth';
import { MNG_DASHBOARD } from '_features/mng-dashboard/router';
import { DEVICE_ACCESS_CHECK, PRIVATE_KEY } from '_features/user/router';
import Trans from "_features/common/containers/Trans";
import { GET_CHECK_TIME_LATEST } from "_features/check-time/redux/constants";
import { GET_DEVICE_ACCESS_CHECK, DEVICE_ACCESS_CHECK_STATE_KEY } from '../constants';
import { pushPlayerId, userProfile as userProfileSelector } from '../selectors';
import {
    getDeviceAccessCheck as getDeviceAccessCheckActions,
    requestNewDeviceAccess as requestNewDeviceAccessActions,
    recheckDeviceAccess as recheckDeviceAccessActions,
    checkDeviceAccessOnLogin as checkDeviceAccessOnLoginActions

} from '../actions';
import * as Api from '../../api/oauth';
import { IS_MANAGER_APP } from '../../../../common/constants';

const deviceModel = DeviceInfo.getModel().replace(/\s/g, "");
DeviceInfo.getModel();
const devicePlatform = DeviceInfo.getSystemName().replace(/\s/g, "");
DeviceInfo.getModel();
const uniqueId = DeviceInfo.getUniqueID().replace(/\s/g, "");
DeviceInfo.getUniqueID();

export const watchMobileAccessNotificationReceived = function*() {
    while (true) {
        const { payload, type } = yield take([NOTIFICATION_OPENED, NOTIFICATION_RECEIVED]);

        if (type === NOTIFICATION_OPENED) {
            yield take(GET_CHECK_TIME_LATEST.SUCCESS);
        }

        const topic = ref(payload.notification, 'payload.additionalData.topic');
        const topicType = ref(payload.notification, 'payload.additionalData.topic_type');

        if (topic !== 'mobile_access') {
            continue;
        }

        if (['approve', 'reject'].indexOf(topicType) === -1) {
            continue;
        }

        if ('reject' === topicType) {
            const message = ref(payload.notification, 'payload.body');

            alert(message);
        }

        if ('approve' === topicType) {
            alert(Trans.tran('mobile_access.alert.approved'));

            yield put(recheckDeviceAccessActions());
        }
    }
};

export const watchGetDeviceAccessCheckRequest = function*() {
    const _goToDashboard = function *() {
        yield put(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: MNG_DASHBOARD
                })
            ]
        }));
    };

    const _goToPrivateKey = function*() {
        yield put(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: PRIVATE_KEY,
                    params: {
                        fromPage: 'init'
                    }
                })
            ]
        }));
    };

    yield takeLatest(GET_DEVICE_ACCESS_CHECK.REQUEST, function*() {
        yield call(doRequest, getDeviceAccessCheckActions, {
            apiFunction: Api.getMobileAccessCheck,
            args: [uniqueId]
        })
    });

    yield takeLatest(recheckDeviceAccessActions().type, function*() {
        yield put(getDeviceAccessCheckActions.request());

        const { data } = yield take(GET_DEVICE_ACCESS_CHECK.SUCCESS);

        if (true === data.enabled) {
            yield call(registerPushPlayerId);
            yield call(_goToDashboard);

            return;
        }

        alert('เครื่องของท่านยังไม่ผ่านการอนุมัติ');

        if (false === data.should_request_new_mobile_access) {
            return;
        }

        yield call(requestNewDeviceAccess);
    });

    yield takeLatest(checkDeviceAccessOnLoginActions().type, function*() {
        yield put(getDeviceAccessCheckActions.request());

        const userProfile = yield select(userProfileSelector);
        const { data } = yield take(GET_DEVICE_ACCESS_CHECK.SUCCESS);

        // revoke or register
        yield call(registerPushPlayerId, !data.enabled);

        if (true === data.enabled && userProfile.is_private_password_required) {
            yield call(_goToPrivateKey);

            return
        }

        if (true === data.enabled) {
            yield call(_goToDashboard);

            return;
        }

        yield put(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: DEVICE_ACCESS_CHECK,
                })
            ]
        }));

        if (false === data.should_request_new_mobile_access) {
            return;
        }

        yield call(requestNewDeviceAccess);
    });
};

export const requestNewDeviceAccess = function*() {
    const playerId = yield select(pushPlayerId);
    const application = IS_MANAGER_APP ? 'manager' : 'employee';

    yield call(doSubmit, requestNewDeviceAccessActions, {
        apiFunction: Api.requestMobileAccess,
        args: [uniqueId, deviceModel, devicePlatform, playerId, application]
    }, {
        alertOnValidationFailed: false,
        meta: {
            disabledDisplayGlobalError: true
        }
    });
};

export const reducer = requestReducer(GET_DEVICE_ACCESS_CHECK, DEVICE_ACCESS_CHECK_STATE_KEY);
