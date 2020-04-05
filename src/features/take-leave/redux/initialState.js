import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    TAKE_LEAVE_REQUEST_BY_REQUESTED_STATE_KEY,
    TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED_STATE_KEY,
    GET_COMPANY_TAKE_LEAVE_SETTINGS_STATE_KEY,
} from './constants';

const initialState = {
    ...makeInitialState(TAKE_LEAVE_REQUEST_BY_REQUESTED_STATE_KEY),
    ...makeInitialState(TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED_STATE_KEY),
    [GET_COMPANY_TAKE_LEAVE_SETTINGS_STATE_KEY]: [],
};

export default initialState;
