import EmployeeManagementMenusScreen from "./screen/EmployeeManagementMenusScreen";
import MngEmployeeProfileScreen from "./screen/MngEmployeeProfileScreen";
import MngEmInboxMessageScreen from "./screen/MngEmInboxMessage";

export const EMPLOYEE_MANAGEMENT_MENUS = 'EMPLOYEE_MANAGEMENT_MENUS';
export const MNG_EMPLOYEE_PROFILE = 'MNG_EMPLOYEE_PROFILE';
export const MNG_EMPLOYEE_INBOX_MESSAGE = 'MNG_EMPLOYEE_INBOX_MESSAGE';

export const MngEmployeeManagementRouter = {
    [EMPLOYEE_MANAGEMENT_MENUS]: {
        screen: EmployeeManagementMenusScreen
    },
    [MNG_EMPLOYEE_PROFILE]: {
        screen: MngEmployeeProfileScreen
    },
    [MNG_EMPLOYEE_INBOX_MESSAGE]: {
        screen: MngEmInboxMessageScreen
    }
};
