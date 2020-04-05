import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    FETCH_MNG_RECOMPENSE_WORKS_REQUESTED,
    FETCH_MNG_RECOMPENSE_WORKS_APPROVED,
    FETCH_MNG_RECOMPENSE_WORKS_REFJECTED,
    MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES,
    MNG_RECOMPENSE_WORKING_ALL_APPROVAL_TRANSITION,
    MNG_RECOMNPENSE_WORKING_ALL_REJECT_TRANSITION
} from './constants';

export const fetchMngRecompenseWorksRequested = AbstractPaginateAction(FETCH_MNG_RECOMPENSE_WORKS_REQUESTED);
export const fetchMngRecompenseWorksApproved = AbstractPaginateAction(FETCH_MNG_RECOMPENSE_WORKS_APPROVED);
export const fetchMngRecompenseWorksRejected = AbstractPaginateAction(FETCH_MNG_RECOMPENSE_WORKS_REFJECTED);

export const mngCreateRecompenseWorksWithEmployees = AbstractSubmitAction(MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES);

export const mngRecompenseWorkingAllApprovalTransition = AbstractSubmitAction(MNG_RECOMPENSE_WORKING_ALL_APPROVAL_TRANSITION);
export const mngRecomnpenseWorkingAllRejectTransition = AbstractSubmitAction(MNG_RECOMNPENSE_WORKING_ALL_REJECT_TRANSITION);
