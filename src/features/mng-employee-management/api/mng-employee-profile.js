import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function getMngEmployeeProfile(payload) {
    return ManagerClient.get(`/employee/${payload.employeeId}`);
}

export function getMngEmployeeTakeLeaveData(payload) {
    return ManagerClient.get(`/employee/${payload.employeeId}/take-leaves`);
}
