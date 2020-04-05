import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED_STATE_KEY,
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED_STATE_KEY,
    MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED_STATE_KEY,
} from './constants';

const initialState = {
    ...makeInitialState(MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_APPROVED_STATE_KEY),
    ...makeInitialState(MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REJECTED_STATE_KEY),
    ...makeInitialState(MNG_EM_TAKE_LEAVE_REQUEST_BY_USER_AND_REQUESTED_STATE_KEY),
};

export default initialState;
