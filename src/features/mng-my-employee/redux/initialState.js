import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    GET_CHECK_TIME_MONTHLY_STATE_KEY,
    MNG_TAKE_LEAVE_MONTHLY_STATE_KEY,
    MNG_RECOMPENSE_WORK_MONTHLY_STATE_KEY,
    MNG_GET_MY_EMPLOYEES_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(GET_CHECK_TIME_MONTHLY_STATE_KEY),
    [MNG_TAKE_LEAVE_MONTHLY_STATE_KEY]: [],
    [MNG_RECOMPENSE_WORK_MONTHLY_STATE_KEY]: [],
    ...makeInitialState(MNG_GET_MY_EMPLOYEES_STATE_KEY),
};

export default initialState;
