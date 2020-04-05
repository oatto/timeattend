import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngEmployeeGetManagers(payload) {
    return ManagerClient.get(`/employee/${payload.employeeId}/managers`);
}
