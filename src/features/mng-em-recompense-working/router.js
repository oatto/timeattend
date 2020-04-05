import MngEmRecompenseWorkingIndexScreen from "./screen/MngEmRecompenseWorkingIndexScreen";
import MngEmRecompenseWorkingShowScreen from "./screen/MngEmRecompenseWorkingShowScreen";
import MngEmRecompenseWorkingCreateScreen from "./screen/MngEmRecompenseWorkingCreateScreen";

export const MNG_EM_RECOMPENSE_WORKING_INDEX = 'MNG_EM_RECOMPENSE_WORKING_INDEX';
export const MNG_EM_RECOMPENSE_WORKING_SHOW = 'MNG_EM_RECOMPENSE_WORKING_SHOW';
export const MNG_EM_RECOMPENSE_WORKING_CREATE = 'MNG_EM_RECOMPENSE_WORKING_CREATE';

export const MngEmRecompenseWorkingRouter = {
    [MNG_EM_RECOMPENSE_WORKING_INDEX]: {
        screen: MngEmRecompenseWorkingIndexScreen
    },
    [MNG_EM_RECOMPENSE_WORKING_SHOW]: {
        screen: MngEmRecompenseWorkingShowScreen
    },
    [MNG_EM_RECOMPENSE_WORKING_CREATE]: {
        screen: MngEmRecompenseWorkingCreateScreen
    }
};
