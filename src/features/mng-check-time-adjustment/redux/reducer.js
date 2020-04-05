import initialState from './initialState';
import {
    reducerMngCheckTimeAdjustmentRequested,
    reducerMngCheckTimeAdjustmentApproved,
    reducerMngCheckTimeAdjustmentRejected
} from './reducers/mng-check-time-adjustment';

const reducers = [
    reducerMngCheckTimeAdjustmentRequested,
    reducerMngCheckTimeAdjustmentApproved,
    reducerMngCheckTimeAdjustmentRejected
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
