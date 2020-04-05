import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY,
    APPROVAL_BADGE_STATE_KEY,
    GET_DEPARTMENTS_STATE_KEY,
    MNG_FETCH_PUBLIC_DEVICE_STATE_KEY,
    MNG_EMPLOYEE_GET_MANAGERS_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY),
    [APPROVAL_BADGE_STATE_KEY]: {},
    [GET_DEPARTMENTS_STATE_KEY]: [],
    [MNG_EMPLOYEE_GET_MANAGERS_STATE_KEY]: [],
    ...makeInitialState(MNG_FETCH_PUBLIC_DEVICE_STATE_KEY),
};

export default initialState;
