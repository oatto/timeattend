import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED,
    FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED,
    FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED,
    CREATE_MNG_EM_RECOMPENSE_WORKING,
    MNG_EM_RECOMPENSE_WORKING_ALL_APPROVE_TRANSITION,
    MNG_EM_RECOMPENSE_WORKING_ALL_REJECT_TRANSITION
} from './constants';

export const fetchMngEmRecompenseWorkingRequested = AbstractPaginateAction(FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED);
export const fetchMngEmRecompenseWorkingApproved = AbstractPaginateAction(FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED);
export const fetchMngEmRecompenseWorkingRejected = AbstractPaginateAction(FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED);

export const createMngEmRecompenseWorking = AbstractSubmitAction(CREATE_MNG_EM_RECOMPENSE_WORKING);

export const mngEmRecompenseWorkingAllApproveTransition = AbstractSubmitAction(MNG_EM_RECOMPENSE_WORKING_ALL_APPROVE_TRANSITION);
export const mngEmRecompenseWorkingAllRejectTransition = AbstractSubmitAction(MNG_EM_RECOMPENSE_WORKING_ALL_REJECT_TRANSITION);
