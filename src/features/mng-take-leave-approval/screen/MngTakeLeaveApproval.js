/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Tab, TabHeading, Tabs, Text, View } from 'native-base';
import themeVariables from '_theme';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import TabHeadingTheme from '../../../../native-base-theme/components/TabHeading';
import RequestedTab from './tabs/_requested';
import ApprovedTab from './tabs/_approved';
import RejectedTab from './tabs/_rejected';
import ref from "react-native-core/utils/ref";

class MngTakeLeaveApproval extends React.PureComponent {
    constructor(props) {
        super(props);

        const haveInitPage = ref(this.props.navigation.state.params, 'tabIndexInit');

        this.state = {
            initPage: haveInitPage ? haveInitPage : 0
        };
    }

    render() {
        return (
            <Container withBackground iPhoneXSupport>
                <View fill padderHorizontal>
                    <Tabs locked initialPage={this.state.initPage}>
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                    <Text>
                                        {Trans.tran('general.tab.requested')}
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
                                        {Trans.tran('general.tab.approved')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <ApprovedTab />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                    <Text>
                                        {Trans.tran('general.tab.rejected')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <RejectedTab />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        );
    }
}

MngTakeLeaveApproval.navigationOptions = ({navigation}) => ({
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerTitle: <HeaderTitle text={'mng.take_leave_approval.title'} />,
});

export default MngTakeLeaveApproval;
