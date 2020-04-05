import MngEmCheckTimeAdjustmentIndexScreen from "./screen/MngEmCheckTimeAdjustmentIndexScreen";
import MngEmCheckTimeAdjustmentShowScreen from "./screen/MngEmCheckTimeAdjustmentShowScreen";
import MngEmCheckTimeAdjustmentCreateScreen from "./screen/MngEmCheckTimeAdjustmentCreateScreen";

export const MNG_EM_CHECK_TIME_ADJUSTMENT_INDEX = 'MNG_EM_CHECK_TIME_ADJUSTMENT_INDEX';
export const MNG_EM_CHECK_TIME_ADJUSTMENT_SHOW = 'MNG_EM_CHECK_TIME_ADJUSTMENT_SHOW';
export const MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE = 'MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE';

export const MngEmCheckTimeAdjustmentRouter = {
    [MNG_EM_CHECK_TIME_ADJUSTMENT_INDEX]: {
        screen: MngEmCheckTimeAdjustmentIndexScreen
    },
    [MNG_EM_CHECK_TIME_ADJUSTMENT_SHOW]: {
        screen: MngEmCheckTimeAdjustmentShowScreen
    },
    [MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE]: {
        screen: MngEmCheckTimeAdjustmentCreateScreen
    }
};
