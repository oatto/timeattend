import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngGetMyEmployees(page, payload) {
    let criteriaEmployee = {};

    if (payload) {
        criteriaEmployee = { "criteria[keyword]": payload.employee };
    }

    return ManagerClient.get(`/employees`, {
        limit: 10,
        ...criteriaEmployee,
        page
    });
}
