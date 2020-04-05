import initialState from './initialState';
import {
    reducerMngMobileAccessApprovalRequested,
    reducerMngMobileAccessApproved
} from './reducers/mng-mobile-access';

const reducers = [
    reducerMngMobileAccessApprovalRequested,
    reducerMngMobileAccessApproved
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
