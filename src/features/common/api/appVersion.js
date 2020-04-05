import {
    ApiEmployeeEndpoint as EmployeeClient,
    ApiMainEndpoint as MainClient
} from '_utils/api';

export function getAppVersion() {
    return EmployeeClient.get('/app-version/manager');
}

export function getServerTime() {
    return MainClient.get('/server-time');
}
