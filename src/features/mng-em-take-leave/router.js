import MngEmTakeLeaveRequestScreen from "./screen/MngEmTakeLeaveRequestScreen";
import MngEmTakeLeaveRequestShowScreen from "./screen/MngEmTakeLeaveRequestShowScreen";
import MngEmProfileTakeLeaveScreen from "./screen/MngEmProfileTakeLeaveScreen";
import MngEmTakeLeaveRequestCreateScreen from "./screen/MngEmTakeLeaveRequestCreateScreen";

export const MNG_EM_TAKE_LEAVE = 'MNG_EM_TAKE_LEAVE';
export const MNG_EM_TAKE_LEAVE_SHOW = 'MNG_EM_TAKE_LEAVE_SHOW';
export const MNG_EM_PROFILE_TAKE_LEAVE = 'MNG_EM_PROFILE_TAKE_LEAVE';
export const MNG_EM_TAKE_LEAVE_CREATE = 'MNG_EM_TAKE_LEAVE_CREATE';

export const MngEmTakeLeaveRequestRouter = {
    [MNG_EM_TAKE_LEAVE]: {
        screen: MngEmTakeLeaveRequestScreen
    },
    [MNG_EM_TAKE_LEAVE_SHOW]: {
        screen: MngEmTakeLeaveRequestShowScreen
    },
    [MNG_EM_PROFILE_TAKE_LEAVE]: {
        screen: MngEmProfileTakeLeaveScreen
    },
    [MNG_EM_TAKE_LEAVE_CREATE]: {
        screen: MngEmTakeLeaveRequestCreateScreen
    }
};
