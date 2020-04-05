import { ApiManagerEndpoint as ManagerClient } from '_utils/api';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';

export function mngGetRecompenseWorksRequested(page, payload) {
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

    return ManagerClient.get(`/recompense-works`, {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": stateValue,
        ...criteriaEmployee,
        page
    });
}

export function mngGetRecompenseWorksApproved(page, payload) {
    let criteriaEmployee = {};

    if (payload) {
        if (!isEmpty(payload.employee)) {
            criteriaEmployee = { "criteria[employee]": payload.employee };
        }
    }

    return ManagerClient.get(`/recompense-works`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'approved',
        ...criteriaEmployee,
        page
    });
}

export function mngGetRecompenseWorksRejected(page, payload) {
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

    return ManagerClient.get(`/recompense-works`, {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": stateValue,
        ...criteriaEmployee,
        page
    });
}

export function mngRecompenseWorkingAllApprovalTransition(payload) {
    return ManagerClient.patch(`/recompense-work/apply/${payload.transition}/${payload.id}`);
}

export function mngRecompenseWorkingAllRejectTransition({id, transition, rejectedReason}) {
    return ManagerClient.patch(`/recompense-work/apply/${transition}/${id}`, {
        rejectedReason
    });
}

export function mngCreateRecompenseWorkWithEmployees({formData}) {
    return ManagerClient.post(`/recompense-work/bulk-create`, formData);
}
