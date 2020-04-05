import initialState from './initialState';
import { reducer as navigation } from './reducers/navigation';
import { reducer as currentLocationReducer } from './reducers/current_location';
import { getAppVersionReducer } from './reducers/app_version';
import { getNotificationCenterListReducer } from './reducers/notification_center_list';
import { getNotificationCenterBagdeReducer } from './reducers/notification_center_badge';
import { notificationCenterReadReducer } from './reducers/notification_center_read';
import { serverTimeReducer } from './reducers/server_time';

const reducers = [
    navigation,
    currentLocationReducer,
    getAppVersionReducer,
    getNotificationCenterListReducer,
    getNotificationCenterBagdeReducer,
    notificationCenterReadReducer,
    serverTimeReducer
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
