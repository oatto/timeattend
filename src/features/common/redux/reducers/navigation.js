import { takeLatest, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { createNavigatorReducer } from 'react-native-core/features/common/redux/reducers/_navigation';
import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../../../../common/rootNavigation';

export const reducer = createNavigatorReducer(RootNavigator);

export const forwardAfterAppReady = function*() {
    return;
    yield takeLatest('APP_READY', function*() {
        yield call(delay, 1000);
        // for dev
        yield put(NavigationActions.navigate({
            routeName: 'PROFILE_INBOX_MESSAGE',
            params: {
                coordinate: {
                    latitude: 13.7563,
                    longitude: 100.2,
                }
            }
        }))
    });
};
