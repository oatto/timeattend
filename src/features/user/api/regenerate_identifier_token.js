import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';

export function regenerateEmployeeIdentifierToken() {
    return EmployeeClient.put('/employee/regenerate-employee-identifier-token');
}
