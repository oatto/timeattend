import {AbstractRequestAction} from 'react-native-core/api/request/action';
import {AbstractSubmitAction} from 'react-native-core/api/submit/action';
import {AbstractPaginateAction} from 'react-native-core/api/paginate/action';
import {
    CREATE_CHECK_IN,
    CREATE_CHECK_OUT,
    GET_CHECK_TIME_LATEST,
    GET_CHECK_TIME_HISTORY,
    GET_CHECK_TIME_TODAY_LIST,
    GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY,
    GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY,
    GET_LOCATION_BY_TOKEN,
    GET_LOCATION_BY_TOKEN_AND_DEVICE_LAT_LONG
} from './constants';

export const getCheckTimeLatest = AbstractRequestAction(GET_CHECK_TIME_LATEST);
export const getCheckTimeHistory = AbstractRequestAction(GET_CHECK_TIME_HISTORY);
export const getCheckTimeTodayList = AbstractRequestAction(GET_CHECK_TIME_TODAY_LIST);
export const getCheckTimeTransactionsDailyHistory = AbstractPaginateAction(GET_CHECK_TIME_TRANSACTIONS_DAILY_HISTORY);
export const getCheckTimeTransactionsOutsideHistory = AbstractPaginateAction(GET_CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY);
export const createCheckIn = AbstractSubmitAction(CREATE_CHECK_IN);
export const createCheckOut = AbstractSubmitAction(CREATE_CHECK_OUT);

// deprecated
export const getLocationByToken = AbstractRequestAction(GET_LOCATION_BY_TOKEN);
// deprecated
export const selectLocationForCheckInWithQrCode = (payload) => ({
    type: 'SELECT_LOCATION_BY_QR_CODE',
    payload
});

export const getLocationByTokenAndDeviceLatLong = AbstractRequestAction(GET_LOCATION_BY_TOKEN_AND_DEVICE_LAT_LONG);
export const selectLocationForCheckInWithQrCodeAndDeviceLatLong = (payload) => ({
    type: 'SELECT_LOCATION_BY_QR_CODE_AND_DEVICE_LAT_LONG',
    payload
});
