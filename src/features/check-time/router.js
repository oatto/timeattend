import CheckTimeTypeScreen from "./screen/CheckTimeTypeScreen";
import CheckTimeViaQrScreen from "./screen/CheckTimeViaQrScreen";
import CheckTimeLocationListScreen from "./screen/CheckTimeLocationListScreen";
import CheckTimeHistoryScreen from "./screen/CheckTimeHistoryScreen";
import CheckTimeTransactionsHistoryScreen from "./screen/CheckTimeTransactionHistoryScreen";
import CheckTimeScreen from "./screen/CheckTimeScreen";

export const CHECK_TIME_TYPE = 'CHECK_TIME_TYPE';
export const CHECK_TIME_LOCATION_LIST = 'CHECK_TIME_LOCATION_LIST';
export const CHECK_TIME_VIA_QR = 'CHECK_TIME_VIA_QR';
export const CHECK_TIME_HISTORY = 'CHECK_TIME_HISTORY';
export const CHECK_TIME_TRANSACTIONS_HISTORY = 'CHECK_TIME_TRANSACTIONS_HISTORY';
export const CHECK_TIME = 'CHECK_TIME';

export const CheckTimeRouter = {
    [CHECK_TIME_TYPE]: {
        screen: CheckTimeTypeScreen
    },
    [CHECK_TIME_VIA_QR]: {
        screen: CheckTimeViaQrScreen
    },
    [CHECK_TIME_LOCATION_LIST]: {
        screen: CheckTimeLocationListScreen
    },
    [CHECK_TIME_HISTORY]: {
        screen: CheckTimeHistoryScreen
    },
    [CHECK_TIME]: {
        screen: CheckTimeScreen
    },
    [CHECK_TIME_TRANSACTIONS_HISTORY]: {
        screen: CheckTimeTransactionsHistoryScreen
    }
};
