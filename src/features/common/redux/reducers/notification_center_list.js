import indexReducer from 'react-native-core/api/paginate/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import ref from 'react-native-core/utils/ref';
import { take, select, fork, put } from 'redux-saga/effects';
import {
    GET_NOTIFICATION_CENTER_LIST,
    GET_NOTIFICATION_CENTER_LIST_STATE_KEY,
} from '../constants';
import { getNotificationCenterList, resetNotificationCenterBadge } from '../actions';
import * as Api from '../../api/notificationCenter';

export const watchGetNotificationCenterListPaginate = function*() {
    while (true) {
        const action = yield take([GET_NOTIFICATION_CENTER_LIST.REQUEST, GET_NOTIFICATION_CENTER_LIST.LOADMORE, GET_NOTIFICATION_CENTER_LIST.REFRESH]);
        const data = yield select((state) => state.common[GET_NOTIFICATION_CENTER_LIST_STATE_KEY]);
        const fromNotificationRead = ref(action.payload, 'from_notification_read');
        let showLoading = action.type === GET_NOTIFICATION_CENTER_LIST.REQUEST;

        if (fromNotificationRead) {
            showLoading = false;
        }

        yield fork(doRequest, getNotificationCenterList, {
            apiFunction: Api.getNotificationCenterList,
            args: [
                (action.type === GET_NOTIFICATION_CENTER_LIST.LOADMORE) ? data.pagination.currentPage + 1 : 1,
                action.payload
            ]
        }, {showLoading: showLoading});

        yield put(resetNotificationCenterBadge());
    }
};

export const getNotificationCenterListReducer = indexReducer(GET_NOTIFICATION_CENTER_LIST, GET_NOTIFICATION_CENTER_LIST_STATE_KEY);
