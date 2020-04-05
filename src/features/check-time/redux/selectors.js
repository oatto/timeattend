import ref from 'react-native-core/utils/ref';
import forEach from 'lodash/forEach';
import sortBy from 'lodash/sortBy';
import moment from '_utils/moment';
import {
    CHECK_TIME_LATEST_STATE_KEY,
    CHECK_TIME_HISTORY_STATE_KEY,
    CHECK_TIME_TODAY_LIST_STATE_KEY,
    CHECK_TIME_TRANSACTIONS_DAILY_HISTORY_STATE_KEY,
    CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY_STATE_KEY
} from './constants';

export const getCheckTimeLatest = (state) => state.checkTime[CHECK_TIME_LATEST_STATE_KEY];
export const isCheckTimeLatestLoading = (state) => state.checkTime.checkTimeLatestLoading;
export const getCheckTimeHistory = (state) => {
    return ref(state.checkTime[CHECK_TIME_HISTORY_STATE_KEY], 'data') ?
        state.checkTime[CHECK_TIME_HISTORY_STATE_KEY].data : [];
};

export const getCheckTimeTransactionsDailyHistory = (state) => state.checkTime[CHECK_TIME_TRANSACTIONS_DAILY_HISTORY_STATE_KEY];
export const getCheckTimeTransactionsDailyHistoryWithGroup = (state) => {
    let grouped = {};
    getCheckTimeTransactionsDailyHistory(state).data.map((data) => {
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

export const getCheckTimeTransactionsOutsideHistory = (state) => state.checkTime[CHECK_TIME_TRANSACTIONS_OUTSIDE_HISTORY_STATE_KEY];
export const getCheckTimeTransactionsOutsideHistoryWithGroup = (state) => {
    let grouped = {};
    getCheckTimeTransactionsOutsideHistory(state).data.map((data) => {
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

export const getCheckTimeHistoryExcludeFuture = (state) => {
    const allHistoryData = getCheckTimeHistory(state);
    return allHistoryData.filter(function(v) {
        return v['is_future'] === false;
    });
};
export const getCheckTimeHistoryStats = (state) => {
    return ref(state.checkTime[CHECK_TIME_HISTORY_STATE_KEY], 'total') ?
        state.checkTime[CHECK_TIME_HISTORY_STATE_KEY].total : {};
};
export const getCheckTimeTodayWithType = (state, type) => {
    return state.checkTime[CHECK_TIME_TODAY_LIST_STATE_KEY].filter(function(v) {
        return v.type === type;
    })
};
