import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED = createPaginateTypes('FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED');
export const FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED = createPaginateTypes('FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED');
export const FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED = createPaginateTypes('FETCH_MNG_CHECK_TIME_ADJUSTMENT_REJECTED');

export const FETCH_MNG_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY = 'fetchMngCheckTimeAdjustmentRequested';
export const FETCH_MNG_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY = 'fetchMngCheckTimeAdjustmentApproved';
export const FETCH_MNG_CHECK_TIME_ADJUSTMENT_REFJECTED_STATE_KEY = 'fetchMngCheckTimeAdjustmentRejected';
export const MNG_REJECT_CHECK_TIME_ADJUSTMENT = createSubmitTypes("MNG_REJECT_CHECK_TIME_ADJUSTMENT");
export const MNG_APPROVE_CHECK_TIME_ADJUSTMENT = createSubmitTypes("MNG_APPROVE_CHECK_TIME_ADJUSTMENT");
export const MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES = createSubmitTypes("MNG_CREATE_CHECK_TIME_ADJUSTMENT_WITH_EMPLOYEES");
