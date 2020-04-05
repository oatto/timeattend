import { call, take } from 'redux-saga/effects';
import { doRequest } from 'react-native-core/api/request/saga';
import ref from 'react-native-core/utils/ref';
import * as Api from '../../api/profile';
import {
    COMPANY_HOLIDAY_STATE_KEY,
    GET_USER_TAKE_LEAVE,
    GET_COMPANY_HOLIDAY,
    USER_TAKE_LEAVE_STATE_KEY,
} from '../constants';
import {
    getCompanyHoliday as getCompanyHolidayActions,
    getUserTakeLeave as getUserTakeLeaveActions,
} from '../actions'

export const watchUserTakeLeaveRequest = function*() {
    while(true) {
        yield take(GET_USER_TAKE_LEAVE.REQUEST);

        yield call(doRequest, getUserTakeLeaveActions, Api.getEmployeeTakeLeaves)
    }
};

export const watchCompanyHolidayRequest = function*() {
    while(true) {
        yield take(GET_COMPANY_HOLIDAY.REQUEST);

        const currentYear = (new Date()).getFullYear();

        yield call(doRequest, getCompanyHolidayActions, {
            apiFunction: Api.getHolidayByYear,
            args: [currentYear]
        })
    }
};

// use for extra data on take leave state
export function getAvailableTakeLeavesFromApiTakeLeave(takeLeave) {
    return takeLeave.filter(function (data) {
        return data.allow === true
    });
}

export function reducer(state, action) {
    switch (action.type) {
        case GET_USER_TAKE_LEAVE.SUCCESS: {
            return {
                ...state,
                [USER_TAKE_LEAVE_STATE_KEY]: getAvailableTakeLeavesFromApiTakeLeave(action.data.take_leaves),
            };
        }
        case GET_COMPANY_HOLIDAY.SUCCESS: {
            return {
                ...state,
                [COMPANY_HOLIDAY_STATE_KEY]: action.data._embedded.items,
            };
        }
        default:
            return state;
    }
}
