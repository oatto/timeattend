import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractSubmitAction } from "react-native-core/api/submit/action";
import {
    FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL,
    FETCH_MNG_MOBILE_ACCESS_APPROVED,
    APPROVED_MOBILE_ACCESS,
    REJECTED_MOBILE_ACCESS,
    DELETE_MOBILE_ACCESS
} from './constants';

export const fetchMngMobileAccessApprovalRequested = AbstractPaginateAction(FETCH_MNG_MOBILE_ACCESS_REQUESTED_APPROVAL);
export const fetchMngMobileAccessApproved = AbstractPaginateAction(FETCH_MNG_MOBILE_ACCESS_APPROVED);
export const mngApprovedMobileAccess = AbstractSubmitAction(APPROVED_MOBILE_ACCESS);
export const mngRejectedMobileAccess = AbstractSubmitAction(REJECTED_MOBILE_ACCESS);
export const mngDeleteMobileAccess = AbstractSubmitAction(DELETE_MOBILE_ACCESS);
