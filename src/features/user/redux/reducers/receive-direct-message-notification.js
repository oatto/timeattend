import { fork, take, put } from "redux-saga/effects";
import ref from "react-native-core/utils/ref";
import { NOTIFICATION_OPENED, NOTIFICATION_RECEIVED } from "_features/common/redux/constants";
import { doRequest } from "react-native-core/api/request/saga";
import { GET_CHECK_TIME_LATEST } from "_features/check-time/redux/constants";
import { directMessageReceived, getInboxMessage } from '../actions';
import { DIRECT_MESSAGE_RECEIVED, DIRECT_MESSAGE_CLOSE_REQUEST, DIRECT_MESSAGE_RECEIVED_STATE_KEY } from "../constants";
import * as Api from "../../api/profile";

export const watchManagerSentDirectMessage = function*() {
    while (true) {
        const action = yield take([NOTIFICATION_OPENED, NOTIFICATION_RECEIVED]);

        if (action.type === NOTIFICATION_OPENED) {
            yield take(GET_CHECK_TIME_LATEST.SUCCESS);
        }

        const { notification } = action.payload;
        const topic = ref(notification, 'payload.additionalData.topic');

        if (topic === 'direct_message') {
            yield put(directMessageReceived(notification));

            yield fork(doRequest, getInboxMessage, {
                apiFunction: Api.getInboxMessage,
                args: [1]
            }, {showLoading: false})
        }
    }
};

export function directMessageReducer(state, action) {
    switch (action.type) {
        case DIRECT_MESSAGE_RECEIVED:
            return {
                ...state,
                [DIRECT_MESSAGE_RECEIVED_STATE_KEY]: {
                    isVisible: true,
                    notification: action.payload,
                },
            };
        case DIRECT_MESSAGE_CLOSE_REQUEST:
            return {
                ...state,
                [DIRECT_MESSAGE_RECEIVED_STATE_KEY]: {
                    isVisible: false,
                    notification: {},
                },
            };
        default:
            return state;
    }
}
