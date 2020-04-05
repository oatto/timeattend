import initialState from './initialState';
import {
    reducerByRequested,
    reducerByNoneRequested
} from './reducers/take-leave';
import { getCompanyTakeLeaveSettingsReducer } from './reducers/company_take_leave_setting';

const reducers = [
    reducerByRequested,
    reducerByNoneRequested,
    getCompanyTakeLeaveSettingsReducer
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
