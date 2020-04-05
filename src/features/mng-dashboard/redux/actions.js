import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { GET_MY_EMPLOYEES, GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE } from './constants';

export const getMyEmployees = AbstractPaginateAction(GET_MY_EMPLOYEES);

export const getMyEmployeeCheckTimeOutside = AbstractPaginateAction(GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE);
