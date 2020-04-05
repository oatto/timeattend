import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';

export function getCheckTimeOutsideLatestTodayList() {
    return EmployeeClient.get('/check-transaction/today/outside');
}

export function getCheckTimeOutSideTodayList(Y, m, d) {
    return EmployeeClient.get(`/check-transactions/${Y}-${m}-${d}/outside`);
}

export function checkInOutside({formData}) {
    return EmployeeClient.post('/check/check-in/outside', formData);
}

export function checkOutOutside({formData}) {
    return EmployeeClient.post('/check/check-out/outside', formData);
}
