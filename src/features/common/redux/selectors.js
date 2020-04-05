import {
    GET_NOTIFICATION_CENTER_LIST_STATE_KEY,
    GET_NOTIFICATION_CENTER_BAGDE_STATE_KEY,
    SERVER_TIME_REQUEST_STATE_KEY
} from './constants';

export const getNavigation = (state) => state.common.nav;
export const getCurrentRoute = (state) => state.common.nav.currentRoute;
export const getAppVersion = (state) => state.common.appVersion;

export const isReceivingLocation = (state) => state.common.locationReceiving;
export const isReceivedLocation = (state) => state.common.locationReceived;
export const isReceiveFailedLocation = (state) => state.common.locationReceiveFailed;
export const getCurrentLocation = (state) => state.common.locationData;

export const getServerTime = (state) => state.common[SERVER_TIME_REQUEST_STATE_KEY];
export const isReceivingServerTime = (state) => state.common.serverTimeReceiving;
export const isReceivedServerTime = (state) => state.common.serverTimeReceived;

export const getNotificationCenterList = (state) => state.common[GET_NOTIFICATION_CENTER_LIST_STATE_KEY];
export const getNotificationCenterBadge = (state) => state.common[GET_NOTIFICATION_CENTER_BAGDE_STATE_KEY];

export const notificationGroupOriginIdList = (state) => {
    let grouped = {};

    getNotificationCenterList(state).data.map((data) => {
        if (!grouped[data.origin_topic]) {
            grouped[data.origin_topic] = [];
        }

        grouped[data.origin_topic].push({id: data.id, origin_id: data.origin_id});
    });

    return grouped;
};
