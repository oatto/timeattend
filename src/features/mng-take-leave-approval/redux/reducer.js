import initialState from './initialState';
import {
    reducerMngTakeLeaveDetail,
} from './reducers/mng-take-leave-detail';
import {
    reducerFetchTakeLeaveDataByEmployee,
} from './reducers/employee-take-leave-data';

import {
    reducerMngTakeLeaveRequested,
    reducerMngTakeLeaveApproved,
    reducerMngTakeLeaveRejected
} from './reducers/mng-take-leave';

const reducers = [
    reducerMngTakeLeaveRequested,
    reducerMngTakeLeaveApproved,
    reducerMngTakeLeaveRejected,
    reducerMngTakeLeaveDetail,
    reducerFetchTakeLeaveDataByEmployee
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
