import {
    ApiEmployeeEndpoint as EmployeeClient,
    ApiMainEndpoint as MainClient
} from '_utils/api';
import { APP_VERSION } from '../../../common/constants';

export function getAppVersion() {
    return EmployeeClient.get('/app-version', {
        version: APP_VERSION
    });
}

export function getServerTime() {
    return MainClient.get('/server-time');
}
