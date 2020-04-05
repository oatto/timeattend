import { SET_MNG_CURRENT_ACTIVE_EMPLOYEE, MNG_CURRENT_ACTIVE_EMPLOYEE_STATE_KEY } from '../constants';

export function mngEmployeeManagementReducer(state, action) {
    switch (action.type) {
        case SET_MNG_CURRENT_ACTIVE_EMPLOYEE: {
            return {
                ...state,
                [MNG_CURRENT_ACTIVE_EMPLOYEE_STATE_KEY]: action.payload
            }
        }
        default:
            return state;
    }
}
