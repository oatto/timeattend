import { SET_LAST_USERNAME } from '../constants';

export function setLastUsername(username) {
    return {
        type: SET_LAST_USERNAME,
        payload: {
            username
        }
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case SET_LAST_USERNAME:
            return {
                ...state,
                lastUsername: action.payload.username,
            };
        default:
            return state;
    }
}
