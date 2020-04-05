import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    GET_RECOMPENSE_WORKING_BY_REQUESTED,
    GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED,
    CREATE_RECOMPENSE_WORKING,
    RECOMPENSE_WORKING_ALL_CANCEL_TRANSITION
} from './constants';

export const getRecompenseWorkingByRequested = AbstractPaginateAction(GET_RECOMPENSE_WORKING_BY_REQUESTED);
export const getRecompenseWorkingByNoneRequested = AbstractPaginateAction(GET_RECOMPENSE_WORKING_BY_NONE_REQUESTED);
export const createRecompenseWorking = AbstractSubmitAction(CREATE_RECOMPENSE_WORKING);

export const recompenseWorkingAllCancelTransition = AbstractSubmitAction(RECOMPENSE_WORKING_ALL_CANCEL_TRANSITION);
