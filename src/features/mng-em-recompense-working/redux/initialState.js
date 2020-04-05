import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED_STATE_KEY,
    FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED_STATE_KEY,
    FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED_STATE_KEY),
    ...makeInitialState(FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED_STATE_KEY),
    ...makeInitialState(FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED_STATE_KEY),
};

export default initialState;
