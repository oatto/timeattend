import moment from '_utils/moment';
import { Alert } from 'react-native';
import { call, put, take } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { doSubmit } from 'react-native-core/api/submit/saga';
import { doRequest } from 'react-native-core/api/request/saga';
import { DASHBOARD } from '_features/common/router';
import * as ApiCheckTime from '_features/check-time/api/check-time';
import { getCheckTimeLatest } from '_features/check-time/redux/actions';
import * as Api from '../../api/profile';
import {
    CHECKED_CURRENT_PRIVATE_KEY,
    REMOVE_CHECKED_CURRENT_PRIVATE_KEY,
    REMOVE_USER_PRIVATE_KEY,
    SET_USER_PRIVATE_KEY,
    USER_PROFILE_STATE_KEY
} from '../constants';
import {
    setUserPrivateKey,
    removeUserPrivateKey,
    checkedUserCurrentPrivateKey,
    removeCheckedCurrentPrivateKey
} from '../actions'
import Trans from "../../../common/containers/Trans";

export const watchSetUserPrivateKeySubmit = function*() {
    while(true) {
        const action = yield take(SET_USER_PRIVATE_KEY.SUBMIT);

        yield call(doSubmit, setUserPrivateKey, {
            apiFunction: Api.setPrivateKey,
            args: [action.payload]
        })
    }
};

export const watchSetUserPrivateKeySubmitSuccess = function*() {
    while(true) {
        yield take(SET_USER_PRIVATE_KEY.SUBMIT_SUCCESS);
        yield put(NavigationActions.back());
    }
};

export const watchRemoveCheckedCurrentPrivateKey = function*() {
    while(true) {
        const action = yield take(REMOVE_CHECKED_CURRENT_PRIVATE_KEY.SUBMIT);

        yield call(doSubmit, removeCheckedCurrentPrivateKey, {
            apiFunction: Api.checkedPrivateKey,
            args: [action.payload]
        })
    }
};

export const watchRemoveCheckedCurrentPrivateKeySuccess = function*() {
    while(true) {
        yield take(REMOVE_CHECKED_CURRENT_PRIVATE_KEY.SUBMIT_SUCCESS);
        yield call(doSubmit, removeUserPrivateKey, Api.removePrivateKey)
    }
};

export const watchRemoveUserPrivateKeySubmitSuccess = function*() {
    while(true) {
        yield take(REMOVE_USER_PRIVATE_KEY.SUBMIT_SUCCESS);
        yield put(NavigationActions.back());
    }
};

export const watchCheckedCurrentPrivateKey = function*() {
    while(true) {
        const action = yield take(CHECKED_CURRENT_PRIVATE_KEY.SUBMIT);

        yield call(doSubmit, checkedUserCurrentPrivateKey, {
            apiFunction: Api.checkedPrivateKey,
            args: [action.payload]
        })
    }
};

export const watchCheckedCurrentPrivateKeySuccess = function*() {
    while(true) {
        yield take(CHECKED_CURRENT_PRIVATE_KEY.SUBMIT_SUCCESS);

        yield call(doRequest, getCheckTimeLatest, ApiCheckTime.getCheckTimeLatest, {
            meta: {disabledDisplayGlobalError: true}
        });

        yield put(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: DASHBOARD })
            ]
        }));
    }
};

export const watchBadResponsePrivateKeyValidationFailure = function*() {
    while(true) {
        const action = yield take([CHECKED_CURRENT_PRIVATE_KEY.SUBMIT_VALIDATION_FAILED, REMOVE_CHECKED_CURRENT_PRIVATE_KEY.SUBMIT_VALIDATION_FAILED]);
        const dateCanChange = action.errors.response.data.can_change_at;

        if (dateCanChange) {
            Alert.alert(Trans.tran('login.alert_reducer.account_locked'),
                Trans.tran('login.alert_reducer.log_in_again_time') +
                `${moment(dateCanChange).format(
                    ' HH : mm' + Trans.tran('user.private_key.minute') + 
                    'ss' + Trans.tran('user.private_key.second'))
                }`,
                [{ text: Trans.tran('recompense_working.alert_reducer.ok') }]
            )
        } else {
            Alert.alert(Trans.tran('login.alert_reducer.wrong_password'),
                Trans.tran('login.alert_reducer.private_password_invalid'),
                [{ text: Trans.tran('recompense_working.alert_reducer.ok') }]
            )
        }
    }
};

export function reducer(state, action) {
    switch (action.type) {
        case SET_USER_PRIVATE_KEY.SUBMIT_SUCCESS: {
            return {
                ...state,
                [USER_PROFILE_STATE_KEY]: {
                    ...state[USER_PROFILE_STATE_KEY],
                    is_private_password_required: true
                }
            };
        }
        case REMOVE_USER_PRIVATE_KEY.SUBMIT_SUCCESS: {
            return {
                ...state,
                [USER_PROFILE_STATE_KEY]: {
                    ...state[USER_PROFILE_STATE_KEY],
                    is_private_password_required: false
                }
            };
        }
        default:
            return state;
    }
}
