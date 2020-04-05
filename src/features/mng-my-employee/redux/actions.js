import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractRequestAction } from 'react-native-core/api/request/action';
import {
    GET_CHECK_TIME_MONTHLY,
    MNG_TAKE_LEAVE_MONTHLY,
    MNG_RECOMPENSE_WORK_MONTHLY,
    MNG_GET_MY_EMPLOYEES
} from './constants';

export const getCheckTimeMonthly = AbstractPaginateAction(GET_CHECK_TIME_MONTHLY);

export const mngTakeLeaveMonthly = AbstractRequestAction(MNG_TAKE_LEAVE_MONTHLY);

export const mngRecompenseWorkMonthly = AbstractRequestAction(MNG_RECOMPENSE_WORK_MONTHLY);

export const mngGetMyEmployees = AbstractPaginateAction(MNG_GET_MY_EMPLOYEES);
