import React from 'react';
import PropTypes from "prop-types";
import ref from "react-native-core/utils/ref";
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Container, Tab, TabHeading, Tabs, Text, View } from 'native-base';
import themeVariables from '_theme';
import { PlusIcon } from '_features/common/components/icons/AppIcons';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import { getNotificationCenterBadge } from '_features/common/redux/selectors';
import HistoryTab from './tab/_history';
import RequestedTab from './tab/_requested';
import RemainingTakeLeaveTab from './tab/_remainingTakeLeave';
import TabHeadingTheme from '../../../../native-base-theme/components/TabHeading';
import { TAKE_LEAVE_REQUEST_CREATE } from "../router";

class TakeLeaveRequestListScreen extends React.PureComponent {

    render() {
        const haveInitPage = ref(this.props.navigation.state.params, 'tabIndexInit');

        return (
            <Container withBackground iPhoneXSupport>
                <View fill padderHorizontal>
                    <Tabs locked initialPage={haveInitPage ? haveInitPage : 0}>
                        {/*FIXME : .first not working why ?*/}
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                    <Text>
                                        {Trans.tran('take_leave_list.title_tab_data_list.title_tab_approved')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <RequestedTab />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading>
                                    <Text>
                                        {Trans.tran('take_leave_list.title_tab_data_list.title_tab_History')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <HistoryTab />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                    <Text>
                                        {Trans.tran('take_leave_list.title_tab_data_list.title_tab_leave_left')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <RemainingTakeLeaveTab />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        );
    }
}

TakeLeaveRequestListScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    notificationCenterBadge: PropTypes.object

};

TakeLeaveRequestListScreen.defaultProps = {
    notificationCenterBadge: {}
};

TakeLeaveRequestListScreen.navigationOptions = ({navigation}) => {
    const headers = {
        headerTitle: <HeaderTitle text={'take_leave_list.title_data_list'} />,
        headerRight: <HeaderIconMenu
            icon={<PlusIcon headerMenuIcon />}
            onPress={() => {
                navigation.dispatch(NavigationActions.navigate({
                    routeName: TAKE_LEAVE_REQUEST_CREATE,
                }));
            }}
        />
    };

    if (true === ref(navigation, 'state.params.isRootPage')) {
        headers.headerLeft = <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />;
    }

    return headers;
};

export default connect(
    (state) => ({
        notificationCenterBadge: getNotificationCenterBadge(state)
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(TakeLeaveRequestListScreen)
