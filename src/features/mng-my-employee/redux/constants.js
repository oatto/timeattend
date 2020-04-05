import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createRequestTypes } from 'react-native-core/api/request/action';

export const GET_CHECK_TIME_MONTHLY = createPaginateTypes("GET_CHECK_TIME_MONTHLY");
export const GET_CHECK_TIME_MONTHLY_STATE_KEY = "checkTimeMonthly";

export const MNG_TAKE_LEAVE_MONTHLY = createRequestTypes("MNG_TAKE_LEAVE_MONTHLY");
export const MNG_TAKE_LEAVE_MONTHLY_STATE_KEY = "mngTakeLeaveMonthly";

export const MNG_RECOMPENSE_WORK_MONTHLY = createRequestTypes("MNG_RECOMPENSE_WORK_MONTHLY");
export const MNG_RECOMPENSE_WORK_MONTHLY_STATE_KEY = "mngRecompenseWorkMonthly";

export const MNG_GET_MY_EMPLOYEES = createPaginateTypes("MNG_GET_MY_EMPLOYEES");
export const MNG_GET_MY_EMPLOYEES_STATE_KEY = "mngGetMyEmployee";
