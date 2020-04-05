import initialState from './initialState';
import {
    allLocationReducer,
    locationWithCoordinateReducer,
    locationWithoutCoordinateReducer
} from './reducers/location';

const reducers = [
    allLocationReducer,
    locationWithCoordinateReducer,
    locationWithoutCoordinateReducer
];

export default function reducer(state = initialState, action = {}) {
    let newState;
    switch (action.type) {
        // Handle cross-topic actions here
        default:
            newState = state;
            break;
    }
    /* istanbul ignore next */
    return reducers.reduce((s, r) => r(s, action), newState);
}
