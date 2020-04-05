import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED = createPaginateTypes("FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED");
export const FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REQUESTED_STATE_KEY = "fetchMngEmCheckTimeAdjustmentRequested";

export const FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED = createPaginateTypes("FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED");
export const FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED_STATE_KEY = "fetchMngEmCheckTimeAdjustmentApproved";

export const FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED = createPaginateTypes("FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED");
export const FETCH_MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED_STATE_KEY = "fetchMngEmCheckTimeAdjustmentRejected";

export const MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED = createSubmitTypes("MNG_EM_CHECK_TIME_ADJUSTMENT_APPROVED");
export const MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED = createSubmitTypes("MNG_EM_CHECK_TIME_ADJUSTMENT_REJECTED");

export const MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE_BY_EMPLOYEE = createSubmitTypes("MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE_BY_EMPLOYEE");
