import template from 'url-template';
import forOwn from 'lodash/forOwn';
import axios from 'axios';
import { API_ENDPOINT, API_EMPLOYEE_ENDPOINT, API_MANAGER_ENDPOINT, API_OWNER_ENDPOINT } from '../common/constants';

export class ApiClient {
    constructor(apiEndpoint) {
        this._apiEndpoint = apiEndpoint;
        this._ignoreFormDataKey = ['_location'];
        this._client = axios.create({
            timeout: 100000,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            cancelToken: new axios.CancelToken((c) => {
                this._cancel = c;
            }),
        });

        this._cancel = () => {};
    }

    set _accessToken(accessToken) {
        if (null === accessToken) {
            delete this._client.defaults.headers.common['Authorization'];

            return;
        }
        this._client.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    }

    static responseHandler(promise) {
        return promise.then((response) => {
            console.log("%cRESPONSE => ", "color: green; font-weight: bold;", response.data);
            return response.data;
        });
    }

    parseUrl(path) {
        const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)/;
        if (regex.test(path)) {
            return path;
        }

        return `${this._apiEndpoint}${path}`;
    }

    requestHandler(formData) {
        let transformedFormData = formData;

        forOwn(formData, (v, k) => {
            if (null !== v && 'undefined' !== typeof v && -1 !== this._ignoreFormDataKey.indexOf(k)) {
                delete transformedFormData[k];
            }
        });

        console.log("%cFORM_DATA => ", "color: blue; font-weight: bold;", transformedFormData);

        transformedFormData = JSON.stringify(transformedFormData);
        return transformedFormData;
    }

    get(_path, _params = {}) {
        const url = template.parse(`${this.parseUrl(_path)}{?_params*}`).expand({
            _params: {
                ..._params
            }
        });

        console.log('API[GET] ==>', url);

        return ApiClient.responseHandler(this._client.get(url));
    }

    post(_path, _formData = {}) {
        const url = this.parseUrl(_path);

        console.log('API[POST] ==>', url);

        return ApiClient.responseHandler(
            this._client.post(url, this.requestHandler(_formData))
        );
    }

    put(_path, _formData = {}) {
        const url = this.parseUrl(_path);

        console.log('API[PUT] ==>', url);

        return ApiClient.responseHandler(
            this._client.put(url, this.requestHandler(_formData))
        );
    }

    patch(_path, _formData = {}) {
        const url = this.parseUrl(_path);

        console.log('API[PATCH] ==>', url);

        return ApiClient.responseHandler(
            this._client.patch(url, this.requestHandler(_formData))
        );
    }

    delete(_path, _params = {}) {
        const url = template.parse(`${this._apiEndpoint}${_path}{?_params*}`).expand({
            _params: {
                ..._params
            }
        });
        console.log('API[DELETE] ==>', url);
        return ApiClient.responseHandler(
            this._client.delete(url)
        );
    }
}

export const ApiMainEndpoint = new ApiClient(API_ENDPOINT);
export const ApiEmployeeEndpoint = new ApiClient(API_EMPLOYEE_ENDPOINT);
export const ApiManagerEndpoint = new ApiClient(API_MANAGER_ENDPOINT);
export const ApiOwnerEndpoint = new ApiClient(API_OWNER_ENDPOINT);
