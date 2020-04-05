import initialState from './initialState';
import {
    checkTimeAdjustmentReducerByRequested,
    checkTimeAdjustmentReducerIsNotRequested
} from './reducers/check-time-adjustment';

const reducers = [
    checkTimeAdjustmentReducerByRequested,
    checkTimeAdjustmentReducerIsNotRequested
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
