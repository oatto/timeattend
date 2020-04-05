import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import { GET_MY_EMPLOYEES_STATE_KEY, GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE_STATE_KEY } from './constants';

const initialState = {
    ...makeInitialState(GET_MY_EMPLOYEES_STATE_KEY),
    ...makeInitialState(GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE_STATE_KEY),
};

export default initialState;
