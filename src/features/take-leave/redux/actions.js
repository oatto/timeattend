import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractRequestAction } from 'react-native-core/api/request/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    GET_TAKE_LEAVE_REQUEST_BY_REQUESTED,
    GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED,
    TAKE_LEAVE_REQUEST_CREATE,
    GET_COMPANY_TAKE_LEAVE_SETTINGS,
    TAKE_LEAVE_ALL_CANCEL_TRANSITION
} from './constants';

export const getTakeLeaveRequestByRequested = AbstractPaginateAction(GET_TAKE_LEAVE_REQUEST_BY_REQUESTED);
export const getTakeLeaveRequestByNoneRequested = AbstractPaginateAction(GET_TAKE_LEAVE_REQUEST_BY_NONE_REQUESTED);
export const createTakeLeaveRequest = AbstractSubmitAction(TAKE_LEAVE_REQUEST_CREATE);

export const getCompanyTakeLeaveSettings = AbstractRequestAction(GET_COMPANY_TAKE_LEAVE_SETTINGS);

export const takeLeaveAllCancelTransition = AbstractSubmitAction(TAKE_LEAVE_ALL_CANCEL_TRANSITION);
