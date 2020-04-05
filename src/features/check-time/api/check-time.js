import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';

export function getCheckTimeHistory(year, month) {
    return EmployeeClient.get(`/check-in/history/${year}/${month}`);
}

export function getCheckTimeTransactionsDailyHistory(page, payload) {
    return EmployeeClient.get(`/check-transactions/${payload.year}-${payload.month}/daily`, {
        limit: 10,
        page
    });
}

export function getCheckTimeTransactionsOutsideHistory(page, payload) {
    return EmployeeClient.get(`/check-transactions/${payload.year}-${payload.month}/outside`, {
        limit: 10,
        page
    });
}

export function getCheckTimeLatest() {
    return EmployeeClient.get('/check-in/today');
}

export function getCheckTimeTodayList() {
    return EmployeeClient.get('/check-transaction/today/daily');
}

export function checkIn({formData}) {
    return EmployeeClient.post('/check/check-in', formData);
}

export function checkOut({formData}) {
    return EmployeeClient.post('/check/check-out', formData);
}
