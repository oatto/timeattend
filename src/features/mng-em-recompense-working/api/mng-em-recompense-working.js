import { ApiManagerEndpoint as ManagerClient } from '_utils/api';
import isArray from 'lodash/isArray';

export function mngEmGetRecompenseWorkingRequestedByEmployee(page, payload) {
    let stateType = 'equal';
    let stateValue = 'requested';
    let criteriaMonthly = {};

    if (isArray(payload.transition)) {
        stateType = 'in';
        stateValue = payload.transition;
    }

    if (payload.monthlyFilter) {
        criteriaMonthly = {
            "criteria[Y]": payload.monthlyFilter.year,
            "criteria[m]": payload.monthlyFilter.month,
        }
    }

    return ManagerClient.get(`/my-employee/recompense-work-requests/${payload.employeeId}`, {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": stateValue,
        ...criteriaMonthly,
        page
    });
}

export function mngEmGetRecompenseWorkingApprovedByEmployee(page, payload) {
    let criteriaMonthly = {};

    if (payload.monthlyFilter) {
        criteriaMonthly = {
            "criteria[Y]": payload.monthlyFilter.year,
            "criteria[m]": payload.monthlyFilter.month,
        }
    }

    return ManagerClient.get(`/my-employee/recompense-work-requests/${payload.employeeId}`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'approved',
        ...criteriaMonthly,
        page
    });
}

export function mngEmGetRecompenseWorkingRejectedByEmployee(page, payload) {
    let stateType = 'equal';
    let stateValue = 'requested';
    let criteriaMonthly = {};

    if (isArray(payload.transition)) {
        stateType = 'in';
        stateValue = payload.transition;
    }

    if (payload.monthlyFilter) {
        criteriaMonthly = {
            "criteria[Y]": payload.monthlyFilter.year,
            "criteria[m]": payload.monthlyFilter.month,
        }
    }

    return ManagerClient.get(`/my-employee/recompense-work-requests/${payload.employeeId}`, {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": stateValue,
        ...criteriaMonthly,
        page
    });
}

export function mngEmCreateRecompenseWorkingByEmployee({employeeId, formData}) {
    return ManagerClient.post(`/my-employee/recompense-work-request/${employeeId}/new`, formData);
}

export function mngRecompenseWorkingAllApprovalTransition({id, transition}) {
    return ManagerClient.patch(`/recompense-work/apply/${transition}/${id}`);
}

export function mngRecompenseWorkingAllRejectTransition({id, transition, rejectedReason}) {
    return ManagerClient.patch(`/recompense-work/apply/${transition}/${id}`, {
        rejectedReason
    });
}
