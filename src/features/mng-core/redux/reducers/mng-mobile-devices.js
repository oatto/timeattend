import { Alert } from 'react-native';
import { doSubmit } from 'react-native-core/api/submit/saga';
import { doRequest } from 'react-native-core/api/request/saga';
import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import indexReducer from 'react-native-core/api/paginate/reducer';
import Trans from '_features/common/containers/Trans';
import { findAndReplace } from 'timemint/src/utils/array';
import {
    FETCH_MNG_EMPLOYEE_MOBILE_DEVICES,
    FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY, MNG_FETCH_PUBLIC_DEVICE, MNG_FETCH_PUBLIC_DEVICE_STATE_KEY,
    PUBLIC_MOBILE_DEVICE
} from "../constants";

import {
    fetchMngEmployeeMobileDevices, mngFetchPublicDevice,
    mngPublicMobileDevice
} from '../actions';

import * as Api from '../../api/mng-mobile-devices';

export const watchMngEmployeeMobileDevices = function*() {
    while (true) {
        const action = yield take([
            FETCH_MNG_EMPLOYEE_MOBILE_DEVICES.REQUEST,
            FETCH_MNG_EMPLOYEE_MOBILE_DEVICES.LOADMORE,
            FETCH_MNG_EMPLOYEE_MOBILE_DEVICES.REFRESH
        ]);

        const data = yield select((state) => state.mngCore[FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY]);

        yield fork(doRequest, fetchMngEmployeeMobileDevices, {
            apiFunction: Api.mngGetEmployeeMobileDevices,
            args: [
                (action.type === FETCH_MNG_EMPLOYEE_MOBILE_DEVICES.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: action.type === FETCH_MNG_EMPLOYEE_MOBILE_DEVICES.REQUEST})
    }
};

export const watchMngPublicMobileDeviceSubmit = function* () {
    yield takeLatest(PUBLIC_MOBILE_DEVICE.SUBMIT, function* ({payload}) {
        yield fork(doSubmit, mngPublicMobileDevice, {
            apiFunction: Api.mngMobileDeviceUpdatePermission,
            args: [payload]
        });

        yield take(PUBLIC_MOBILE_DEVICE.SUBMIT_SUCCESS);

        yield put(mngFetchPublicDevice.request());

        Alert.alert(Trans.tran('general.alert.success'),
            Trans.tran('general.alert.success'),
            [{ text: Trans.tran('general.alert.ok') }]
        );
    });
};

export const watchMngFetchPublicDevicePaginate = function*() {
    while (true) {
        const action = yield take([MNG_FETCH_PUBLIC_DEVICE.REQUEST, MNG_FETCH_PUBLIC_DEVICE.LOADMORE, MNG_FETCH_PUBLIC_DEVICE.REFRESH]);
        const data = yield select((state) => state.mngCore[MNG_FETCH_PUBLIC_DEVICE_STATE_KEY]);

        yield fork(doRequest, mngFetchPublicDevice, {
            apiFunction: Api.mngGetPublicMobileDevices,
            args: [
                (action.type === MNG_FETCH_PUBLIC_DEVICE.LOADMORE) ? data.pagination.currentPage + 1 : 1
            ]
        }, {showLoading: action.type === MNG_FETCH_PUBLIC_DEVICE.REQUEST})
    }
};

export const mngFetchPublicDeviceReducer = indexReducer(MNG_FETCH_PUBLIC_DEVICE, MNG_FETCH_PUBLIC_DEVICE_STATE_KEY);

export const mngAssignNewDataOnSubmitSuccess = (state = {}, action) => {
    switch (action.type) {
        case PUBLIC_MOBILE_DEVICE.SUBMIT_SUCCESS:
            const data = action.data;

            const newDataPublicDevices = [
                ...state[MNG_FETCH_PUBLIC_DEVICE_STATE_KEY].data
            ];

            const newDataEmployeeDevices = [
                ...state[FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY].data
            ];

            findAndReplace(newDataPublicDevices, {id: data.id}, data);
            findAndReplace(newDataEmployeeDevices, {id: data.id}, data);

            return {
                ...state,
                [MNG_FETCH_PUBLIC_DEVICE_STATE_KEY]: {
                    ...state[MNG_FETCH_PUBLIC_DEVICE_STATE_KEY],
                    data: newDataPublicDevices
                },
                [FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY]: {
                    ...state[FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY],
                    data: newDataEmployeeDevices
                }
            };
        default:
            return {
                ...state
            }
    }
};

export const reducerMngEmployeeMobileDevices = indexReducer(
    FETCH_MNG_EMPLOYEE_MOBILE_DEVICES,
    FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY
);
