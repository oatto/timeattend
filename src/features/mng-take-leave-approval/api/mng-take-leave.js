import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngGetEmployeeTakeLeaveData(employeeId) {
    return ManagerClient.get(`/employee/${employeeId}/take-leaves`);
}
