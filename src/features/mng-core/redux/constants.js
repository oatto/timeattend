import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createRequestTypes } from 'react-native-core/api/request/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const FETCH_MNG_EMPLOYEE_MOBILE_DEVICES = createPaginateTypes('FETCH_MNG_EMPLOYEE_MOBILE_DEVICES');
export const FETCH_MNG_EMPLOYEE_MOBILE_DEVICES_STATE_KEY = 'fetchMngEmployeeMobileDevices';

export const PUBLIC_MOBILE_DEVICE = createSubmitTypes('PUBLIC_MOBILE_DEVICE');

export const APPROVAL_BADGE = createRequestTypes("APPROVAL_BADGE");
export const APPROVAL_BADGE_RESET = 'APPROVAL_BADGE_RESET';
export const APPROVAL_BADGE_STATE_KEY = "approval_badge";

export const GET_DEPARTMENTS = createRequestTypes("GET_DEPARTMENTS");
export const GET_DEPARTMENTS_STATE_KEY = "departments";

export const MNG_FETCH_PUBLIC_DEVICE = createPaginateTypes("MNG_FETCH_PUBLIC_DEVICE");
export const MNG_FETCH_PUBLIC_DEVICE_STATE_KEY = "mngPublicDevices";

export const MNG_EMPLOYEE_GET_MANAGERS = createRequestTypes("MNG_EMPLOYEE_GET_MANAGERS");
export const MNG_EMPLOYEE_GET_MANAGERS_STATE_KEY = "mngEmployeeGetManagers";
