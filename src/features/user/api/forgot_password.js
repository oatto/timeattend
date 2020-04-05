import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';

export function forgotPassword(email) {
    return EmployeeClient.post(`/forgot-password`, email)
}
