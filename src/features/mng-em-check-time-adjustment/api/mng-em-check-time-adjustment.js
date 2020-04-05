import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngEmGetCheckTimeAdjustmentRequestedByEmployee(page, payload) {
    let criteriaMonthly = {};

    if (payload.monthlyFilter) {
        criteriaMonthly = {
            "criteria[Y]": payload.monthlyFilter.year,
            "criteria[m]": payload.monthlyFilter.month,
        }
    }

    return ManagerClient.get(`/my-employee/time-adjustments/${payload.employeeId}`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'requested',
        ...criteriaMonthly,
        page
    });
}

export function mngEmGetCheckTimeAdjustmentApprovedByEmployee(page, payload) {
    let criteriaMonthly = {};

    if (payload.monthlyFilter) {
        criteriaMonthly = {
            "criteria[Y]": payload.monthlyFilter.year,
            "criteria[m]": payload.monthlyFilter.month,
        }
    }

    return ManagerClient.get(`/my-employee/time-adjustments/${payload.employeeId}`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'approved',
        ...criteriaMonthly,
        page
    });
}

export function mngEmGetCheckTimeAdjustmentRejectedByEmployee(page, payload) {
    let criteriaMonthly = {};

    if (payload.monthlyFilter) {
        criteriaMonthly = {
            "criteria[Y]": payload.monthlyFilter.year,
            "criteria[m]": payload.monthlyFilter.month,
        }
    }

    return ManagerClient.get(`/my-employee/time-adjustments/${payload.employeeId}`, {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": 'rejected',
        ...criteriaMonthly,
        page
    });
}

export function mngEmCreateCheckTimeAdjustmentByEmployee({employeeId, formData}) {
    return ManagerClient.post(`/my-employee/time-adjustment/${employeeId}/new`, formData);
}

export function mngEmCheckTimeAdjustmentApproved({id}) {
    return ManagerClient.patch(`/time-adjustment/apply/approve/${id}`);
}

export function mngEmCheckTimeAdjustmentRejected({id, rejectedReason}) {
    return ManagerClient.patch(`/time-adjustment/apply/reject/${id}`, {
        rejectedReason
    });
}
