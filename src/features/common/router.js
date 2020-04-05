import React from 'react';
import NotificationScreen from "./screen/NotificationScreen";
import RootScreen from "./screen/RootScreen";
import SubmitSuccessModal from "./components/SubmitSuccessModal";

export const DASHBOARD = 'ROOT';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';

export default {};

export const CommonRouter = {
    'ROOT': {
        screen: RootScreen,
    },
    [SUBMIT_SUCCESS]: {
        screen: SubmitSuccessModal
    },
    ['NOTIFICATION_SCREEN']: {
        screen: NotificationScreen
    },
};
