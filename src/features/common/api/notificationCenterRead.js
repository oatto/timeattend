import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';

export function notificationCenterRead(payload) {
    return EmployeeClient.get(`/notification/${payload.id}/read`);
}
