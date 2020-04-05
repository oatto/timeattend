import { Alert, Linking } from 'react-native';
import { call, takeLatest, take, put } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import requestReducer from 'react-native-core/api/request/reducer';
import ref from 'react-native-core/utils/ref';
import themeVariables from '_theme';
import { GET_APP_VERSION, GET_APP_VERSION_STATE_KEY } from '../constants';
import { getAppVersion } from '../actions';
import * as Api from '../../api/appVersion';
import { APP_VERSION, APP_VERSION_TEXT } from '../../../../common/constants';

export const watchGetAppVersionRequest = function*() {
    yield takeLatest(GET_APP_VERSION.REQUEST, function*() {
        yield call(doRequest, getAppVersion, {
            apiFunction: Api.getAppVersion,
            args: []
        }, {showLoading: false})
    });
};

export const watchGetAppVersionSuccess = function*() {
    // only once call
    yield take('RESET_USER_SUCCESS');
    yield put(getAppVersion.request());

    const { data } = yield take(GET_APP_VERSION.SUCCESS);

    if (data.version > APP_VERSION) {
        let url;

        if (themeVariables.isAndroid) {
            url = ref(data, 'setting.updateVersionAndroidUrl');
        } else {
            url = ref(data, 'setting.updateVersionIosUrl');
        }

        if (url) {
            Alert.alert(
                'Update a new version is available',
                `from "${APP_VERSION_TEXT}" to "${data.version_text}"`,
                [
                    {text: 'Update', onPress: () => {
                        return Linking.canOpenURL(url).then(supported => {
                            if (!supported) {
                                return false;
                            }

                            return Linking.openURL(url)
                        })
                    }},
                    {text: 'Later', onPress: () => {}},
                ]
            )
        }
    }
};

export const getAppVersionReducer = requestReducer(GET_APP_VERSION, GET_APP_VERSION_STATE_KEY);
