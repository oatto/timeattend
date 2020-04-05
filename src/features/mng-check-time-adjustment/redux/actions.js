import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED,
    FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED,
    MNG_REJECT_CHECK_TIME_ADJUSTMENT,
    MNG_APPROVE_CHECK_TIME_ADJUSTMENT,
    MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES
} from './constants';

export const fetchMngCheckTimeAdjustmentRequested = AbstractPaginateAction(FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED);
export const fetchMngCheckTimeAdjustmentApproved = AbstractPaginateAction(FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED);
export const fetchMngCheckTimeAdjustmentRejected = AbstractPaginateAction(FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED);

export const mngRejectCheckTimeAdjustment = AbstractSubmitAction(MNG_REJECT_CHECK_TIME_ADJUSTMENT);

export const mngApproveCheckTimeAdjustment = AbstractSubmitAction(MNG_APPROVE_CHECK_TIME_ADJUSTMENT);

export const mngCreateCheckTimeAdjustmentWithEmployees = AbstractSubmitAction(MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES);
