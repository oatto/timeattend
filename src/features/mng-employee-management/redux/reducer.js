import { getMngEmployeeProfileReducer, fetchTakeLeaveDataByEmployeeReducer } from '_features/mng-employee-management/redux/reducers/mng-employee-profile';
import { mngGetEmployeePushNotificationSettingReducer } from'_features/mng-employee-management/redux/reducers/mng-employee-push-notification-setting';
import { reducerMngEmInboxMessage } from'_features/mng-employee-management/redux/reducers/mng-employee-inbox-message';

import initialState from './initialState';

const reducers = [
    getMngEmployeeProfileReducer,
    fetchTakeLeaveDataByEmployeeReducer,
    mngGetEmployeePushNotificationSettingReducer,
    reducerMngEmInboxMessage
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