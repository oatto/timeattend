import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';
import { IS_MANAGER_APP } from '../../../common/constants';

export function getNotificationCenterBadge() {
    let prefix = 'employee';

    if (IS_MANAGER_APP) {
        prefix = 'manager';
    }

    return EmployeeClient.get(`/notification/badge/${prefix}`);
}
