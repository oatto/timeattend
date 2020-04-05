import { ApiEmployeeEndpoint as EmployeeClient } from '_utils/api';

export function getAllLocationWithoutPaginate() {
    return EmployeeClient.get('/check-in-places', {
        limit: 200,
    });
}

export function getLocationWithToken(token) {
    return EmployeeClient.get(`/check-in-place/token/${token}`);
}

export function getAllLocations(page, latitude, longitude, type = "") {
    let criteriaParams = {};
    if (type) {
        criteriaParams = {
            'criteria[type][value]': type,
            'criteria[type][type]': 'equal',
        }
    }
    if (!latitude && !longitude) {
        const params = {
            limit: 10,
            page,
            ...criteriaParams
        };

        return EmployeeClient.get('/check-in-places', params);
    }

    return EmployeeClient.get('/check-in-places', {
        limit: 10,
        page,
        latitude,
        longitude,
        ...criteriaParams
    });
}

export function searchLocation(page, name, type) {
    return EmployeeClient.get('/check-in-places', {
        limit: 10,
        page,
        "criteria[name]": name,
        "criteria[type]": type,
    });
}

export function createLocation({formData}) {
    return EmployeeClient.post('/check-in-place/new', formData);
}
