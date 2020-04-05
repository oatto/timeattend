import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function getEmployeePushConfiguration(payload) {
    return ManagerClient.get(`/push-configuration/${payload.employeeId}`);
}

export function updateEmployeePushConfiguration(payload) {
    return ManagerClient.put(`/push-configuration/${payload.employeeId}`,
        {checkedNotify: payload.checkedNotify}
    );
}
