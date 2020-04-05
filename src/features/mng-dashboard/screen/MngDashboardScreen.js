/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Text, View, Tabs, Tab, TabHeading } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from "_theme";
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from "_features/common/containers/Trans";
import { NotificationIcon } from '_features/common/components/icons/AppIcons';
import CommonText from '_features/common/components/CommonText';
import { getNotificationCenterBadge } from '_features/common/redux/selectors';
import MngDashboardCheckTimeDailyScreen from './tab/MngDashboardCheckTimeDailyScreen';
import MngDashboardCheckTimeOutsideScreen from './tab/MngDashboardCheckTimeOutsideScreen';
import TabHeadingTheme from "../../../../native-base-theme/components/TabHeading";
import HeaderIconMenu from "../../common/components/HeaderIconMenu";

class MngDashboardScreen extends React.PureComponent {
    render() {
        return (
            <Container withBackground iPhoneXSupport>
                <View fill padderHorizontal withBackground>
                    <Tabs locked>
                        {/*FIXME : .first not working why ?*/}
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                    <Text>
                                        {Trans.tran('mng.dashboard.tab.check_time_daily')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <MngDashboardCheckTimeDailyScreen />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                    <Text>
                                        {Trans.tran('mng.dashboard.tab.check_time_outside')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <MngDashboardCheckTimeOutsideScreen />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        )
    }
}

MngDashboardScreen.navigationOptions = ({navigation, screenProps}) => ({
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerTitle: <HeaderTitle text={'mng.dashboard.title'} />,
    headerRight:
        <TouchableOpacity
            onPress={() => navigation.navigate({routeName: 'NOTIFICATION_SCREEN'})}
            style={styles.notificationContainer}
        >
            <View>
                <NotificationIcon size={themeVariables.ifs4} color={themeVariables.white} />
                {!isEmpty(screenProps.notificationCenterBadge) &&
                <View style={styles.notificationBadgeContainer} poitnerEvents="box-none">
                    <CommonText
                        text={screenProps.notificationCenterBadge.all}
                        style={styles.notificationBadge}
                    />
                </View>
                }
            </View>
        </TouchableOpacity>
});

const styles = StyleSheet.create({
    headerTitle: {
        alignItems: 'flex-end',
        right: themeVariables.isAndroid ? 20 : -60,
    },
    notificationContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: themeVariables.sp2,
        height: 40,
        width: 50,
    },
    notificationBadgeContainer: {
        position: 'absolute',
        left: themeVariables.isAndroid ? 10 : 16,
        top: -12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    notificationBadge: {
        color: 'white',
    }
});

export default connect(
    (state) => ({
        notificationCenterBadge: getNotificationCenterBadge(state)
    }),
    null
)(MngDashboardScreen);
