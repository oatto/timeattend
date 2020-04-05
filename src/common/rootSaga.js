import * as checkTimeAdjustmentSagas from '_features/check-time-adjustment/redux/sagas';
import * as checkTimeOutsideSagas from '_features/check-time-outside/redux/sagas';
import * as checkTimeSagas from '_features/check-time/redux/sagas';
import * as commonSagas from '_features/common/redux/sagas';
import * as locationSagas from '_features/location/redux/sagas';
import * as mngCheckTimeAdjustmentSagas from '_features/mng-check-time-adjustment/redux/sagas';
import * as mngCoreSagas from '_features/mng-core/redux/sagas';
import * as mngDashboardSagas from '_features/mng-dashboard/redux/sagas';
import * as mngEmCheckTimeAdjustmentSagas from '_features/mng-em-check-time-adjustment/redux/sagas';
import * as mngEmCheckTimeTransactionsHistorySagas from '_features/mng-em-check-time/redux/sagas';
import * as mngEmRecompenseWorkingSagas from '_features/mng-em-recompense-working/redux/sagas';
import * as mngEmTakeLeaveSagas from '_features/mng-em-take-leave/redux/sagas';
import * as mngEmployeeManagementSagas from '_features/mng-employee-management/redux/sagas';
import * as mngMobileAccessApprovalSagas from '_features/mng-mobile-access-approval/redux/sagas';
import * as mngMyEmployeeSagas from '_features/mng-my-employee/redux/sagas';
import * as mngRecompenseWorksSagas from '_features/mng-recompense-working/redux/sagas';
import * as mngTakeLeaveApprovalSagas from '_features/mng-take-leave-approval/redux/sagas';
import * as recompenseWorkingSagas from '_features/recompense-working/redux/sagas';
import * as takeLeaveSagas from '_features/take-leave/redux/sagas';
import * as userSagas from '_features/user/redux/sagas';
import { Toast } from 'native-base';
import * as rncoreCommonSagas from 'react-native-core/features/common/redux/sagas';
import { all } from 'redux-saga/effects';
import { appInitSaga } from './appInit';

const rncoreCommonSagasOverrided = {
    ...rncoreCommonSagas,
    watchRequestApiFailure: rncoreCommonSagas.watchRequestApiFailure.bind(null, Toast, {
        server: 'เกิดข้อผิดพลาดระหว่างการเชื่อมต่อกับเซิฟเวอร์',
        client: 'กรุณาตรวจสอบสัญญาณอินเตอร์เน็ท'
    })
};

const rootSagas = [
    appInitSaga
];

const featureSagas = [
    rootSagas,
    commonSagas,
    rncoreCommonSagasOverrided,
    userSagas,
    locationSagas,
    takeLeaveSagas,
    checkTimeSagas,
    checkTimeAdjustmentSagas,
    checkTimeOutsideSagas,
    recompenseWorkingSagas,
    mngMobileAccessApprovalSagas,
    mngTakeLeaveApprovalSagas,
    mngCheckTimeAdjustmentSagas,
    mngRecompenseWorksSagas,
    mngCoreSagas,
    mngDashboardSagas,
    mngMyEmployeeSagas,
    mngEmployeeManagementSagas,
    mngEmCheckTimeAdjustmentSagas,
    mngEmTakeLeaveSagas,
    mngEmCheckTimeTransactionsHistorySagas,
    mngEmRecompenseWorkingSagas
];

const sagas = featureSagas.reduce((prev, curr) => [
    ...prev,
    ...Object.keys(curr).map(k => curr[k]),
], [])
    .filter(s => typeof s === 'function');


const rootSaga = function* rootSaga() {
    yield all(sagas.map(saga => saga()));
};

export default rootSaga;
