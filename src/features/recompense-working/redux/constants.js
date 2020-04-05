import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const GET_RECOMPENSE_WORKING_BY_REQUESTED = createPaginateTypes('GET_RECOMPENSE_WORKING_BY_REQUESTED');
export const GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED = createPaginateTypes('GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED');
export const CREATE_RECOMPENSE_WORKING = createSubmitTypes('CREATE_RECOMPENSE_WORKING');

export const RECOMPENSE_WORKING_BY_REQUESTED_STATE_KEY = 'recompenseWorkingByRequested';
export const RECOMPENSE_WORKING_BY_NONE_REQUESTED_STATE_KEY = 'recompenseWorkingByNoneRequested';

export const RECOMPENSE_WORKING_ALL_CANCEL_TRANSITION = createSubmitTypes("RECOMPENSE_WORKING_ALL_CANCEL_TRANSITION");
