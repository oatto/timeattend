import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';

export function getCheckTimeAdjustmentByState(page, state) {
    return EmployeeClient.get('/time-adjustments', {
        limit: 10,
        "criteria[state][type]": 'equal',
        "criteria[state][value]": state,
        page
    });
}

export function getCheckTimeAdjustmentIsNotRequested(page) {
    return EmployeeClient.get('/time-adjustments', {
        limit: 10,
        "criteria[state][type]": 'not_equal',
        "criteria[state][value]": 'requested',
        page
    });
}

export function createCheckTimeAdjustment({formData}) {
    return EmployeeClient.post('/time-adjustment/new', formData);
}

export function rejectedCheckTimeAdjustment(id) {
    return EmployeeClient.put(`/time-adjustment/${id}/cancel`);
}
