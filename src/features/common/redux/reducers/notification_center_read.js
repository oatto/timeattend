import requestReducer from 'react-native-core/api/request/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { call, takeLatest, put } from 'redux-saga/effects';
import { NOTIFICATION_CENTER_READ, NOTIFICATION_CENTER_READ_STATE_KEY, NOTIFICATION_CHECK_TIME_TYPE } from '../constants';
import { notificationCenterRead, getNotificationCenterList } from '../actions';
import * as Api from '../../api/notificationCenterRead';

export const watchNotificationCenterReadRequest = function*() {
    yield takeLatest(NOTIFICATION_CENTER_READ.REQUEST, function*({payload}) {
        // do staff
        yield call(doRequest, notificationCenterRead, {
            apiFunction: Api.notificationCenterRead,
            args: [payload]
        }, {showLoading: false});

        if (payload.type === NOTIFICATION_CHECK_TIME_TYPE) {
            yield put(getNotificationCenterList.request());
        }

        payload.from_notification_read = true;

        yield put(getNotificationCenterList.request(payload));
    });
};

export const notificationCenterReadReducer = requestReducer(NOTIFICATION_CENTER_READ, NOTIFICATION_CENTER_READ_STATE_KEY);
