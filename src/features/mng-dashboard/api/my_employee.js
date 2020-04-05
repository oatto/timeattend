import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngGetMyEmployees(page, payload) {
    const params = {
        page
    };
    if (payload && payload.employee) {
        params['criteria[keyword]'] = payload.employee;
    }

    if (payload && payload.department) {
        params['criteria[department]'] = payload.department;
    }

    return ManagerClient.get(`/employees`, params);
}

export function mngGetMyEmployeesCheckTimeTransactionsOutsideHistory(page, payload) {
    const params = {
        limit: 10,
        page
    };

    if (payload.searchValues) {
        if (payload.searchValues.employee) {
            params['criteria[keyword]'] = payload.searchValues.employee;
        }

        if (payload.searchValues.department) {
            params['criteria[department]'] = payload.searchValues.department;
        }
    }

    return ManagerClient.get(`/check-transactions/${payload.today.y}-${payload.today.m}-${payload.today.d}/outside`, params);
}
