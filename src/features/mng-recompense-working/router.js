import MngRecompenseWorksIndexScreen from "./screen/MngRecompenseWorksIndexScreen";
import MngRecompenseWorksDetailScreen from "./screen/MngRecompenseWorksDetailScreen";
import MngRecompenseWorksEmployeeListScreen from "./screen/MngRecompenseWorksEmployeeListScreen";
import MngRecompenseWorksCreateWithEmployeesScreen from "./screen/MngRecompenseWorksCreateWithEmployeesScreen";

export const MNG_RECOMPENSE_WORKS = 'MNG_RECOMPENSE_WORKS';
export const MNG_RECOMPENSE_WORKS_DETAIL = 'MNG_RECOMPENSE_WORKS_DETAIL';
export const MNG_RECOMPENSE_WORKS_EMPLOYEE_LIST = 'MNG_RECOMPENSE_WORKS_EMPLOYEE_LIST';
export const MNG_RECOMPENSE_WORKS_CREATE_WITH_EMPLOYEES = 'MNG_RECOMPENSE_WORKS_CREATE_WITH_EMPLOYEES';

export const MngRecompenseWorksRouter = {
    [MNG_RECOMPENSE_WORKS]: {
        screen: MngRecompenseWorksIndexScreen
    },
    [MNG_RECOMPENSE_WORKS_DETAIL]: {
        screen: MngRecompenseWorksDetailScreen
    },
    [MNG_RECOMPENSE_WORKS_EMPLOYEE_LIST]: {
        screen: MngRecompenseWorksEmployeeListScreen
    },
    [MNG_RECOMPENSE_WORKS_CREATE_WITH_EMPLOYEES]: {
        screen: MngRecompenseWorksCreateWithEmployeesScreen
    }
};
