import { makeInitialState } from 'react-native-core/api/paginate/reducer';

import {
    MNG_EM_GET_INBOX_MESSAGE_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(MNG_EM_GET_INBOX_MESSAGE_STATE_KEY),
};

export default initialState;
