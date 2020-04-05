import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngGetMobileAccessRequested(page, payload) {
    let criteriaEmployee = {};

    if (payload) {
        criteriaEmployee = { "criteria[employee]": payload.employee };
    }

    return ManagerClient.get(`/mobile-accesses`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'requested',
        ...criteriaEmployee,
        page
    });
}

export function mngGetMobileAccessApproved(page, payload) {
    let criteriaEmployee = {};

    if (payload) {
        criteriaEmployee = { "criteria[employee]": payload.employee };
    }

    return ManagerClient.get(`/mobile-accesses`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'approved',
        ...criteriaEmployee,
        page
    });
}

export function mngGetMobileAccessRejected(page) {
    return ManagerClient.get(`/mobile-accesses`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'rejected',
        page
    });
}

export function mngApprovedMobileAccess(id) {
    return ManagerClient.post(`/mobile-access/apply/approve/${id}`);
}

export function mngRejectedMobileAccess({id, rejectedReason}) {
    return ManagerClient.patch(`/mobile-access/apply/reject/${id}`, {
        rejectedReason
    });
}

export function mngDeleteMobileAccess(id) {
    return ManagerClient.delete(`/mobile-access/${id}/delete`);
}
