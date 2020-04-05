import CheckTimeAdjustmentIndexScreen from "./screen/CheckTimeAdjustmentIndexScreen";
import CheckTimeAdjustmentEditScreen from "./screen/CheckTimeAdjustmentEditScreen";
import CheckTimeAdjustmentShowScreen from "./screen/CheckTimeAdjustmentShowScreen";

export const CHECK_TIME_ADJUSTMENT = 'CHECK_TIME_ADJUSTMENT';
export const CHECK_TIME_ADJUSTMENT_EDIT = 'CHECK_TIME_ADJUSTMENT_EDIT';
export const CHECK_TIME_ADJUSTMENT_SHOW = 'CHECK_TIME_ADJUSTMENT_SHOW';

export const CheckTimeAdjustmentRouter = {
    [CHECK_TIME_ADJUSTMENT]: {
        screen: CheckTimeAdjustmentIndexScreen
    },
    [CHECK_TIME_ADJUSTMENT_EDIT]: {
        screen: CheckTimeAdjustmentEditScreen
    },
    [CHECK_TIME_ADJUSTMENT_SHOW]: {
        screen: CheckTimeAdjustmentShowScreen
    }
};
