import { ApiManagerEndpoint as ManagerClient } from '_utils/api';

export function mngGetEmployeeMobileDevices(page) {
    return ManagerClient.get(`/mobile-devices`, {
        limit: 10,
        page
    });
}

export function mngGetPublicMobileDevices(page) {
    return ManagerClient.get(`/mobile-devices`, {
        'criteria[publicDevice]': 'true',
        limit: 10,
        page
    });
}

export function mngMobileDeviceUpdatePermission({id, name, publicDevice}) {
    return ManagerClient.patch(`/mobile-device/update/permission/${id}`, {
        name,
        publicDevice
    });
}
