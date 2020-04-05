import { ApiManagerEndpoint as ManagerClient } from '_utils/api';
import isArray from 'lodash/isArray';

export function mngGetCheckTimeAdjustmentRequested(page, payload) {
    let criteriaEmployee = {};

    if (payload) {
        criteriaEmployee = { "criteria[employee]": payload.employee };
    }

    return ManagerClient.get(`/time-adjustments`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'requested',
        ...criteriaEmployee,
        page
    });
}

export function mngGetCheckTimeAdjustmentApproved(page, payload) {
    let criteriaEmployee = {};

    if (payload) {
        criteriaEmployee = { "criteria[employee]": payload.employee };
    }

    return ManagerClient.get(`/time-adjustments`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'approved',
        ...criteriaEmployee,
        page
    });
}

export function mngGetCheckTimeAdjustmentRejected(page, payload) {
    let criteriaEmployee = {};
    let stateType = 'equal';
    let stateValue = 'rejected';

    if (payload) {
        criteriaEmployee = { "criteria[employee]": payload.employee };

        if (isArray(payload.transition)) {
            stateType = 'in';
            stateValue = payload.transition
        }
    }

    return ManagerClient.get(`/time-adjustments`, {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": stateValue,
        ...criteriaEmployee,
        page
    });
}

export function mngApproveCheckTimeAdjustment({id}) {
    return ManagerClient.patch(`/time-adjustment/apply/approve/${id}`);
}

export function mngRejectCheckTimeAdjustment({id, rejectedReason}) {
    return ManagerClient.patch(`/time-adjustment/apply/reject/${id}`, {
        rejectedReason
    });
}

export function mngCreateCheckTimeAdjustmentWithEmployees({formData}) {
    return ManagerClient.post(`/time-adjustment/bulk-create`, formData);
}
