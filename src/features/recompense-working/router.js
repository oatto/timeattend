import RecompenseWorkingScreen from './screen/RecompenseWorkingScreen';
import RecompenseWorkingRequestScreen from './screen/RecompenseWorkingRequestScreen';
import RecompenseWorkingShowScreen from './screen/RecompenseWorkingShowScreen';

export const RECOMPENSE_WORKING = 'RECOMPENSE_WORKING';
export const RECOMPENSE_WORKING_CREATE_REQUEST = 'RECOMPENSE_WORKING_CREATE_REQUEST';
export const RECOMPENSE_WORKING_SHOW = 'RECOMPENSE_WORKING_SHOW';

export const RecompenseWorkingRouter = {
    [RECOMPENSE_WORKING]: {
        screen: RecompenseWorkingScreen
    },
    [RECOMPENSE_WORKING_CREATE_REQUEST]: {
        screen: RecompenseWorkingRequestScreen
    },
    [RECOMPENSE_WORKING_SHOW]: {
        screen: RecompenseWorkingShowScreen
    }
};
