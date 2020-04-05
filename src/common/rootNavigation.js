import React from 'react';
import PropTypes from 'prop-types';
import { Alert, BackHandler } from 'react-native';
import { Root } from 'native-base';
import isArray from 'lodash/isArray';
import forEach from 'lodash/forEach';
import { addNavigationHelpers, DrawerNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import Sidebar from '_features/common/containers/Sidebar';
import { CommonRouter } from '_features/common/router';
import { CheckTimeRouter } from '_features/check-time/router';
import { CheckTimeAdjustmentRouter } from '_features/check-time-adjustment/router';
import { CheckTimeOutsideRouter } from '_features/check-time-outside/router';
import { UserRouter } from '_features/user/router';
import {isAnon, isLogged, userProfile} from '_features/user/redux/selectors';
import { LocationRouter } from '_features/location/router';
import { TakeLeaveRouter } from '_features/take-leave/router';
import { RecompenseWorkingRouter } from '_features/recompense-working/router';
import { MngMobileAccessApprovalRouter } from '_features/mng-mobile-access-approval/router';
import { MngTakeLeaveApprovalRouter } from '_features/mng-take-leave-approval/router';
import { MngCheckTimeAdjustmentRouter } from '_features/mng-check-time-adjustment/router';
import { MngRecompenseWorksRouter } from '_features/mng-recompense-working/router';
import { MngCoreRouter } from '_features/mng-core/router';
import { MngDashboardRouter } from '_features/mng-dashboard/router';
import { MngMyEmployeeRouter } from '_features/mng-my-employee/router';
import { MngEmployeeManagementRouter } from '_features/mng-employee-management/router';
import { MngEmTakeLeaveRequestRouter } from '_features/mng-em-take-leave/router';
import { MngEmCheckTimeTransactionsHistoryRouter } from '_features/mng-em-check-time/router';
import { MngEmCheckTimeAdjustmentRouter } from '_features/mng-em-check-time-adjustment/router';
import { MngEmRecompenseWorkingRouter } from '_features/mng-em-recompense-working/router';
import Trans from "_features/common/containers/Trans";
import GradientBackground from "_features/common/components/GradientBackground";
import { getNotificationCenterBadge } from '_features/common/redux/selectors';
import { HEADER_STYLE } from './constants';
import HeaderTitle from "../features/common/components/HeaderTitle";

export const RootStack = StackNavigator({
    ...CommonRouter,
    ...CheckTimeRouter,
    ...CheckTimeAdjustmentRouter,
    ...CheckTimeOutsideRouter,
    ...UserRouter,
    ...LocationRouter,
    ...TakeLeaveRouter,
    ...RecompenseWorkingRouter,
    ...MngMobileAccessApprovalRouter,
    ...MngTakeLeaveApprovalRouter,
    ...MngCheckTimeAdjustmentRouter,
    ...MngRecompenseWorksRouter,
    ...MngCoreRouter,
    ...MngDashboardRouter,
    ...MngMyEmployeeRouter,
    ...MngEmployeeManagementRouter,
    ...MngEmTakeLeaveRequestRouter,
    ...MngEmCheckTimeTransactionsHistoryRouter,
    ...MngEmCheckTimeAdjustmentRouter,
    ...MngEmRecompenseWorkingRouter
}, {
    initialRouteName: 'ROOT',
    navigationOptions: ({navigation}) => ({
        headerBackground: <GradientBackground />,
        ...HEADER_STYLE
    }),
    card: {
        backgroundColor: '#f6f6f6',
    }
});

const RootDrawer = DrawerNavigator(
    {
        'root': {
            screen: RootStack
        },
    },
    {
        // eslint-disable-next-line react/display-name
        contentComponent: (props) => <Sidebar {...props} />,
    }
);

export const RootNavigator = StackNavigator({
    Drawer: {screen: RootDrawer},
}, {
    headerMode: 'none',
});

class RootNavigation extends React.PureComponent {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        const rootStackState = RootNavigation.getNavStateByKey(nav, 'root');

        if (rootStackState && rootStackState.index === 0) {
            Alert.alert(Trans.tran('general.close_app'), Trans.tran('general.close_app_detail'), [
                {
                    text: Trans.tran('general.confirm'),
                    onPress: () => BackHandler.exitApp()
                },
                { text: Trans.tran('general.cancel') }
            ]);

            return true;
        }

        dispatch(NavigationActions.back());

        return true;
    };

    static getNavStateByKey(navState, key) {
        let result = null;
        _find(navState, key);

        function _find(state, findKey) {
            if (isArray(state.routes)) {
                let founded = null;
                forEach(state.routes, function(stateRoute) {
                    if (stateRoute.key === findKey) {
                        founded = stateRoute;
                        result = stateRoute;
                        return false;
                    }

                    return _find(stateRoute, findKey)
                });

                if (founded) {
                    return true;
                }
            }

            return state;
        }

        return result;
    }

    render() {
        const {dispatch, nav, isAnonymous, isLoggedUser, user, notificationCenterBadge} = this.props;

        return (
            <Root>
                <RootNavigator
                    navigation={addNavigationHelpers({
                        dispatch,
                        state: nav,
                        addListener: createReduxBoundAddListener("root")
                    })}
                    screenProps={{
                        isAnon: isAnonymous,
                        isLogged: isLoggedUser,
                        user: user,
                        notificationCenterBadge: notificationCenterBadge ? notificationCenterBadge.badge : null
                    }}
                />
            </Root>
        )
    }
}

RootNavigation.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isAnonymous: PropTypes.bool.isRequired,
    isLoggedUser: PropTypes.bool.isRequired,
    notificationCenterBadge: PropTypes.object
};

RootNavigation.defaultProps = {
    notificationCenterBadge: {}
};

export default connect((state) => ({
    nav: state.common.nav,
    isAnonymous: isAnon(state),
    isLoggedUser: isLogged(state),
    user: userProfile(state),
    notificationCenterBadge: getNotificationCenterBadge(state)
}))(RootNavigation);
