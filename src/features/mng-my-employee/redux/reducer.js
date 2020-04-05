import initialState from './initialState';
import { getCheckTimeMonthlyReducer } from './reducers/check_time_monthly';
import { mngTakeLeaveMonthlyReducer } from './reducers/take_leave_monthly';
import { mngRecompenseWorkMonthlyReducer } from './reducers/recompense_work_monthly';
import { mngGetMyEmployeesReducer } from './reducers/mng-my-employees';

const reducers = [
    getCheckTimeMonthlyReducer,
    mngTakeLeaveMonthlyReducer,
    mngRecompenseWorkMonthlyReducer,
    mngGetMyEmployeesReducer,
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
