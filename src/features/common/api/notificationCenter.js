import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';
import { IS_MANAGER_APP } from '../../../common/constants';

export function getNotificationCenterList(page, payload) {
    let criteria = {};

    let prefix = 'employee';

    if (IS_MANAGER_APP) {
        prefix = 'manager';
    }

    let limit = { limit: 10 };

    if (payload) {
        criteria = {
            "criteria[originTopic][type]": 'equal',
            "criteria[originTopic][value]": payload.type,
        };
        limit = { limit: 100 }
    }

    return EmployeeClient.get(`/notifications/${prefix}`, {
        ...limit,
        ...criteria,
        page
    });
}
