import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    TIME_ADJUSTMENT_BY_REQUESTED_STATE_KEY,
    TIME_ADJUSTMENT_IS_NOT_REQUESTED_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(TIME_ADJUSTMENT_BY_REQUESTED_STATE_KEY),
    ...makeInitialState(TIME_ADJUSTMENT_IS_NOT_REQUESTED_STATE_KEY),
};

export default initialState;
