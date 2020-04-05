import TakeLeaveRequestListScreen from "./screen/TakeLeaveRequestListScreen";
import TakeLeaveRequestCreateScreen from "./screen/TakeLeaveRequestCreateScreen";
import TakeLeaveDetailScreen from "./screen/TakeLeaveDetailScreen";
import SummaryListRequest from "./screen/SummaryListRequestScreen";

export const TAKE_LEAVE_REQUEST = 'TAKE_LEAVE_REQUEST';
export const TAKE_LEAVE_REQUEST_CREATE = 'TAKE_LEAVE_REQUEST_CREATE';
export const TAKE_LEAVE_DETAIL = 'TAKE_LEAVE_DETAIL';
export const SUMMARY_LIST_REQUEST = 'SUMMARY_LIST_REQUEST';

export default {};

export const TakeLeaveRouter = {
    [TAKE_LEAVE_REQUEST]: {
        screen: TakeLeaveRequestListScreen
    },
    [TAKE_LEAVE_REQUEST_CREATE]: {
        screen: TakeLeaveRequestCreateScreen
    },
    [SUMMARY_LIST_REQUEST]: {
        screen: SummaryListRequest
    },
    [TAKE_LEAVE_DETAIL]: {
        screen: TakeLeaveDetailScreen
    }
};
