import initialState from './initialState';
import {
    reducerMngRecompenseWorksRequested,
    reducerMngRecompenseWorksApproved,
    reducerMngRecompenseWorksRejected
} from './reducers/mng-recompense-working';

const reducers = [
    reducerMngRecompenseWorksRequested,
    reducerMngRecompenseWorksApproved,
    reducerMngRecompenseWorksRejected
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
