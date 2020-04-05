import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_STATE_KEY,
    MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_STATE_KEY,
} from './constants';

const initialState = {
    ...makeInitialState(MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_STATE_KEY),
    ...makeInitialState(MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_STATE_KEY),
};

export default initialState;
