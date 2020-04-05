import requestReducer from 'react-native-core/api/request/reducer';
import { doRequest} from 'react-native-core/api/request/saga';
import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_NOTIFICATION_CENTER_BAGDE, GET_NOTIFICATION_CENTER_BAGDE_STATE_KEY, GET_NOTIFICATION_CENTER_BADGE_RESET } from '../constants';
import { getNotificationCenterBagde } from '../actions';
import * as Api from '../../api/notificationCenterBadge'

export const watchGetNotificationCenterBagdeRequest = function*() {
    yield takeLatest(GET_NOTIFICATION_CENTER_BAGDE.REQUEST, function*() {
        // do staff
        yield call(doRequest, getNotificationCenterBagde, {
            apiFunction: Api.getNotificationCenterBadge,
            args: []
        }, {showLoading: false})
    });
};

export const watchCallNotificationCenterBadge = function *() {
    yield takeLatest([GET_NOTIFICATION_CENTER_BADGE_RESET, 'RESET_USER_SUCCESS'], function*() {
      
        yield put(getNotificationCenterBagde.request());
    });
};

export const getNotificationCenterBagdeReducer = requestReducer(GET_NOTIFICATION_CENTER_BAGDE, GET_NOTIFICATION_CENTER_BAGDE_STATE_KEY);
