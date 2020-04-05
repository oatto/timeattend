import ref from 'react-native-core/utils/ref';
import moment from '_utils/moment';
import forEach from 'lodash/forEach';
import sortBy from 'lodash/sortBy';
import {
    MNG_EM_CHECK_TIME_HISTORY_STATE_KEY,
    MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_STATE_KEY,
    MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_STATE_KEY
} from './constants';

export const mngEmCheckTimeHistory = (state) => {
    return ref(state.mngEmCheckTimeTransactionsHistory[MNG_EM_CHECK_TIME_HISTORY_STATE_KEY], 'data') ?
        state.mngEmCheckTimeTransactionsHistory[MNG_EM_CHECK_TIME_HISTORY_STATE_KEY].data : [];
};

export const mngEmCheckTimeHistoryStats = (state) => {
    return ref(state.mngEmCheckTimeTransactionsHistory[MNG_EM_CHECK_TIME_HISTORY_STATE_KEY], 'total') ?
        state.mngEmCheckTimeTransactionsHistory[MNG_EM_CHECK_TIME_HISTORY_STATE_KEY].total : {};
};

export const mngEmCheckTimeTransactionsDailyHistory = (state) => state.mngEmCheckTimeTransactionsHistory[MNG_EM_CHECK_TIME_TRANSACTIONS_DAILY_STATE_KEY];
export const mngEmCheckTimeTransactionsDailyHistoryWithGroup = (state) => {
    let grouped = {};
    mngEmCheckTimeTransactionsDailyHistory(state).data.map((data) => {
        const day = moment(data.checked_at).format('DD');
        if (!grouped[day]) {
            grouped[day] = [];
        }
        grouped[day].push(data);
    });

    let groupArr = [];
    forEach(grouped, (data, day) => {
        groupArr.push({
            data, day
        })
    });

    return sortBy(groupArr, ['day']).reverse();
};

export const mngEmCheckTimeTransactionsOutsideHistory = (state) => state.mngEmCheckTimeTransactionsHistory[MNG_EM_CHECK_TIME_TRANSACTIONS_OUTSIDE_STATE_KEY];
export const mngEmCheckTimeTransactionsOutsideHistoryWithGroup = (state) => {
    let grouped = {};
    mngEmCheckTimeTransactionsOutsideHistory(state).data.map((data) => {
        const day = moment(data.checked_at).format('DD');
        if (!grouped[day]) {
            grouped[day] = [];
        }
        grouped[day].push(data);
    });

    let groupArr = [];
    forEach(grouped, (data, day) => {
        groupArr.push({
            data, day
        })
    });

    return sortBy(groupArr, ['day']).reverse();
};
