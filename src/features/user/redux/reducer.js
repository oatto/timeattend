import initialState from './initialState';
import { reducer as loginReducer } from './reducers/login';
import { reducer as oauthReducer, setPushPlayerIdReducer, setTokenDataReducer } from './reducers/oauth';
import { reducer as mobileAccessReducer } from './reducers/mobile-access';
import { reducer as ProfileReducer } from './reducers/profile';
import { reducer as PrivateKeyReducer } from './reducers/private-key';
import { getManagersReducer } from './reducers/manager';
import { regenerateEmployeeIdentifierTokenReducer } from './reducers/regenerate_identifier_token';
import { getInboxMessageReducer } from './reducers/profile-inbox-message';

const reducers = [
    loginReducer,
    oauthReducer,
    mobileAccessReducer,
    ProfileReducer,
    PrivateKeyReducer,
    setPushPlayerIdReducer,
    setTokenDataReducer,
    getManagersReducer,
    regenerateEmployeeIdentifierTokenReducer,
    getInboxMessageReducer
];

export default function reducer(state = initialState, action = {}) {
    let newState;
    switch (action.type) {
        // Handle cross-topic actions here
        default:
            newState = state;
            break;
    }
    /* istanbul ignore next */
    return reducers.reduce((s, r) => r(s, action), newState);
}
