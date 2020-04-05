import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngGetCheckTimeMonthly(page, {year, month}) {
    return ManagerClient.get(`/check-in/monthly/${year}-${month}`, {
        limit: 10,
        page
    });
}

export function mngGetTakeLeaveMonthly({year, month}) {
    return ManagerClient.get(`/take-leave-requests/monthly/${year}-${month}`);
}

export function mngGetRecompenseWorkMonthly({year, month}) {
    return ManagerClient.get(`/recompense-work-requests/monthly/${year}-${month}`);
}
