import { ApiManagerEndpoint as ManagerClient } from '_utils/api';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';

export function mngGetTakeLeaveRequested(page, payload) {
    let criteriaEmployee = {};
    let stateType = 'equal';
    let stateValue = 'requested';

    if (payload) {
        if (!isEmpty(payload.employee)) {
            criteriaEmployee = { "criteria[employee]": payload.employee };
        }

        if (isArray(payload.transition)) {
            stateType = 'in';
            stateValue = payload.transition
        }
    }

    return ManagerClient.get(`/take-leave-requests`, {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": stateValue,
        ...criteriaEmployee,
        page
    });
}

export function mngGetTakeLeaveApproved(page, payload) {
    let criteriaEmployee = {};

    if (payload) {
        if (!isEmpty(payload.employee)) {
            criteriaEmployee = { "criteria[employee]": payload.employee };
        }
    }

    return ManagerClient.get(`/take-leave-requests`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'approved',
        ...criteriaEmployee,
        page
    });
}

export function mngGetTakeLeaveRejected(page, payload) {
    let criteriaEmployee = {};
    let stateType = 'equal';
    let stateValue = 'rejected';

    if (payload) {
        if (!isEmpty(payload.employee)) {
            criteriaEmployee = { "criteria[employee]": payload.employee };
        }

        if (isArray(payload.transition)) {
            stateType = 'in';
            stateValue = payload.transition
        }
    }

    return ManagerClient.get(`/take-leave-requests`, {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": stateValue,
        ...criteriaEmployee,
        page
    });
}

export function mngTakeLeaveAllApproveTransition(payload) {
    return ManagerClient.post(`/take-leave-request/apply/${payload.transition}/${payload.id}`);
}

export function mngTakeLeaveAllRejectTransition({id, transition, rejectedReason}) {
    return ManagerClient.patch(`/take-leave-request/apply/${transition}/${id}`, {
        rejectedReason
    });
}
