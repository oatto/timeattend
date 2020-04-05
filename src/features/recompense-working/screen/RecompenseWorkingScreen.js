/* eslint-disable react/prop-types */
import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Container, Tabs, Tab, TabHeading, Text, View } from 'native-base';
import themeVariables from '_theme';
import { PlusIcon } from '_features/common/components/icons/AppIcons';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from "_features/common/containers/Trans";
import RequestedTabList from './tabs/RequestedListTab';
import NoneRequestedListTab from './tabs/NoneRequestedListTab';
import { RECOMPENSE_WORKING_CREATE_REQUEST } from '../router';
import TabHeadingThemeVariables from '../../../../native-base-theme/components/TabHeading';
import ref from "react-native-core/utils/ref";

class RecompenseWorkingScreen extends React.PureComponent {
    render () {
        const haveInitPage = ref(this.props.navigation.state.params, 'tabIndexInit');

        return (
            <Container withBackground iPhoneXSupport>
                <View fill padderHorizontal>
                    <Tabs locked initialPage={haveInitPage ? haveInitPage : 0}>
                        <Tab heading={
                            <TabHeading style={TabHeadingThemeVariables(themeVariables)['.first']}>
                                <Text>
                                    {Trans.tran('recompense_working.work_screen.wait_approve')}
                                </Text>
                            </TabHeading>}
                        >
                            <RequestedTabList />
                        </Tab>
                        <Tab heading={
                            <TabHeading style={TabHeadingThemeVariables(themeVariables)['.last']}>
                                <Text>
                                    {Trans.tran('recompense_working.work_screen.history_of_time_correction')}
                                </Text>
                            </TabHeading>}
                        >
                            <NoneRequestedListTab />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        )
    }
}

RecompenseWorkingScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle text={'recompense_working.title'} />,
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerStyle: {
        elevation: 0,
        backgroundColor: themeVariables.primary
    },
    headerRight: <HeaderIconMenu
        icon={<PlusIcon headerMenuIcon />}
        onPress={() => {
            navigation.dispatch(NavigationActions.navigate({
                routeName: RECOMPENSE_WORKING_CREATE_REQUEST
            }));
        }}
    />
});

export default RecompenseWorkingScreen;
