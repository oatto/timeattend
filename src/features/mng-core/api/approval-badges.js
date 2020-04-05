import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngGetApprovalBadges() {
    return ManagerClient.get(`/approval-badges`);
}
