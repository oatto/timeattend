import { take, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import Trans from "_features/common/containers/Trans";
import { doSubmit } from 'react-native-core/api/submit/saga';
import ref from 'react-native-core/utils/ref';
import { REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN } from '../constants';
import { regenerateEmployeeIdentifierToken } from '../actions';
import * as Api from '../../api/regenerate_identifier_token';

export const watchRegenerateEmployeeIdentifierTokenSubmit = function* () {
    while (true) {
        yield take(REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN.SUBMIT);

        yield fork(doSubmit, regenerateEmployeeIdentifierToken, {
            apiFunction: Api.regenerateEmployeeIdentifierToken,
            args: []
        });

        const action = yield take([
            REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN.SUBMIT_VALIDATION_FAILED,
            REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN.SUBMIT_SUCCESS,
            REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN.SUBMIT_FAILURE,
        ]);

        if (action.type === REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN.SUBMIT_SUCCESS) {
            Alert.alert(Trans.tran('general.alert.success'),
                Trans.tran('user.profile.qr.regenerate_success'),
                [{ text: Trans.tran('general.alert.ok') }]
            )
        }
    }
};

export const regenerateEmployeeIdentifierTokenReducer = (state = {}, action) => {
    switch (action.type) {
        case REGENERATE_EMPLOYEE_IDENTIFIER_TOKEN.SUBMIT_SUCCESS:
            const newToken = ref(action, 'data.identifier_token');
            if (!newToken) {
                return state;
            }

            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    identifier_token: newToken
                }
            }
    }

    return state;
};
