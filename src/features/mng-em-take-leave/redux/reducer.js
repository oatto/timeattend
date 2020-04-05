import initialState from './initialState';
import {
    reducerByRequested,
    reducerByRejected,
    reducerByApproved,
} from './reducers/mng-em-take-leave';

import {
    reducerFetchTakeLeaveTypeByEmployee,
} from './reducers/mng-em-take-leave-type';

const reducers = [
    reducerByRequested,
    reducerByRejected,
    reducerByApproved,
    reducerFetchTakeLeaveTypeByEmployee,
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
