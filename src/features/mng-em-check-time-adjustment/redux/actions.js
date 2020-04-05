import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED,
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED,
    FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED,
    MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED,
    MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED,
    MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE_BY_EMPLOYEE
} from './constants';

export const fetchMngEmCheckTimeAdjustmentRequested = AbstractPaginateAction(FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED);
export const fetchMngEmCheckTimeAdjustmentApproved = AbstractPaginateAction(FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED);
export const fetchMngEmCheckTimeAdjustmentRejected = AbstractPaginateAction(FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED);

export const mngEmCheckTimeAdjustmentApproved = AbstractSubmitAction(MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED);
export const mngEmCheckTimeAdjustmentRejected = AbstractSubmitAction(MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED);

export const mngEmCheckTimeAdjustmentCreateByEmployee = AbstractSubmitAction(MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE_BY_EMPLOYEE);
