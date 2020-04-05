import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL_STATE_KEY,
    FETCH_MNG_MOBILE_ACCESS_APPROVED_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL_STATE_KEY),
    ...makeInitialState(FETCH_MNG_MOBILE_ACCESS_APPROVED_STATE_KEY),
};

export default initialState;
