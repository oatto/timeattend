/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { Alert, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import ref from 'react-native-core/utils/ref';
import { Container, Content, Thumbnail, Left, Body, Right, Badge } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import forEach from 'lodash/forEach';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import themeVariables from '_theme';
import { logout } from '_features/user/redux/actions';
import CommonText from '_features/common/components/CommonText';
import Trans from '_features/common/containers/Trans';
import { DASHBOARD } from '_features/common/router';
import { CHECK_TIME_TRANSACTIONS_HISTORY } from '_features/check-time/router';
import { CHECK_TIME_ADJUSTMENT } from '_features/check-time-adjustment/router';
import { CHECK_TIME_OUTSIDE } from '_features/check-time-outside/router';
import { LOCATION } from '_features/location/router';
import { RECOMPENSE_WORKING } from '_features/recompense-working/router';
import { TAKE_LEAVE_REQUEST, SUMMARY_LIST_REQUEST } from '_features/take-leave/router';
import { MNG_MOBILE_ACCESS_APPROVAL } from '_features/mng-mobile-access-approval/router';
import { MNG_TAKE_LEAVE_APPROVAL } from '_features/mng-take-leave-approval/router';
import { MNG_CHECK_TIME_ADJUSTMENT } from '_features/mng-check-time-adjustment/router';
import { MNG_RECOMPENSE_WORKS } from '_features/mng-recompense-working/router';
import { MNG_MOBILE_DEVICES } from '_features/mng-core/router';
import { MNG_DASHBOARD } from '_features/mng-dashboard/router';
import { MNG_MY_EMPLOYEE_LIST_SCREEN } from '_features/mng-my-employee/router';
import { isManager, mngApprovalBadges } from '_features/mng-core/redux/selectors';
import { getAppVersion, getNotificationCenterBadge } from '_features/common/redux/selectors';
import { NOTIFICATION_TAKE_LEAVE_TYPE, NOTIFICATION_TIME_ADJUSTMENT_TYPE, NOTIFICATION_RECOMPENSE_WORK_TYPE, NOTIFICATION_DIRECT_MESSAGE_TYPE } from '_features/common/redux/constants';
import { PROFILE_LIST } from '_features/user/router';
import { userProfile, _userHasPermission } from '_features/user/redux/selectors';
import { APP_VERSION_TEXT } from '../../../common/constants';

// todo: check active menu if click home button from other screen
class Sidebar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            menuActive: 'home.title'
        };
    }

    _renderItem = ({item}) => {
        if (item.permission && !_userHasPermission(this.props.users, item.permission)) {
            return;
        }

        const isActive = this.state.menuActive === item.name;
        const colorActive = isActive ? themeVariables.white : themeVariables.primary;
        const badgeLabelColor = isActive ? themeVariables.primary : themeVariables.white;
        const isAndroid = themeVariables.platform === 'android';
        
        return (
            <TouchableOpacity
                style={[
                    styles.listItem,
                    {
                        borderBottomWidth: item.isLogout ? 0 : 1,
                        backgroundColor: isActive ? themeVariables.primary : themeVariables.white,
                    }
                ]}
                onPress={() => {
                    this.setState({menuActive: item.name});

                    if (item.isLogout) {
                        Alert.alert(
                            Trans.tran('logout.title'),
                            Trans.tran('logout.alert_text'),
                            [
                                {text: Trans.tran('general.accept'), onPress: () => this.props.logout.submit()},
                                {text: Trans.tran('general.cancel')}
                            ]
                        );

                        return;
                    }

                    this.props.NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: item.route,
                                params: item.params
                            })
                        ]
                    })
                }}
            >
                <Left sidebar>
                    <Icon
                        style={[styles.listItemIcon, {color: colorActive}]}
                        name={item.icon}
                    />
                </Left>
                <Body style={s.b__transparent} sidebar>
                    <Trans
                        t={`${item.name}`}
                        style={[styles.fontBase, s.ml2, {color: colorActive}]}
                        weight={isAndroid ? 'bold' : null}
                    />
                </Body>
                {
                    this.props.isManager ? (
                        item.badge && 0 < this.props.approvalBadges[item.badge] && (
                            <Right style={s.b__transparent} sidebar>
                                <Badge style={{backgroundColor: colorActive}}>
                                    <CommonText
                                        text={this.props.approvalBadges[item.badge]}
                                        style={{color: badgeLabelColor}}
                                        size={themeVariables.fs6}
                                    />
                                </Badge>
                            </Right>
                        )
                    ) :
                        !isEmpty(this.props.getNotificationCenterBadge) ?
                            has(this.props.getNotificationCenterBadge.badge, item.badge) ?
                                item.badge && 0 < this.props.getNotificationCenterBadge.badge[item.badge] && (
                                    <Right style={s.b__transparent} sidebar>
                                        <Badge style={{backgroundColor: colorActive}}>
                                            <CommonText
                                                text={this.props.getNotificationCenterBadge.badge[item.badge]}
                                                style={{color: badgeLabelColor}}
                                                size={themeVariables.fs6}
                                            />
                                        </Badge>
                                    </Right>
                                ) : null
                            : null
                }
            </TouchableOpacity>
        )
    };

    _renderMngMenus() {
        let render = [];
        const managerMenus = {
            'main': [
                {name: 'sidebar.mng.dashboard', icon: 'chart-bar', route: MNG_DASHBOARD},
                {name: 'sidebar.mng.my_employee', icon: 'user', route: MNG_MY_EMPLOYEE_LIST_SCREEN},
            ],
            'approval': [
                {
                    name: 'sidebar.mng.mobile_access_approval',
                    icon: 'mobile',
                    route: MNG_MOBILE_ACCESS_APPROVAL,
                    badge: 'mobile_access'
                },
                {
                    name: 'sidebar.mng.take_leave_approval',
                    icon: 'file-alt',
                    route: MNG_TAKE_LEAVE_APPROVAL,
                    badge: 'take_leave_request'
                },
                {
                    name: 'sidebar.mng.time_adjustment_approval',
                    icon: 'clock',
                    route: MNG_CHECK_TIME_ADJUSTMENT,
                    badge: 'time_adjustment'
                },
                {
                    name: 'sidebar.mng.recompense_approval',
                    icon: 'calendar',
                    route: MNG_RECOMPENSE_WORKS,
                    badge: 'recompense_work_request'
                },
            ],
            'system': [
                {name: 'sidebar.mng.mobile_devices', icon: 'mobile-alt', route: MNG_MOBILE_DEVICES},
            ],
        };

        forEach(managerMenus, (menu, type) => {
            render.push((
                <View key={type}>
                    {'main' !== type && (
                        <View style={s.pa2}>
                            <Trans
                                bold
                                t={`sidebar.mng.type.${type}`}
                            />
                        </View>
                    )}
                    <FlatList
                        data={menu}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            ));
        });

        return render.map((v) => v);
    }

    render() {
        const {first_name, last_name, employee_id, gender} = this.props.users;
        const profileImage = ref(this.props.users, '_links');

        const employeeMenus = [
            {name: 'home.title', icon: 'home', route: DASHBOARD},
            {name: 'check_time_history.title', icon: 'history', route: CHECK_TIME_TRANSACTIONS_HISTORY},
            {name: 'check_time_outside.title', icon: 'car-side', route: CHECK_TIME_OUTSIDE},
            {name: 'take_leave_request.title', icon: 'file-alt', route: TAKE_LEAVE_REQUEST, params: {isRootPage: true}, permission: 'take_leave', badge: NOTIFICATION_TAKE_LEAVE_TYPE},
            {name: 'time_adjustment.title', icon: 'clock', route: CHECK_TIME_ADJUSTMENT, params: {isRootPage: true}, permission: 'check_time_change', badge: NOTIFICATION_TIME_ADJUSTMENT_TYPE},
            {name: 'recompense_working.title', icon: 'calendar', route: RECOMPENSE_WORKING, badge: NOTIFICATION_RECOMPENSE_WORK_TYPE},
            {name: 'location.title', icon: 'map-marked-alt', route: LOCATION},
            {name: 'request_approval.title', icon: 'clipboard-list', route: SUMMARY_LIST_REQUEST},
            {name: 'user_profile.title', icon: 'user-circle', route: PROFILE_LIST, badge: NOTIFICATION_DIRECT_MESSAGE_TYPE},
            {name: 'logout.title', icon: 'sign-out-alt', route: null, isLogout: true}
        ];

        return (
            <Container>
                <TouchableOpacity
                    style={styles.info}
                    onPress={() => {
                        this.props.NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: PROFILE_LIST})
                            ]
                        })
                    }}
                >
                    <Thumbnail
                        source={
                            profileImage
                                ? {uri: profileImage.image.href}
                                : (gender === 'f'
                                    ? require('_public/images/user/user-girl-default.png')
                                    : require('_public/images/user/user-default.png')
                                )

                        }
                        style={styles.userThumb}
                    />
                    <CommonText
                        bold
                        text={first_name}
                        style={[styles.fontBase, s.f4]}
                    />
                    <CommonText
                        text={last_name}
                        style={[styles.fontBase, styles.textLeftMinus]}
                    />
                    <CommonText
                        text={`${Trans.tran('sidebar.employee_id')}: ${employee_id}`}
                        style={[styles.fontBase, s.f6]}
                    />
                </TouchableOpacity>
                <Content>
                    <FlatList
                        data={employeeMenus}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {this.props.isManager && (
                        <View>
                            <View style={[s.pa3, s.bg_warning]}>
                                <Trans
                                    bold
                                    t={'sidebar.mng.title'}
                                />
                            </View>
                            {this._renderMngMenus()}
                        </View>
                    )}
                </Content>
                <View style={styles.footer}>
                    <CommonText text={'3P Professional Co.,Ltd.'} style={styles.footerFont} />
                    <CommonText
                        thin
                        text={`version ${APP_VERSION_TEXT}`}
                        style={[styles.footerFont, styles.footerFontUpper]}
                    />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    info: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: themeVariables.sp3,
        paddingTop: themeVariables.isIphoneX ? themeVariables.sp4 : themeVariables.sp3,
        backgroundColor: themeVariables.white,
        borderBottomWidth: 1,
        borderBottomColor: themeVariables.grayLighter,
    },
    managerView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: themeVariables.grayLighter,
    },
    managerIcon: {
        width: 50,
        textAlign: 'right',
        fontSize: themeVariables.fs5,
        color: themeVariables.black,
    },
    textLeftMinus: {
        marginTop: -themeVariables.sp1,
        fontSize: themeVariables.fs6,
    },
    listItem: {
        flexDirection: 'row',
        marginLeft: themeVariables.sp0,
        paddingLeft: themeVariables.sp3 * 1.5,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: themeVariables.grayLighter,
        alignItems: 'center',
    },
    listItemIcon: {
        width: 35,
        color: themeVariables.primary,
        fontSize: themeVariables.fs4,
        textAlign: 'center',
    },
    footer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: themeVariables.sp2,
        paddingHorizontal: themeVariables.sp1,
        backgroundColor: themeVariables.grayLighter,
    },
    footerFont: {
        fontSize: themeVariables.fs7
    },
    footerFontUpper: {
        marginTop: -themeVariables.sp1
    },
    userThumb: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    fontBase: {
        color: themeVariables.primary,
        fontSize: themeVariables.fs5
    },
});

export default connect(
    (state) => ({
        users: userProfile(state),
        isManager: isManager(state),
        approvalBadges: mngApprovalBadges(state),
        appVersion: getAppVersion(state),
        getNotificationCenterBadge: getNotificationCenterBadge(state)
    }),
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        logout: bindActionCreators(logout, dispatch),
    })
)(Sidebar);