import { Alert } from 'react-native';
import { call, fork, put, select, take, takeLatest, takeEvery } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { doRequest } from 'react-native-core/api/request/saga';
import { doSubmit } from 'react-native-core/api/submit/saga';
import { navigateToRoot } from 'react-native-core/features/common/redux/actions';
import { alertChannel } from 'react-native-core/features/common/redux/sagas';
import requestReducer from 'react-native-core/api/request/reducer';
import ref from 'react-native-core/utils/ref';
import { API_RESPONSE_ACCESS_TOKEN_EXPIRED, API_RESPONSE_ACCESS_TOKEN_NOT_FOUND } from 'react-native-core/features/common/redux/constants';
import Trans from '_features/common/containers/Trans';
import { serverTimeRequestAction } from '_features/common/redux/actions';
import ThemeVariables from '_theme';
import { isAnon, userProfile as userProfileSelector, pushPlayerId, tokenData } from '_features/user/redux/selectors';
import { ApiMainEndpoint, ApiEmployeeEndpoint, ApiManagerEndpoint, ApiOwnerEndpoint } from '_utils/api';
import { USER_DB_ID, IS_MANAGER_APP } from '../../../../common/constants';
import { executeSql } from '../../../../common/db';
import * as Api from '../../api/oauth';
import { PRIVATE_KEY } from '../../router';
import {
    REFRESH_TOKEN,
    LOGIN,
    LOGIN_VIA_QR,
    LOGOUT,
    GET_USER_PROFILE,
    USER_PROFILE_STATE_KEY,
    SET_PUSH_PLAYER_ID,
    PUSH_PLAYER_ID_STATE_KEY,
    GET_DEVICE_ACCESS_CHECK
} from '../constants';
import { 
    login,
    loginViaQr as loginViaQrActions,
    logout as logoutActions,
    refreshToken as refreshTokenActions,
    getUserProfile as getUserProfileActions,
    checkDeviceAccessOnLogin as checkDeviceAccessOnLoginActions,
    sendPushRegisterToken,
    setLastUsername,
} from '../actions'

export const loginAnon = function*() {
    yield call(addTokenHeaderInApiClient, null);
    yield call(doSubmit, login, Api.anonAuthen, {
        cancelOnBack: false,
        hideLoadingOnSuccess: true,
    });
};

export const refreshToken = function*(refresh_token, isInit = true) {
    yield call(addTokenHeaderInApiClient, null);
    yield call(doRequest, refreshTokenActions, {
        apiFunction: Api.refreshToken,
        args: [refresh_token]
    }, {
        hideLoadingOnSuccess: false,
        cancelOnBack: false,
        meta: {
            disabledDisplayGlobalError: true,
            isInit
        }
    });
};

export const watchRefreshTokenFailure = function*() {
    while (true) {
        const action = yield take(REFRESH_TOKEN.FAILURE);
        if (400 === ref(action, 'errors.response.status')) {
            yield call(loginAnon); // If refresh token is invalid, we need to request anonAuthen
        } else {
            alert('No internet connect.');

            // Trigger display global error
            yield put({
                ...action,
                type: '_TRIGGER_REQUEST_FAILURE',
                __meta__: {}
            });
        }
    }
};

export const watchAccessTokenExpired = function*() {
    const maxAttempts = 4;
    let attemptCount = 1;
    yield takeLatest(API_RESPONSE_ACCESS_TOKEN_EXPIRED, function*() {
        attemptCount++;

        if (attemptCount > maxAttempts) {
            alert('Something Wrong. Please reopen this application.');
            return;
        }

        const refreshTokenData = yield select((state) => ref(state, 'user.token_data.refresh_token'));
        if (!refreshTokenData) {
            yield call(loginAnon);

            return;
        }

        yield fork(refreshToken, refreshTokenData, false);

        yield take('RESET_USER_SUCCESS');

        yield put({
            type: 'ATTEMPT_RECALL_API'
        });
    });
};

export const watchAccessTokenNotFound = function*() {
    yield takeLatest(API_RESPONSE_ACCESS_TOKEN_NOT_FOUND, function*({payload}) {
        alert('Your session has expired.');
        yield call(loginAnon);
    });
};

export const watchLoginSubmit = function*() {
    while (true) {
        const action = yield take(LOGIN.SUBMIT);
        yield call(doSubmit, login, {
            apiFunction: Api.login,
            args: [action.payload.formData]
        });
    }
};

export const watchLoginViaQrSubmit = function*() {
    while (true) {
        const action = yield take(LOGIN_VIA_QR.SUBMIT);
        yield call(doSubmit, loginViaQrActions, {
            apiFunction: Api.loginWithQr,
            args: [action.payload.identifierToken]
        });
    }
};

export const watchLoginValidationFailed = function*() {
    yield takeEvery([LOGIN.SUBMIT_VALIDATION_FAILED, LOGIN_VIA_QR.SUBMIT_VALIDATION_FAILED], function *() {
        alert(Trans.tran('user.login.form.login_failed'));
    });
};

