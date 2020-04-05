import { doRequest } from 'react-native-core/api/request/saga';
import { take, select, fork } from 'redux-saga/effects';
import indexReducer from 'react-native-core/api/paginate/reducer';
import { MNG_EM_GET_INBOX_MESSAGE, MNG_EM_GET_INBOX_MESSAGE_STATE_KEY } from '../constants';
import { mngEmGetInboxMessage } from '../actions';
import * as Api from '../../api/mng-push-message-to-employee';

export const watchMngEmGetInboxMessagePaginate = function*() {
    while (true) {
        const action = yield take([MNG_EM_GET_INBOX_MESSAGE.REQUEST, MNG_EM_GET_INBOX_MESSAGE.LOADMORE, MNG_EM_GET_INBOX_MESSAGE.REFRESH]);
        const data = yield select((state) => state.mngEmployeeManagement[MNG_EM_GET_INBOX_MESSAGE_STATE_KEY]);

        yield fork(doRequest, mngEmGetInboxMessage, {
            apiFunction: Api.mngEmInboxMessage,
            args: [
                action.payload,
                (action.type === MNG_EM_GET_INBOX_MESSAGE.LOADMORE) ? data.pagination.currentPage + 1 : 1,
            ]
        }, {showLoading: action.type === MNG_EM_GET_INBOX_MESSAGE.REQUEST})
    }
};

export const reducerMngEmInboxMessage = indexReducer(
    MNG_EM_GET_INBOX_MESSAGE,
    MNG_EM_GET_INBOX_MESSAGE_STATE_KEY
);
