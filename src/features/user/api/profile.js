import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';

export function getEmployeeTakeLeaves() {
    return EmployeeClient.get('/employee/take-leaves');
}

export function getManagers() {
    return EmployeeClient.get('/employee/managers');
}

export function getHolidayByYear(year) {
    return EmployeeClient.get(`/holidays/${year}`, {
        limit: 300,
    });
}

export function setPrivateKey(form) {
    return EmployeeClient.put(`/employee/set-password`, form)
}

export function checkedPrivateKey(currentPassword) {
    return EmployeeClient.post(`/employee/check-password`, currentPassword)
}

export function removePrivateKey() {
    return EmployeeClient.put(`/employee/remove-password`)
}

export function getInboxMessage() {
    return EmployeeClient.get(`/employee/inbox-message`)
}
