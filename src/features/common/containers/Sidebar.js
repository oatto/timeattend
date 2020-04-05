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
import { LOCATION } from '_features/location/router';
import { MNG_MOBILE_ACCESS_APPROVAL } from '_features/mng-mobile-access-approval/router';
import { MNG_TAKE_LEAVE_APPROVAL } from '_features/mng-take-leave-approval/router';
import { MNG_CHECK_TIME_ADJUSTMENT } from '_features/mng-check-time-adjustment/router';
import { MNG_RECOMPENSE_WORKS } from '_features/mng-recompense-working/router';
import { MNG_MOBILE_DEVICES } from '_features/mng-core/router';
import { MNG_DASHBOARD } from '_features/mng-dashboard/router';
import { MNG_MY_EMPLOYEE_LIST_SCREEN } from '_features/mng-my-employee/router';
import { getAppVersion, getNotificationCenterBadge } from '_features/common/redux/selectors';
import { isManager, mngApprovalBadges } from '_features/mng-core/redux/selectors';
import { userProfile, _userHasPermission } from '_features/user/redux/selectors';
import { APP_VERSION_TEXT } from '../../../common/constants';

// todo: check active menu if click home button from other screen
class Sidebar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            menuActive: 'sidebar.mng.dashboard',
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
                {name: 'location.title', icon: 'map-marked-alt', route: LOCATION},
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
                {name: 'logout.title', icon: 'sign-out-alt', route: null, isLogout: true},

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

        return (
            <Container>
                <TouchableOpacity
                    style={styles.info}
                    disabled
                >
                    <Thumbnail
                        source={
                            profileImage
                                ? {uri: profileImage.image.href}
                                : (gender === 'f'
                                    ? require('_public/images/user/mng-user-girl-default.png')
                                    : require('_public/images/user/mng-user-default.png')
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
                    {this._renderMngMenus()}
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
