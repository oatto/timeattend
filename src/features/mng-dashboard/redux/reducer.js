import initialState from './initialState';
import { getMyEmployeesReducer } from './reducers/my_employee';
import { getMyEmployeeCheckTimeOutsideReducer } from './reducers/my_employee_check_time_outside';

const reducers = [
    getMyEmployeesReducer,
    getMyEmployeeCheckTimeOutsideReducer,
];

export default function reducer(state = initialState, action = {}) {
    let newState;
    switch (action.type) {
        // Handle cross-topic actions here
        default:
            newState = state;
            break;
    }
    /* istanbul ignore next */
    return reducers.reduce((s, r) => r(s, action), newState);
}
