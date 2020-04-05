import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    FETCH_MNG_RECOMPENSE_WORKS_REQUESTED_STATE_KEY,
    FETCH_MNG_RECOMPENSE_WORKS_APPROVED_STATE_KEY,
    FETCH_MNG_RECOMPENSE_WORKS_REFJECTED_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(FETCH_MNG_RECOMPENSE_WORKS_REQUESTED_STATE_KEY),
    ...makeInitialState(FETCH_MNG_RECOMPENSE_WORKS_APPROVED_STATE_KEY),
    ...makeInitialState(FETCH_MNG_RECOMPENSE_WORKS_REFJECTED_STATE_KEY)
};

export default initialState;
