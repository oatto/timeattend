import { put, take } from 'redux-saga/effects';
import ref from 'react-native-core/utils/ref';
import { Alert } from 'react-native';
import Trans from "_features/common/containers/Trans";
import { NOTIFICATION_OPENED, NOTIFICATION_RECEIVED } from '_features/common/redux/constants';
import { GET_MY_EMPLOYEES } from '_features/mng-dashboard/redux/constants';

export const watchGetEmployeeCheckTimeNotificationReceived = function*() {
    while (true) {
        const { payload, type } = yield take([NOTIFICATION_OPENED, NOTIFICATION_RECEIVED]);

        if (type === NOTIFICATION_OPENED) {
            yield take(GET_MY_EMPLOYEES.SUCCESS);
        }

        const topic = ref(payload.notification, 'payload.additionalData.topic');

        if (topic !== 'check_time') {
            continue;
        }

        Alert.alert(
            Trans.tran('general.notice'),
            ref(payload.notification, 'payload.body'), [
                {text: Trans.tran('general.close')}
            ]
        );
    }
};
