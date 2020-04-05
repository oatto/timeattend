import LocationListScreen from "./screen/LocationListScreen";
import LocationShowScreen from "./screen/LocationShowScreen";
import LocationCreateScreen from "./screen/LocationCreateScreen";

export const LOCATION = 'LOCATION';
export const LOCATION_SHOW = 'LOCATION_SHOW';
export const LOCATION_CREATE = 'LOCATION_CREATE';

export default {};

export const LocationRouter = {
    [LOCATION]: {
        screen: LocationListScreen
    },
    [LOCATION_SHOW]: {
        screen: LocationShowScreen
    },
    [LOCATION_CREATE]: {
        screen: LocationCreateScreen
    }
};
