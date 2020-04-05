import { REDUCER_KEY as RN_CORE_COMMON_KEY } from 'react-native-core/features/common/redux/constants';
import rncoreCommonReducer from 'react-native-core/features/common/redux/reducer';
import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import mngCheckTimeAdjustmentReducer from '../features/mng-check-time-adjustment/redux/reducer';
import mngMobileAccessApprovalReducer from '../features/mng-mobile-access-approval/redux/reducer';
import locationReducer from '../features/location/redux/reducer';
import takeLeaveReducer from '../features/take-leave/redux/reducer';
import checkTimeReducer from '../features/check-time/redux/reducer';
import checkTimeAdjustmentReducer from '../features/check-time-adjustment/redux/reducer';
import recompenseWorkingReducer from '../features/recompense-working/redux/reducer';
import checkTimeOutsideReducer from '../features/check-time-outside/redux/reducer';
import userReducer from '../features/user/redux/reducer';
import mngTakeLeaveApprovalReducer from '../features/mng-take-leave-approval/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import mngRecompenseWorksApprovalReducer from '../features/mng-recompense-working/redux/reducer';
import mngDashboardReducer from '../features/mng-dashboard/redux/reducer';
import mngEmployeeManagementReducer from '../features/mng-employee-management/redux/reducer';
import mngCoreReducer from '../features/mng-core/redux/reducer';
import mngMyEmployeeReducer from '../features/mng-my-employee/redux/reducer';
import mngEmTakeLeaveReducer from '../features/mng-em-take-leave/redux/reducer';
import mngEmCheckTimeTransactionsHistoryReducer from '../features/mng-em-check-time/redux/reducer';
import mngEmCheckTimeAdjustmentReducer from '../features/mng-em-check-time-adjustment/redux/reducer';
import mngEmRecompenseWorkingReducer from '../features/mng-em-recompense-working/redux/reducer';

export default reduceReducers(
    combineReducers({
        [RN_CORE_COMMON_KEY]: rncoreCommonReducer,
        form: formReducer,
        common: commonReducer,
        user: userReducer,
        location: locationReducer,
        takeLeave: takeLeaveReducer,
        checkTime: checkTimeReducer,
        checkTimeAdjustment: checkTimeAdjustmentReducer,
        checkTimeOutside: checkTimeOutsideReducer,
        recompenseWorking: recompenseWorkingReducer,
        mngMobileAccessApproval: mngMobileAccessApprovalReducer,
        mngTakeLeaveApproval: mngTakeLeaveApprovalReducer,
        mngCheckTimeAdjustmentApproval: mngCheckTimeAdjustmentReducer,
        mngRecompenseWorksApproval: mngRecompenseWorksApprovalReducer,
        mngDashboard: mngDashboardReducer,
        mngEmployeeManagement: mngEmployeeManagementReducer,
        mngCore: mngCoreReducer,
        mngMyEmployee: mngMyEmployeeReducer,
        mngEmTakeLeave: mngEmTakeLeaveReducer,
        mngEmCheckTimeTransactionsHistory: mngEmCheckTimeTransactionsHistoryReducer,
        mngEmCheckTimeAdjustment: mngEmCheckTimeAdjustmentReducer,
        mngEmRecompenseWorking: mngEmRecompenseWorkingReducer
    }),
    // Accoss state https://github.com/reactjs/redux/issues/749
    (state) => {
        // Do stuff
        return state;
    }
);
