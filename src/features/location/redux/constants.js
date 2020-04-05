import { createRequestTypes } from 'react-native-core/api/request/action';
import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const GET_ALL_LOCATION = createRequestTypes('GET_ALL_LOCATION');
export const ALL_LOCATION_STATE_KEY = 'allLocations';

export const GET_ALL_LOCATION_WITH_COORDINATE = createPaginateTypes('GET_ALL_LOCATION_WITH_COORDINATE');
export const ALL_LOCATION_WITH_COORDINATE_STATE_KEY = 'allLocationsWithCoordinate';

export const GET_ALL_LOCATION_WITHOUT_COORDINATE = createPaginateTypes('GET_ALL_LOCATION_WITHOUT_COORDINATE');
export const ALL_LOCATION_WITHOUT_COORDINATE_STATE_KEY = 'allLocationsWithoutCoordinate';

export const CREATE_LOCATION = createSubmitTypes('CREATE_LOCATION');
