import ThemeVariables from '_theme';
import { Vibration, Alert } from 'react-native';
import { take } from 'redux-saga/effects';
import ref from 'react-native-core/utils/ref';
import { alertChannel } from 'react-native-core/features/common/redux/sagas';
import OneSignal from 'react-native-onesignal'
import { setPushPlayerId } from '_features/user/redux/actions';
import Trans from '_features/common/containers/Trans';
import { notificationOpened, notificationReceived, resetNotificationCenterBadge } from '../actions';
import {
    FIREBASE_PROJECT_NUMBER_EMPLOYEE,
    FIREBASE_PROJECT_NUMBER_MANAGER,
    IS_MANAGER_APP,
    ONE_SIGNAL_EMPLOYEE,
    ONE_SIGNAL_MANAGER
} from '../../../../common/constants';

export const watchAppReady = function*() {
    yield take('APP_INIT');

    const ONE_SIGNAL_ID = IS_MANAGER_APP
        ? ONE_SIGNAL_MANAGER
        : ONE_SIGNAL_EMPLOYEE;

    const ONE_SIGNAL_PROJECT_NUMBER = IS_MANAGER_APP
        ? FIREBASE_PROJECT_NUMBER_MANAGER
        : FIREBASE_PROJECT_NUMBER_EMPLOYEE;

    OneSignal.init(ONE_SIGNAL_ID, { kOSSettingsKeyAutoPrompt : true });

    OneSignal.configure(); //will trigger ids event to fire.
    OneSignal.inFocusDisplaying(0);

    if (ThemeVariables.platform === 'android') {
        OneSignal.enableVibrate(true);
        OneSignal.enableSound(true);
    }

    OneSignal.addEventListener('ids', function(device) {
        alertChannel.put(setPushPlayerId(device.userId));
    });

    OneSignal.addEventListener('received', function(notification) {
        const duration = 1000;
        Vibration.vibrate(duration);

        if (ThemeVariables.platform === 'android') {
            if (notification.payload.fromProjectNumber !== ONE_SIGNAL_PROJECT_NUMBER) {
                return;
            }
        }

        if (ref(notification, 'payload.additionalData.topic') || ref(notification, 'payload.additionalData.from')) {
            alertChannel.put(resetNotificationCenterBadge());
            alertChannel.put(notificationReceived({notification}))
        } else {
            alertChannel.put(resetNotificationCenterBadge());
            Alert.alert("Alert", notification.payload.body, [
                {
                    text: Trans.tran('general.accept'),
                    onPress: () => alertChannel.put(notificationReceived({notification}))
                }
            ]);
        }
    });

    yield take('RESET_USER_SUCCESS');

    OneSignal.addEventListener('opened', function(openResult) {
        alertChannel.put(notificationOpened(openResult));
    });
};
