import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    CHECK_TIME_TODAY_LIST_STATE_KEY,
    CHECK_TIME_TRANSACTIONS_DAILY_HISTORY_STATE_KEY,
    CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(CHECK_TIME_TRANSACTIONS_DAILY_HISTORY_STATE_KEY),
    ...makeInitialState(CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY_STATE_KEY),
    [CHECK_TIME_TODAY_LIST_STATE_KEY]: []
};

export default initialState;
