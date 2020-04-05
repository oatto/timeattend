import MyEmployeeScreen from "./screen/MyEmployeeScreen";
import MyEmployeeListScreen from "./screen/MyEmployeeListScreen";

export const MNG_MY_EMPLOYEE_SCREEN = 'MNG_MY_EMPLOYEE_SCREEN';
export const MNG_MY_EMPLOYEE_LIST_SCREEN = 'MNG_MY_EMPLOYEE_LIST_SCREEN';

export const MngMyEmployeeRouter = {
    [MNG_MY_EMPLOYEE_SCREEN]: {
        screen: MyEmployeeScreen
    },
    [MNG_MY_EMPLOYEE_LIST_SCREEN]: {
        screen: MyEmployeeListScreen
    }
};
