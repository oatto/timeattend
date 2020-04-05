import { AbstractPaginateAction } from 'react-native-core/api/paginate/action';
import { AbstractSubmitAction } from 'react-native-core/api/submit/action';
import {
    GET_TIME_ADJUSTMENT_BY_REQUESTED,
    GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED,
    CREATE_TIME_ADJUSTMENT,
    REJECTED_TIME_ADJUSTMENT
} from './constants';

export const getTimeAdjustmentByRequested = AbstractPaginateAction(GET_TIME_ADJUSTMENT_BY_REQUESTED);
export const getTimeAdjustmentIsNotRequested = AbstractPaginateAction(GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED);
export const createTimeAdjustment = AbstractSubmitAction(CREATE_TIME_ADJUSTMENT);
export const rejectedTimeAdjustment = AbstractSubmitAction(REJECTED_TIME_ADJUSTMENT);
