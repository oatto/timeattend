import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import isArray from 'lodash/isArray';

export function getRecompenseWorkingByState(page, state) {
    let stateType = 'equal';

    if (isArray(state)) {
        stateType = 'in';
    }

    return EmployeeClient.get('/recompense-work-requests', {
        limit: 10,
        "criteria[state][type]": stateType,
        "criteria[state][value]": state,
        page
    });
}

export function getRecompenseWorkingNoneRequested(page) {
    return EmployeeClient.get('/recompense-work-requests', {
        limit: 10,
        "criteria[state][type]": 'not_in',
        "criteria[state][value]": STATE_REQUESTED_AND_REQUESTED_CANCEL,
        page
    });
}

export function createRecompenseWorking({formData}) {
    return EmployeeClient.post('/recompense-work-request/new', formData);
}

export function recompenseWorkingAllCancelTransition(payload) {
    return EmployeeClient.put(`/recompense-work-request/${payload.id}/${payload.transition}`);
}
