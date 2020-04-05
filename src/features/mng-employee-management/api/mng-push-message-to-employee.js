import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngPushMessageToEmployee({employeeId, message}) {
    return ManagerClient.post(`/push-message-to-employee/${employeeId}`, {
        message
    });
}

export function mngEmInboxMessage(payload, page) {
    let criteriaMonthly = {};

    if (payload.monthlyFilter) {
        criteriaMonthly = {
            "criteria[Y]": payload.monthlyFilter.year,
            "criteria[m]": payload.monthlyFilter.month,
        }
    }

    return ManagerClient.get(`/my-employee/inbox-message/${payload.employeeId}`, {
        limit: 10,
        ...criteriaMonthly,
        page
    });
}
