import MngTakeLeaveApproval from "./screen/MngTakeLeaveApproval";
import MngTakeLeaveDetailScreen from "./screen/MngTakeLeaveDetailScreen";

export const MNG_TAKE_LEAVE_APPROVAL = 'MNG_TAKE_LEAVE_APPROVAL';
export const MNG_TAKE_LEAVE_DETAIL_SCREEN = 'MNG_TAKE_LEAVE_DETAIL_SCREEN';

export default {};

export const MngTakeLeaveApprovalRouter = {
    [MNG_TAKE_LEAVE_APPROVAL]: {
        screen: MngTakeLeaveApproval
    },
    [MNG_TAKE_LEAVE_DETAIL_SCREEN]: {
        screen: MngTakeLeaveDetailScreen
    }
};
