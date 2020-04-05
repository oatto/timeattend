import { Alert } from 'react-native';
import { take, put } from "redux-saga/effects";
import ref from "react-native-core/utils/ref";
import { NavigationActions } from "react-navigation";
import Trans from "_features/common/containers/Trans";
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { alertChannel } from 'react-native-core/features/common/redux/sagas';
import { MNG_MOBILE_ACCESS_APPROVAL } from "_features/mng-mobile-access-approval/router";
import { NOTIFICATION_OPENED, NOTIFICATION_RECEIVED } from "_features/common/redux/constants";
import { GET_MY_EMPLOYEES } from "_features/mng-dashboard/redux/constants";

export const watchEmployeeMobileAccessNotificationReceived = function*() {
    while (true) {
        const { payload, type } = yield take([NOTIFICATION_OPENED, NOTIFICATION_RECEIVED]);

        if (type === NOTIFICATION_OPENED) {
            yield take(GET_MY_EMPLOYEES.SUCCESS);
        }

        const topic = ref(payload.notification, 'payload.additionalData.topic');
        const topicType = ref(payload.notification, 'payload.additionalData.topic_type');

        if (topic !== 'mobile_access') {
            continue;
        }

        if (topicType !== 'request') {
            continue;
        }

        const messages = ref(payload.notification, 'payload.body');

        Alert.alert( Trans.tran('general.notice'), `${messages}`, [
            {text: Trans.tran('general.detail'), onPress: () => {
                alertChannel.put(NavigationActions.navigate({routeName: MNG_MOBILE_ACCESS_APPROVAL}))
            }},
            {text: Trans.tran('general.close')},
        ]);

        yield put(resetApprovalBadge());
    }
};
