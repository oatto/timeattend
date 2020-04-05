import ref from "react-native-core/utils/ref";
import {
    FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY,
    MNG_FETCH_PUBLIC_DEVICE_STATE_KEY,
    APPROVAL_BADGE_STATE_KEY,
    GET_DEPARTMENTS_STATE_KEY,
    MNG_EMPLOYEE_GET_MANAGERS_STATE_KEY
} from './constants';
import { userProfile } from "../../user/redux/selectors";
import { IS_MANAGER_APP } from "../../../common/constants";

export const mngEmployeeMobileDevices = (state) => state.mngCore[FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY];
export const mngPublicMobileDevices = (state) => state.mngCore[MNG_FETCH_PUBLIC_DEVICE_STATE_KEY];
export const mngApprovalBadges = (state) => state.mngCore[APPROVAL_BADGE_STATE_KEY];
export const mngDepartmentsAsChoice = (state) => state.mngCore[GET_DEPARTMENTS_STATE_KEY].map((department) => {
    const repeat = department.level - 1;
    let prefix = "";
    if (repeat > 0) {
        prefix = "    ".repeat(repeat)
    }
    return {
        label: prefix + department.name,
        value: department.id
    };
});

export const isManager = (state) => {
    return !!ref(userProfile(state), 'manager') && IS_MANAGER_APP;
};

export const mngEmployeeGetManagers = (state) => state.mngCore[MNG_EMPLOYEE_GET_MANAGERS_STATE_KEY];
export const isMngEmployeeGetManagersLoading = (state) => state.mngCore[`${MNG_EMPLOYEE_GET_MANAGERS_STATE_KEY}isLoading`];
