import { Alert } from 'react-native';
import { take, put } from "redux-saga/effects";
import ref from "react-native-core/utils/ref";
import { NavigationActions } from "react-navigation";
import { alertChannel } from 'react-native-core/features/common/redux/sagas';
import Trans from "_features/common/containers/Trans";
import { MNG_TAKE_LEAVE_APPROVAL } from "_features/mng-take-leave-approval/router";
import { NOTIFICATION_OPENED, NOTIFICATION_RECEIVED } from "_features/common/redux/constants";
import { resetApprovalBadge } from "_features/mng-core/redux/actions";
import { GET_MY_EMPLOYEES } from "_features/mng-dashboard/redux/constants";

export const watchEmployeeTakeLeaveNotificationReceived = function*() {
    while (true) {
        const action = yield take([NOTIFICATION_OPENED, NOTIFICATION_RECEIVED]);

        if (action.type === NOTIFICATION_OPENED) {
            yield take(GET_MY_EMPLOYEES.SUCCESS);
        }

        const { notification } = action.payload;
        const topic = ref(notification, 'payload.additionalData.topic');
        const topicType = ref(notification, 'payload.additionalData.topic_type');

        if (topic !== 'take_leave_request') {
            continue;
        }

        let tabIndexInit = 0;

        if (topicType === 'request' || topicType === 'request_cancel') {
            tabIndexInit = 0
        } else if (topicType === 'cancel') {
            tabIndexInit = 2
        }

        const actionNavigate = NavigationActions.navigate({
            routeName: MNG_TAKE_LEAVE_APPROVAL,
            params: {
                tabIndexInit: tabIndexInit
            }
        });

        if (topicType === 'request' || topicType === 'cancel' || topicType === 'request_cancel') {
            const messages = ref(notification, 'payload.body');

            Alert.alert( Trans.tran('general.notice'), `${messages}`, [
                { text: Trans.tran('general.alert.later') },
                {
                    text: Trans.tran('general.alert.approve'),
                    onPress: () => alertChannel.put(actionNavigate)
                }
            ]);

            yield put(resetApprovalBadge());
        }
    }
};
