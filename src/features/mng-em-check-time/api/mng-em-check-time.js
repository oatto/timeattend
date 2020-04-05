import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function getMngEmCheckTimeHistory(payload) {
    return ManagerClient.get(`/my-employee/check-in/history/${payload.employeeId}/${payload.year}/${payload.month}`);
}

export function getMngEmCheckTimeTransactionsDaily(payload, page) {
    return ManagerClient.get(`/my-employee/check-transactions/${payload.employeeId}/${payload.year}-${payload.month}/daily`, {
        limit: 10,
        page
    });
}

export function getMngEmCheckTimeTransactionsOutside(payload, page) {
    return ManagerClient.get(`/my-employee/check-transactions/${payload.employeeId}/${payload.year}-${payload.month}/outside`, {
        limit: 10,
        page
    });
}
