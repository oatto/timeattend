import initialState from './initialState';
import {
    checkTimeReducer,
    reducerCheckTimeTransactionsDaily,
    reducerCheckTimeTransactionsOutside
} from './reducers/check_time';

const reducers = [
    checkTimeReducer,
    reducerCheckTimeTransactionsDaily,
    reducerCheckTimeTransactionsOutside
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
