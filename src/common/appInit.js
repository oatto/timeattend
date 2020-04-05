import { call, take, put, fork, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import SplashScreen from 'react-native-splash-screen';
import { loginAnon, refreshToken } from '_features/user/redux/reducers/oauth';
import { changeLocale } from 'react-native-core/features/common/redux/actions';
import ref from 'react-native-core/utils/ref';
import { setLastUsername } from '_features/user/redux/actions';
import { REFRESH_TOKEN } from '_features/user/redux/constants';
import { executeSql, prepareTable } from './db';
import { USER_DB_ID } from './constants';

export const appInit = () => ({
    type: 'APP_INIT',
});

export const appReady = () => ({
    type: 'APP_READY',
});

export const appInitSaga = function* () {
    yield take(appInit().type);
    yield call(prepareTable);
    const user = yield call(executeSql, `SELECT * from User WHERE id =  ${USER_DB_ID}`);

    if (0 === user.results.rows.length) {
        // If user not exists in database ,we need to request anonAuthen
        yield call(loginAnon);
    } else {
        // If user exists in database ,we need to request refreshToken
        const data = user.results.rows.item(0);

        yield fork(refreshToken, data.refreshToken);

        const action = yield take([REFRESH_TOKEN.FAILURE, REFRESH_TOKEN.SUCCESS]);

        if (action.type === REFRESH_TOKEN.FAILURE) {
            // is invalid refresh token
            if (400 === ref(action, 'errors.response.status')) {
                // see oauth.js for handle this.
            }

            SplashScreen.hide();
            return;
        }

        if (data.locale) {
            yield put(changeLocale(data.locale));
        }

        if (data.lastUsername) {
            yield put(setLastUsername(data.lastUsername));
        }
    }

    yield put(appReady());

    yield race({
        resetSuccess: take('RESET_USER_SUCCESS'),
        timeout: call(delay, 3000)
    });

    SplashScreen.hide();
};
