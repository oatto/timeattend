import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED = createPaginateTypes("FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED");
export const FETCH_MNG_EM_RECOMPENSE_WORKING_REQUESTED_STATE_KEY = "fetchMngEmRecompenseWorkingRequested";

export const FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED = createPaginateTypes("FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED");
export const FETCH_MNG_EM_RECOMPENSE_WORKING_APPROVED_STATE_KEY = "fetchMngEmRecompenseWorkingApproved";

export const FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED = createPaginateTypes("FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED");
export const FETCH_MNG_EM_RECOMPENSE_WORKING_REJECTED_STATE_KEY = "fetchMngEmRecompenseWorkingRejected";

export const CREATE_MNG_EM_RECOMPENSE_WORKING = createSubmitTypes("CREATE_MNG_EM_RECOMPENSE_WORKING");

export const MNG_EM_RECOMPENSE_WORKING_ALL_APPROVE_TRANSITION = createSubmitTypes("MNG_EM_RECOMPENSE_WORKING_ALL_APPROVE_TRANSITION");
export const MNG_EM_RECOMPENSE_WORKING_ALL_REJECT_TRANSITION = createSubmitTypes("MNG_EM_RECOMPENSE_WORKING_ALL_REJECT_TRANSITION");
