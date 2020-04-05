import { createPaginateTypes } from 'react-native-core/api/paginate/action';
import { createSubmitTypes } from 'react-native-core/api/submit/action';

export const GET_TIME_ADJUSTMENT_BY_REQUESTED = createPaginateTypes('GET_TIME_ADJUSTMENT_BY_REQUESTED');
export const GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED = createPaginateTypes('GET_TIME_ADJUSTMENT_IS_NOT_REQUESTED');
export const CREATE_TIME_ADJUSTMENT = createSubmitTypes('CREATE_TIME_ADJUSTMENT');
export const REJECTED_TIME_ADJUSTMENT = createSubmitTypes('REJECTED_TIME_ADJUSTMENT');

export const TIME_ADJUSTMENT_BY_REQUESTED_STATE_KEY = 'timeAdjustmentByRequested';
export const TIME_ADJUSTMENT_IS_NOT_REQUESTED_STATE_KEY = 'timeAdjustmentIsNotRequested';
