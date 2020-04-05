/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { NotificationIcon } from '_features/common/components/icons/AppIcons';
import themeVariables from '_theme';
import { isAnon, isLogged, isMobileCheckedPass, userProfile } from '_features/user/redux/selectors';
import { isManager } from '_features/mng-core/redux/selectors';
import MngDashboardScreen from '_features/mng-dashboard/screen/MngDashboardScreen';
import LoginScreen from "_features/user/screen/LoginScreen"
import CommonText from '_features/common/components/CommonText';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';

class RootScreen extends React.PureComponent {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            drawerLockMode: 'locked-closed',
            header: screenProps.isAnon || false === screenProps.isLogged ? null : undefined,
            headerLeft: screenProps.isAnon || false === screenProps.isLogged ? null :
                <HeaderIconMenu onPress={() => navigation.navigate("DrawerToggle")} />,
            headerTitle: screenProps.isAnon || false === screenProps.isLogged ? null :
                <View style={styles.headerTitle}>
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
                </View>,
        };
    };

    render() {
        if (!this.props.isLogged || (!this.props.isAnon && true !== this.props.isMobileCheckedPass)) {
            return <View />
        }

        if (!this.props.isAnon) {
            return (
                <MngDashboardScreen {...this.props} />
            )
        }

        return <LoginScreen {...this.props} />
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
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
    },
});

export default connect(
    (state) => ({
        isAnon: isAnon(state),
        isLogged: isLogged(state),
        isManager: isManager(state),
        userProfile: userProfile(state),
        isMobileCheckedPass: isMobileCheckedPass(state)
    }),
    null
)(RootScreen);
