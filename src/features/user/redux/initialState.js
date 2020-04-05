import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    USER_PROFILE_STATE_KEY,
    GET_MANAGERS_STATE_KEY,
    COMPANY_HOLIDAY_STATE_KEY,
    DIRECT_MESSAGE_RECEIVED_STATE_KEY,
    GET_INBOX_MESSAGE_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(GET_INBOX_MESSAGE_STATE_KEY),
    [USER_PROFILE_STATE_KEY]: {},
    [GET_MANAGERS_STATE_KEY]: [],
    [COMPANY_HOLIDAY_STATE_KEY]: [],
    [DIRECT_MESSAGE_RECEIVED_STATE_KEY]: {
        isVisible: false,
        notification: {},
    }
};

export default initialState;

