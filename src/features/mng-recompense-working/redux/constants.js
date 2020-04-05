import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const FETCH_MNG_RECOMPENSE_WORKS_REQUESTED = createPaginateTypes('FETCH_MNG_RECOMPENSE_WORKS_REQUESTED');
export const FETCH_MNG_RECOMPENSE_WORKS_APPROVED = createPaginateTypes('FETCH_MNG_RECOMPENSE_WORKS_APPROVED');
export const FETCH_MNG_RECOMPENSE_WORKS_REFJECTED = createPaginateTypes('FETCH_MNG_RECOMPENSE_WORKS_REJECTED');

export const FETCH_MNG_RECOMPENSE_WORKS_REQUESTED_STATE_KEY = 'fetchMngRecompenseWorksRequested';
export const FETCH_MNG_RECOMPENSE_WORKS_APPROVED_STATE_KEY = 'fetchMngRecompenseWorksApproved';
export const FETCH_MNG_RECOMPENSE_WORKS_REFJECTED_STATE_KEY = 'fetchMngRecompenseWorksRejected';

export const MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES = createSubmitTypes("MNG_CREATE_RECOMPENSE_WORKS_WITH_EMPLOYEES");

export const MNG_RECOMPENSE_WORKING_ALL_APPROVAL_TRANSITION = createSubmitTypes("MNG_RECOMPENSE_WORKING_ALL_APPROVAL_TRANSITION");
export const MNG_RECOMNPENSE_WORKING_ALL_REJECT_TRANSITION = createSubmitTypes("MNG_RECOMNPENSE_WORKING_ALL_REJECT_TRANSITION");
