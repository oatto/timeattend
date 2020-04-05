import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngGetDepartments() {
    return ManagerClient.get(`/departments`);
}
