/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Tab, TabHeading, Tabs, Text, View} from 'native-base';
import themeVariables from '_theme';
import {NavigationActions} from 'react-navigation';
import ref from 'react-native-core/utils/ref';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import {getAllLocation} from '_features/location/redux/actions';
import CheckInTimeListTab from './tabs/CheckInTimeListTab';
import HistoryListTab from './tabs/HistoryListTab';
import RequestingTab from './tabs/RequestingTab';
import {CHECK_TIME_ADJUSTMENT_EDIT} from '../router';
import TabHeadingTheme from '../../../../native-base-theme/components/TabHeading';
import {PlusIcon} from "../../common/components/icons/AppIcons";

class CheckTimeAdjustmentIndexScreen extends React.PureComponent {
    render() {
        const haveInitPage = ref(this.props.navigation.state.params, 'tabIndexInit');

        return (
            <Container withBackground iPhoneXSupport>
                <View fill padderHorizontal>
                    <Tabs locked initialPage={haveInitPage ? haveInitPage : 0}>
                        <Tab heading={
                            <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                <Text>
                                    {Trans.tran('time_adjustment.index.tab_title1')}
                                </Text>
                            </TabHeading>}
                        >
                            <CheckInTimeListTab />
                        </Tab>
                        <Tab heading={
                            <TabHeading>
                                <Text>
                                    {Trans.tran('take_leave_list.title_tab_data_list.title_tab_approved')}
                                </Text>
                            </TabHeading>}
                        >
                            <RequestingTab />
                        </Tab>
                        <Tab heading={
                            <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                <Text>
                                    {Trans.tran('time_adjustment.index.tab_title3')}
                                </Text>
                            </TabHeading>}
                        >
                            <HistoryListTab />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        )
    }
}

CheckTimeAdjustmentIndexScreen.navigationOptions = ({navigation}) => {
    const headers = {
        headerTitle: <HeaderTitle text={'time_adjustment.title'} />,
        headerRight: <HeaderIconMenu
            icon={<PlusIcon headerMenuIcon />}
            onPress={() => {
                navigation.dispatch(NavigationActions.navigate({
                    routeName: CHECK_TIME_ADJUSTMENT_EDIT,
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
    null,
    null,
)(CheckTimeAdjustmentIndexScreen);
