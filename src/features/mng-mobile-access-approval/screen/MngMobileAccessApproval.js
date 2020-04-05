/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Tab, TabHeading, Tabs, Text, View } from 'native-base';
import themeVariables from '_theme';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import RequestedTab from './tabs/_requested';
import ApprovedTab from './tabs/_approved';
import TabHeadingTheme from '../../../../native-base-theme/components/TabHeading';

class MngMobileAccessApproval extends React.PureComponent {
    render() {
        return (
            <Container withBackground iPhoneXSupport>
                <View fill padderHorizontal>
                    <Tabs locked>
                        <Tab heading={
                            <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                <Text>
                                    {Trans.tran('general.tab.requested')}
                                </Text>
                            </TabHeading>}
                        >
                            <RequestedTab />
                        </Tab>
                        <Tab heading={
                            <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                <Text>
                                    {Trans.tran('general.tab.approved')}
                                </Text>
                            </TabHeading>}
                        >
                            <ApprovedTab />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        );
    }
}

MngMobileAccessApproval.navigationOptions = ({navigation}) => ({
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerTitle: <HeaderTitle text={'mng.mobile_access_approval.title'} />,
});

export default MngMobileAccessApproval;
