import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import isArray from 'lodash/isArray';

export function getTakeLeaveRequest(page, state) {
    let stateType = 'equal';

    if (isArray(state)) {
        stateType = 'in';
    }

    return EmployeeClient.get('/take-leave-requests', {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": state,
        page
    });
}

export function getTakeLeaveRequestNoneRequested(page) {
    return EmployeeClient.get('/take-leave-requests', {
        limit: 10,
        "criteria[state][type]": 'not_in',
        "criteria[state][value]": STATE_REQUESTED_AND_REQUESTED_CANCEL,
        page
    });
}

export function getCompanyTakeLeaveSettings() {
    return EmployeeClient.get('/company-take-leave-settings', {});
}

export function takeLeaveAllCancelTransition(payload) {
    return EmployeeClient.put(`/take-leave-request/${payload.id}/${payload.transition}`)
}

export function createTakeLeaveRequest({formData}) {
    return EmployeeClient.post('/take-leave-request/new', formData);
}
