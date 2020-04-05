import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createSubmitTypes } from "react-native-core/api/submit/action";

export const FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL = createPaginateTypes('FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL');
export const FETCH_MNG_MOBILE_ACCESS_APPROVED = createPaginateTypes('FETCH_MNG_MOBILE_ACCESS_APPROVED');

export const FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL_STATE_KEY = 'fetchMngMobileAccessApprovalRequested';
export const FETCH_MNG_MOBILE_ACCESS_APPROVED_STATE_KEY = 'fetchMngMobileAccessApproved';

export const APPROVED_MOBILE_ACCESS = createSubmitTypes('APPROVED_MOBILE_ACCESS');
export const REJECTED_MOBILE_ACCESS = createSubmitTypes('REJECTED_MOBILE_ACCESS');
export const DELETE_MOBILE_ACCESS = createSubmitTypes('DELETE_MOBILE_ACCESS');
