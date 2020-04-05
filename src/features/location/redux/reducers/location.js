import { NavigationActions } from 'react-navigation';
import isUndefined from 'lodash/isUndefined';
import { change } from 'redux-form'
import { alertChannel } from 'react-native-core/features/common/redux/sagas';
import ref from 'react-native-core/utils/ref';
import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import { doSubmit } from 'react-native-core/api/submit/saga';
import indexReducer from 'react-native-core/api/paginate/reducer';
import { NAME as checkTimeAdjustmentCreateForm } from '_features/check-time-adjustment/forms/CheckTimeAdjustmentCreateForm';
import {
    GET_ALL_LOCATION,
    GET_ALL_LOCATION_WITH_COORDINATE,
    GET_ALL_LOCATION_WITHOUT_COORDINATE,
    CREATE_LOCATION,
    ALL_LOCATION_STATE_KEY,
    ALL_LOCATION_WITH_COORDINATE_STATE_KEY,
    ALL_LOCATION_WITHOUT_COORDINATE_STATE_KEY,
} from '../constants';
import {
    getAllLocation,
    getAllLocationWithCoordinate,
    getAllLocationWithoutCoordinate,
    createLocation
} from '../actions'
import * as Api from '../../api/location';
navigator.geolocation = require('@react-native-community/geolocation');

export const watchAllLocationRequest = function*() {
    yield takeLatest(GET_ALL_LOCATION.REQUEST, function*({payload}) {
        yield fork(doRequest, getAllLocation, Api.getAllLocationWithoutPaginate);
    });
};

export const watchAllLocationWithoutCoordinateRequest = function*() {
    while (true) {
        const action = yield take([
            GET_ALL_LOCATION_WITHOUT_COORDINATE.REQUEST,
            GET_ALL_LOCATION_WITHOUT_COORDINATE.LOADMORE,
            GET_ALL_LOCATION_WITHOUT_COORDINATE.REFRESH
        ]);

        const data = yield select((state) => state.location[ALL_LOCATION_WITHOUT_COORDINATE_STATE_KEY]);
        const hasSearchName = ref(action.payload, 'name');
        const hasSearchType = ref(action.payload, 'type');

        if (!isUndefined(hasSearchName) || !isUndefined(hasSearchType)) {
            yield fork(doRequest, getAllLocationWithoutCoordinate, {
                apiFunction: Api.searchLocation,
                args: [
                    (action.type === GET_ALL_LOCATION_WITHOUT_COORDINATE.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                    action.payload.name,
                    action.payload.type,
                ]
            }, {showLoading: action.type === GET_ALL_LOCATION_WITHOUT_COORDINATE.REQUEST})
        } else {
            yield fork(doRequest, getAllLocationWithoutCoordinate, {
                apiFunction: Api.getAllLocations,
                args: [
                    (action.type === GET_ALL_LOCATION_WITHOUT_COORDINATE.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                ]
            }, {showLoading: action.type === GET_ALL_LOCATION_WITHOUT_COORDINATE.REQUEST})
        }
    }
};

export const watchAllLocationWithCoordinateRequest = function*() {
    while (true) {
        const action = yield take([
            GET_ALL_LOCATION_WITH_COORDINATE.REQUEST,
            GET_ALL_LOCATION_WITH_COORDINATE.LOADMORE,
            GET_ALL_LOCATION_WITH_COORDINATE.REFRESH
        ]);
        const data = yield select((state) => state.location[ALL_LOCATION_WITH_COORDINATE_STATE_KEY]);

        let showLoading = action.type === GET_ALL_LOCATION_WITH_COORDINATE.REQUEST;

        if (false === action.payload._withLoadingOverlay) {
            showLoading = false;
        }

        yield fork(doRequest, getAllLocationWithCoordinate, {
            apiFunction: Api.getAllLocations,
            args: [
                (action.type === GET_ALL_LOCATION_WITH_COORDINATE.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload.latitude,
                action.payload.longitude,
                action.payload.type
            ]
        }, {showLoading: showLoading})
    }
};

export const watchCreateLocation = function*() {
    while (true) {
        const action = yield take(CREATE_LOCATION.SUBMIT);

        yield fork(doSubmit, createLocation, {
            apiFunction: Api.createLocation,
            args: [action.payload]
        })
    }
};

export const watchCreateLocationSuccess = function*() {
    while (true) {
        const action = yield take(CREATE_LOCATION.SUBMIT_SUCCESS);

        yield put(change(checkTimeAdjustmentCreateForm, 'checkInPlace', action.data.id));

        yield call(navigator.geolocation.getCurrentPosition, (position) => {
            alertChannel.put({type: '_LOCATION_RECEIVED', payload: {position}});
        });

        const { payload } = yield take('_LOCATION_RECEIVED');
        const data = yield select((state) => state.location[ALL_LOCATION_WITH_COORDINATE_STATE_KEY]);

        yield call(doRequest, getAllLocationWithCoordinate, {
            apiFunction: Api.getAllLocations,
            args: [
                (action.type === GET_ALL_LOCATION_WITH_COORDINATE.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                payload.position.coords.latitude,
                payload.position.coords.longitude,
                'place'
            ]
        }, {showLoading: action.type === GET_ALL_LOCATION_WITH_COORDINATE.REQUEST});

        yield call(doRequest, getAllLocation, Api.getAllLocationWithoutPaginate);

        yield put(NavigationActions.back());
    }
};

export const locationWithCoordinateReducer = indexReducer(GET_ALL_LOCATION_WITH_COORDINATE, ALL_LOCATION_WITH_COORDINATE_STATE_KEY);
export const locationWithoutCoordinateReducer = indexReducer(GET_ALL_LOCATION_WITHOUT_COORDINATE, ALL_LOCATION_WITHOUT_COORDINATE_STATE_KEY);
export const allLocationReducer = indexReducer(GET_ALL_LOCATION, ALL_LOCATION_STATE_KEY);
