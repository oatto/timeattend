import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, ListItem, Left, Button, Right, Body, Card, CardItem, Content, View } from 'native-base';
import { has } from 'lodash';
import { styles as s } from 'react-native-style-tachyons';
import PropTypes from 'prop-types';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';
import { NOTIFICATION_DIRECT_MESSAGE_TYPE } from '_features/common/redux/constants';
import HeaderTitle from '_features/common/components/HeaderTitle';
import { notificationGroupOriginIdList } from '_features/common/redux/selectors';
import { getNotificationCenterList } from '_features/common/redux/actions';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import { HOLIDAY, PROFILE, QR_PROFILE, PROFILE_INBOX_MESSAGE } from "_features/user/router";
import { CardAngleRightIcon, UserIcon, QRIcon, CalendarIcon, InboxIcon, NewReleasesIcon } from "../../common/components/icons/AppIcons";

class ProfileListScreen extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getNotificationCenterList.request({type: NOTIFICATION_DIRECT_MESSAGE_TYPE});
    }

    _renderList({onPress, icon, title, newMessage = false}) {
        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <ListItem
                            icon
                            onPress={onPress}
                            style={themeVariables.globalStyle.w100}
                        >
                            <Left>
                                <Button transparent>
                                    {icon}
                                </Button>
                            </Left>
                            <Body>
                                <View style={s.flx_row}>
                                    <Trans t={title} />
                                    {newMessage &&
                                    <View style={s.ml1}>
                                        <NewReleasesIcon size={themeVariables.ifs4} color={themeVariables.primary} />
                                    </View>
                                    }
                                </View>
                            </Body>
                            <Right>
                                <CardAngleRightIcon color={themeVariables.textColor} />
                            </Right>
                        </ListItem>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    render() {
        return (
            <Container>
                <Content>
                    <View padder>
                        {this._renderList({
                            onPress: () => {
                                this.props.navigation.navigate({
                                    routeName: PROFILE
                                })
                            },
                            icon: (<UserIcon color={themeVariables.textColor} />),
                            title: 'user.profile_list.title_data_account'
                        })}
                        {this._renderList({
                            onPress: () => {
                                this.props.navigation.navigate({
                                    routeName: PROFILE_INBOX_MESSAGE
                                })
                            },
                            icon: (<InboxIcon color={themeVariables.textColor} />),
                            title: 'user.profile_list.title_inbox_message',
                            newMessage: has(this.props.notificationGroupOriginIdList, NOTIFICATION_DIRECT_MESSAGE_TYPE)
                        })}
                        {this._renderList({
                            onPress: () => {
                                this.props.navigation.navigate({
                                    routeName: QR_PROFILE
                                })
                            },
                            icon: (<QRIcon color={themeVariables.textColor} />),
                            title: 'user.profile_list.title_my_qr_code'
                        })}
                        {this._renderList({
                            onPress: () => {
                                this.props.navigation.navigate({
                                    routeName: HOLIDAY
                                })
                            },
                            icon: (<CalendarIcon color={themeVariables.textColor} />),
                            title: 'user.profile_list.title_holiday_of_year'
                        })}
                    </View>
                </Content>
            </Container>
        )
    }
}

ProfileListScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    notificationGroupOriginIdList: PropTypes.object
};

ProfileListScreen.defaultProps = {
    notificationGroupOriginIdList: {}
};

ProfileListScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'user.profile_list.header_title_profile'} />,
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default connect(
    (state) => ({
        notificationGroupOriginIdList: notificationGroupOriginIdList(state)
    }),
    (dispatch) => ({
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch)
    })
)(ProfileListScreen);
