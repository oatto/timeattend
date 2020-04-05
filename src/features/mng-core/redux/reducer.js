import initialState from './initialState';
import { reducerMngEmployeeMobileDevices, mngFetchPublicDeviceReducer, mngAssignNewDataOnSubmitSuccess } from './reducers/mng-mobile-devices';
import { approvalBadgeReducer } from './reducers/approval_badge';
import { getDepartmentsReducer } from './reducers/department';
import { mngEmployeeGetManagers } from './reducers/mng-employee-get-managers';

const reducers = [
    reducerMngEmployeeMobileDevices,
    approvalBadgeReducer,
    getDepartmentsReducer,
    mngAssignNewDataOnSubmitSuccess,
    mngFetchPublicDeviceReducer,
    mngEmployeeGetManagers
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
