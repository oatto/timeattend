import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    RECOMPENSE_WORKING_BY_REQUESTED_STATE_KEY,
    RECOMPENSE_WORKING_BY_NONE_REQUESTED_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(RECOMPENSE_WORKING_BY_REQUESTED_STATE_KEY),
    ...makeInitialState(RECOMPENSE_WORKING_BY_NONE_REQUESTED_STATE_KEY),
};

export default initialState;
