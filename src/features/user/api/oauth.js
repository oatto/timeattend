import {
    ApiMainEndpoint as Client,
    ApiEmployeeEndpoint as EmployeeClient
} from '_utils/api';

import {
    API_CLIENT_ID,
    API_CLIENT_SECRET,
    ANON_USERNAME,
    ANON_PASSWORD
} from '../../../common/constants';

export function anonAuthen() {
    return Client.get('/oauth/v2/token', {
        client_id: API_CLIENT_ID,
        client_secret: API_CLIENT_SECRET,
        grant_type: 'password',
        username: ANON_USERNAME,
        password: ANON_PASSWORD,
    });
}

export function login({username, password}) {
    return Client.get('/oauth/v2/token', {
        client_id: API_CLIENT_ID,
        client_secret: API_CLIENT_SECRET,
        grant_type: 'password',
        username,
        password
    });
}

export function loginWithQr(identifierToken) {
    return Client.get('/oauth/v2/token', {
        client_id: API_CLIENT_ID,
        client_secret: API_CLIENT_SECRET,
        grant_type: 'urn:tmm_qr',
        identifierToken,
    });
}

export function logout({access_token, refresh_token, player_id}) {
    return Client.post(`/employee/logout`, {
        access_token,
        refresh_token,
        player_id
    });
}

export function refreshToken(refresh_token) {
    return Client.get('/oauth/v2/token', {
        client_id: API_CLIENT_ID,
        client_secret: API_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token
    });
}

export function sendPushRegisterToken(token, platform, isRevoke) {
    return EmployeeClient.post('/register-token', {
        token,
        platform,
        isRevoke
    });
}

export function deletePushRegisterToken(token) {
    return EmployeeClient.delete(`/employee-device-token/${token}/delete`);
}

export function getMobileAccessCheck(deviceId) {
    return EmployeeClient.get(`/mobile-access/check/${deviceId}`)
}

export function requestMobileAccess(deviceIdentifier, model, platform, playerId, application) {
    return EmployeeClient.post(`/mobile-access/new/${deviceIdentifier}/${model}/${platform}/${application}`, {
        playerId // for bc
    })
}

export function getUserProfile() {
    return EmployeeClient.get('/employee/show');
}
