/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Tab, TabHeading, Tabs, Text, View } from 'native-base';
import themeVariables from '_theme';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import EmployeeDevicesTab from './tabs/_employeeDevices';
import PublicDevicesTab from './tabs/_publicDevices';
import TabHeadingTheme from '../../../../native-base-theme/components/TabHeading';

class MngMobileDevices extends React.PureComponent {
    render() {
        return (
            <Container withBackground iPhoneXSupport>
                <View fill padderHorizontal>
                    <Tabs locked>
                        {/*FIXME : .first not working why ?*/}
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                    <Text>
                                        {Trans.tran('mng.public_mobile_devices.tabs.index')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <EmployeeDevicesTab />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                    <Text>
                                        {Trans.tran('mng.public_mobile_devices.tabs.public_devices')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <PublicDevicesTab />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        );
    }
}

MngMobileDevices.navigationOptions = ({navigation}) => ({
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerTitle: <HeaderTitle text={'mng.public_mobile_devices.title'} />,
});

export default MngMobileDevices;