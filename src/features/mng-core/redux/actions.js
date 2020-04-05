import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractRequestAction } from 'react-native-core/api/request/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    FETCH_MNG_EMPLOYEE_MOBILE_DEVICES,
    APPROVAL_BADGE,
    APPROVAL_BADGE_RESET,
    GET_DEPARTMENTS,
    PUBLIC_MOBILE_DEVICE,
    MNG_FETCH_PUBLIC_DEVICE,
    MNG_EMPLOYEE_GET_MANAGERS
} from './constants';

export const fetchMngEmployeeMobileDevices = AbstractPaginateAction(FETCH_MNG_EMPLOYEE_MOBILE_DEVICES);

export const approvalBadge = AbstractRequestAction(APPROVAL_BADGE);
export const resetApprovalBadge = (payload) => ({
    type: APPROVAL_BADGE_RESET,
    payload
});

export const getDepartments = AbstractRequestAction(GET_DEPARTMENTS);

// Mobile Device
export const mngPublicMobileDevice = AbstractSubmitAction(PUBLIC_MOBILE_DEVICE);
export const mngFetchPublicDevice = AbstractPaginateAction(MNG_FETCH_PUBLIC_DEVICE);

export const mngEmployeeGetManagers = AbstractRequestAction(MNG_EMPLOYEE_GET_MANAGERS);
