import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import {
    ALL_LOCATION_WITH_COORDINATE_STATE_KEY,
    ALL_LOCATION_WITHOUT_COORDINATE_STATE_KEY,
    ALL_LOCATION_STATE_KEY
} from './constants';

const initialState = {
    ...makeInitialState(ALL_LOCATION_WITH_COORDINATE_STATE_KEY),
    ...makeInitialState(ALL_LOCATION_WITHOUT_COORDINATE_STATE_KEY),
    [ALL_LOCATION_STATE_KEY]: []
};

export default initialState;
