import MngCheckTimeAdjustmentIndexScreen from "./screen/MngCheckTimeAdjustmentIndexScreen";
import MngCheckTimeAdjustmentShowScreen from "./screen/MngCheckTimeAdjustmentShowScreen";
import MngCheckTimeAdjustmentEmployeeListScreen from "./screen/MngCheckTimeAdjustmentEmployeeListScreen";
import MngCheckTimeAdjustmentCreateWithEmployeesScreen from "./screen/MngCheckTimeAdjustmentCreateWithEmployeesScreen";

export const MNG_CHECK_TIME_ADJUSTMENT = 'MNG_CHECK_TIME_ADJUSTMENT';
export const MNG_CHECK_TIME_ADJUSTMENT_SHOW = 'MNG_CHECK_TIME_ADJUSTMENT_SHOW';
export const MNG_CHECK_TIME_ADJUSTMENT_EMPLOYEE_LIST = 'MNG_CHECK_TIME_ADJUSTMENT_EMPLOYEE_LIST';
export const MNG_CHECK_TIME_ADJUSTMENT_CREATE_WITH_EMPLOYEES = 'MNG_CHECK_TIME_ADJUSTMENT_CREATE_WITH_EMPLOYEES';

export const MngCheckTimeAdjustmentRouter = {
    [MNG_CHECK_TIME_ADJUSTMENT]: {
        screen: MngCheckTimeAdjustmentIndexScreen
    },
    [MNG_CHECK_TIME_ADJUSTMENT_SHOW]: {
        screen: MngCheckTimeAdjustmentShowScreen
    },
    [MNG_CHECK_TIME_ADJUSTMENT_EMPLOYEE_LIST]: {
        screen: MngCheckTimeAdjustmentEmployeeListScreen
    },
    [MNG_CHECK_TIME_ADJUSTMENT_CREATE_WITH_EMPLOYEES]: {
        screen: MngCheckTimeAdjustmentCreateWithEmployeesScreen
    }
};
