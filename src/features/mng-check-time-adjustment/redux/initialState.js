import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY),
    ...makeInitialState(FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY),
    ...makeInitialState(FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED_STATE_KEY)
};

export default initialState;
