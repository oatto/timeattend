import indexReducer from 'react-native-core/api/paginate/reducer';
import { doRequest } from 'react-native-core/api/request/saga';
import { take, select, fork } from 'redux-saga/effects';
import { GET_INBOX_MESSAGE, GET_INBOX_MESSAGE_STATE_KEY } from '../constants';
import { getInboxMessage } from '../actions';
import * as Api from '../../api/profile';

export const watchGetInboxMessagePaginate = function*() {
    while (true) {
        const action = yield take([GET_INBOX_MESSAGE.REQUEST, GET_INBOX_MESSAGE.LOADMORE, GET_INBOX_MESSAGE.REFRESH]);
        const data = yield select((state) => state.user[GET_INBOX_MESSAGE_STATE_KEY]);

        yield fork(doRequest, getInboxMessage, {
            apiFunction: Api.getInboxMessage,
            args: [
                (action.type === GET_INBOX_MESSAGE.LOADMORE) ? data.pagination.currentPage + 1 : 1
            ]
        }, {showLoading: action.type === GET_INBOX_MESSAGE.REQUEST})
    }
};

export const getInboxMessageReducer = indexReducer(GET_INBOX_MESSAGE, GET_INBOX_MESSAGE_STATE_KEY);
