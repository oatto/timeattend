import { userProfile } from '_features/user/redux/selectors';
import {
    ALL_LOCATION_STATE_KEY,
    ALL_LOCATION_WITH_COORDINATE_STATE_KEY,
    ALL_LOCATION_WITHOUT_COORDINATE_STATE_KEY
} from './constants';

export const allLocation = (state) => state.location[ALL_LOCATION_STATE_KEY];
export const isAllLocationsIsLoading = (state) => state.location[`${ALL_LOCATION_STATE_KEY}IsLoading`];
export const locationWithCoordinate = (state) => state.location[ALL_LOCATION_WITH_COORDINATE_STATE_KEY];
export const locationWithoutCoordinate = (state) => state.location[ALL_LOCATION_WITHOUT_COORDINATE_STATE_KEY];

export const inRangeLocation = (state) => {
    const currentUser = userProfile(state);
    const shouldUseAreaFromSetting = currentUser.employee_group && currentUser.setting;

    return state.location[ALL_LOCATION_WITH_COORDINATE_STATE_KEY]['data'].filter(function(v) {
        const areaRangeForCheck = shouldUseAreaFromSetting ? currentUser.setting.area_range : v.area_range ;

        return v._distance <= areaRangeForCheck;
    })
};