export const watchResetUser = function*() {
    yield takeLatest([LOGIN.SUBMIT_SUCCESS, LOGIN_VIA_QR.SUBMIT_SUCCESS, LOGOUT.SUCCESS, REFRESH_TOKEN.SUCCESS], function*(action) {
        const {access_token, refresh_token} = action.data;

        yield put({
            type: 'BEGIN_RESET_USER'
        });

        // keep token data for push
        yield put({
            type: 'SET_TOKEN_DATA',
            payload: action.data
        });

        yield call(executeSql, `
            INSERT OR REPLACE INTO User (id, accessToken, refreshToken, locale, lastUsername)
            VALUES (${USER_DB_ID}, '${access_token}', '${refresh_token}', 
            (SELECT locale FROM User WHERE id = ${USER_DB_ID}), (SELECT lastUsername FROM User WHERE id = ${USER_DB_ID}))
        `);

        yield call(addTokenHeaderInApiClient, access_token);

        yield call(doRequest, getUserProfileActions, Api.getUserProfile);

        const isAnonUser = yield select(isAnon);

        if (action.type === LOGIN.SUBMIT_SUCCESS && !isAnonUser) {
            const userProfile = yield select(userProfileSelector);

            if (true === IS_MANAGER_APP && true !== userProfile.manager) {
                alert(Trans.tran('user.login.form.login_failed'));
                yield call(loginAnon);

                return;
            }

            yield call(executeSql, `UPDATE User SET lastUsername = '${userProfile.username}' WHERE id = ${USER_DB_ID}`);
            yield put(setLastUsername(userProfile.username));
        }

        if (action.type === REFRESH_TOKEN.SUCCESS && !ref(action, '__meta__.isInit')) {
            yield put({
                type: 'RESET_USER_SUCCESS'
            });

            return;
        }

        if (action.type === LOGIN.SUBMIT_SUCCESS || LOGIN_VIA_QR.SUBMIT_SUCCESS || action.type === REFRESH_TOKEN.SUCCESS) {
            if (!isAnonUser) {
                yield put(checkDeviceAccessOnLoginActions());
                yield put(serverTimeRequestAction.request());
                yield take(GET_DEVICE_ACCESS_CHECK.SUCCESS);
            } else {
                // is anon
                yield call(registerPushPlayerId);

                const currentRoute = yield select(state => ref(state, 'common.nav.currentRoute'));
                // prevent re render
                if (currentRoute !== 'ROOT') {
                    yield put(navigateToRoot());
                }
            }
        }

        if (action.type === LOGOUT.SUCCESS) {
            yield put(navigateToRoot());
        }

        yield put({
            type: 'RESET_USER_SUCCESS'
        });
    });
};

export const watchLogoutSubmit = function*() {
    while (true) {
        yield take(LOGOUT.SUBMIT);

        const { access_token, refresh_token } = yield select(tokenData);
        const player_id = yield select(pushPlayerId);

        yield call(doSubmit, logoutActions, {
            apiFunction: Api.logout,
            args: [{access_token, refresh_token, player_id}]
        });
    }
};

export const registerPushPlayerId = function*(isRevoke = false) {
    const playerId = yield select(pushPlayerId);

    yield fork(doSubmit, sendPushRegisterToken, {
        apiFunction: Api.sendPushRegisterToken,
        args: [playerId, ThemeVariables.platform, isRevoke]
    }, {
        alertOnValidationFailed: false
    });
};

export const watchLogoutSubmitSuccess = function*() {
    while (true) {
        yield take(LOGOUT.SUBMIT_SUCCESS);

        yield call(loginAnon);
    }
};

function addTokenHeaderInApiClient(accessToken) {
    ApiMainEndpoint._accessToken = null; // no meed to set main
    ApiEmployeeEndpoint._accessToken = accessToken;
    ApiManagerEndpoint._accessToken = accessToken;
    ApiOwnerEndpoint._accessToken = accessToken;
}

export const reducer = requestReducer(GET_USER_PROFILE, USER_PROFILE_STATE_KEY);

export function setTokenDataReducer(state, action) {
    switch (action.type) {
        case 'BEGIN_RESET_USER': {
            return {
                ...state,
                'is_resetting_user': true,
            };
        }
        case 'RESET_USER_SUCCESS': {
            return {
                ...state,
                'is_resetting_user': false,
            };
        }
        case 'SET_TOKEN_DATA': {
            return {
                ...state,
                'token_data': action.payload,
            };
        }
        default:
            return state;
    }
}

export function setPushPlayerIdReducer(state, action) {
    switch (action.type) {
        case SET_PUSH_PLAYER_ID: {
            return {
                ...state,
                [PUSH_PLAYER_ID_STATE_KEY]: action.payload.playerId,
            };
        }
        default:
            return state;
    }
}
