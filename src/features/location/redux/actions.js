import { AbstractRequestAction } from 'react-native-core/api/request/action';
import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    GET_ALL_LOCATION,
    GET_ALL_LOCATION_WITH_COORDINATE,
    GET_ALL_LOCATION_WITHOUT_COORDINATE,
    CREATE_LOCATION
} from './constants';

export const getAllLocation = AbstractRequestAction(GET_ALL_LOCATION);
export const getAllLocationWithCoordinate = AbstractPaginateAction(GET_ALL_LOCATION_WITH_COORDINATE);
export const getAllLocationWithoutCoordinate = AbstractPaginateAction(GET_ALL_LOCATION_WITHOUT_COORDINATE);
export const createLocation = AbstractSubmitAction(CREATE_LOCATION);
