import { call, takeLatest } from 'redux-saga/effects';
import { alertChannel } from 'react-native-core/features/common/redux/sagas';
import { GET_CURRENT_LOCATION } from '../constants';
import { getCurrentLocation } from '../actions';
navigator.geolocation = require('@react-native-community/geolocation');

export const watchGetCurrentLocation = function*() {
    let watchId;
    yield takeLatest(GET_CURRENT_LOCATION.REQUEST, function*({payload}) {
        navigator.geolocation.setRNConfiguration({
          authorizationLevel: 'whenInUse'
        })

        const onSuccess = (position) => {
            alertChannel.put(getCurrentLocation._success_(position));
        };
        const onFailed = (err) => {
            alertChannel.put(getCurrentLocation._failure_(err, {
                disabledDisplayGlobalError: true
            }));
        };

        if ('watch' === payload.mode) {
            watchId = yield call(navigator.geolocation.watchPosition, onSuccess, onFailed, { maximumAge: 10000, timeout: 10000, distanceFilter: 10, enableHighAccuracy: true });

            return;
        }

        watchId = yield call(navigator.geolocation.getCurrentPosition, onSuccess, onFailed, { maximumAge: 10000, timeout: 10000 });
    });

    yield takeLatest(GET_CURRENT_LOCATION.DISMISS, function*() {
        watchId = yield call(navigator.geolocation.clearWatch, watchId);
    });
};

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CURRENT_LOCATION.REQUEST:
            return {
                ...state,
                locationReceiving: true,
                locationReceived: false,
                locationReceiveFailed: false,
            };
        case GET_CURRENT_LOCATION.SUCCESS:
            return {
                ...state,
                locationReceiving: false,
                locationReceived: true,
                locationReceiveFailed: false,
                locationData: action.data
            };
        case GET_CURRENT_LOCATION.FAILURE:
            return {
                ...state,
                locationReceiving: false,
                locationReceived: false,
                locationReceiveFailed: true,
            };
        default:
            return {
                ...state,
            }
    }
};
