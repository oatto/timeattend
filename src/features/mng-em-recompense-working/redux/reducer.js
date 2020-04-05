import initialState from './initialState';
import {
    fetchMngEmRecompenseWorkingApprovedReducer,
    fetchMngEmRecompenseWorkingRequestedReducer,
    fetchMngEmRecompenseWorkingRejectedReducer
} from './reducers/mng-em-recompense-working';

const reducers = [
    fetchMngEmRecompenseWorkingRequestedReducer,
    fetchMngEmRecompenseWorkingApprovedReducer,
    fetchMngEmRecompenseWorkingRejectedReducer,
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
