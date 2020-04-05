import { ApiManagerEndpoint as ManagerClient } from '_utils/api';
import isArray from 'lodash/isArray';

export function getMngTakeLeaveRequestByUserAndRequested(payload, page) {
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

    return ManagerClient.get(`/my-employee/take-leave-requests/${payload.employeeId}`, {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": stateValue,
        ...criteriaMonthly,
        page
    });
}

export function getMngTakeLeaveRequestByUserAndRejected(payload, page) {
    let stateType = 'equal';
    let stateValue = 'rejected';
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

    return ManagerClient.get(`/my-employee/take-leave-requests/${payload.employeeId}`, {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": stateValue,
        ...criteriaMonthly,
        page
    });
}

export function getMngTakeLeaveRequestByUserAndApproved(payload, page) {
    let criteriaMonthly = {};

    if (payload.monthlyFilter) {
        criteriaMonthly = {
            "criteria[Y]": payload.monthlyFilter.year,
            "criteria[m]": payload.monthlyFilter.month,
        }
    }

    return ManagerClient.get(`/my-employee/take-leave-requests/${payload.employeeId}`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'approved',
        ...criteriaMonthly,
        page
    });
}

export function getMngTakeLeaveDataByEmployee(id) {
    return ManagerClient.get(`/employee/${id}/take-leaves`)
}

export function mngEmCreateTakeLeaveByEmployee({employeeId, formData}) {
    return ManagerClient.post(`/my-employee/take-leave-request/${employeeId}/new`, formData);
}

export function mngEmTakeLeaveAllApprovTransition({id, transition}) {
    return ManagerClient.post(`/take-leave-request/apply/${transition}/${id}`);
}

export function mngEmTakeLeaveAllRejectTransition({id, transition, rejectedReason}) {
    return ManagerClient.patch(`/take-leave-request/apply/${transition}/${id}`, {
        rejectedReason
    });
}
