import initialState from './initialState';
import {
    fetchMngEmCheckTimeAdjustmentRequestedReducer,
    fetchMngEmCheckTimeAdjustmentApprovedReducer,
    fetchMngEmCheckTimeAdjustmentRejectedReducer
} from './reducers/mng-em-check-time-adjustment';

const reducers = [
    fetchMngEmCheckTimeAdjustmentRequestedReducer,
    fetchMngEmCheckTimeAdjustmentApprovedReducer,
    fetchMngEmCheckTimeAdjustmentRejectedReducer
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
