import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    FETCH_MNG_TAKE_LEAVE_REQUESTED_STATE_KEY,
    FETCH_MNG_TAKE_LEAVE_APPROVED_STATE_KEY,
    FETCH_MNG_TAKE_LEAVE_REJECTED_STATE_KEY,
    TAKE_LEAVE_DATA_BY_EMPLOYEE_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(FETCH_MNG_TAKE_LEAVE_REQUESTED_STATE_KEY),
    ...makeInitialState(FETCH_MNG_TAKE_LEAVE_APPROVED_STATE_KEY),
    ...makeInitialState(FETCH_MNG_TAKE_LEAVE_REJECTED_STATE_KEY),
    [TAKE_LEAVE_DATA_BY_EMPLOYEE_STATE_KEY]: {},
    isTakeLeaveDetailLoading: false
};

export default initialState;
