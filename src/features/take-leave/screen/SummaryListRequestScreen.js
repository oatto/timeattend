/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { Container, ListItem, Left, Right, Body, Button, Content, Card, CardItem, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import HeaderTitle from "_features/common/components/HeaderTitle";
import { TimeAdjustmentIcon, TakeLeaveIcon, CardAngleRightIcon } from "_features/common/components/icons/AppIcons";
import NoResult from "_features/common/components/NoResult";
import Trans from "_features/common/containers/Trans";
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import { CHECK_TIME_ADJUSTMENT } from "_features/check-time-adjustment/router";
import { TAKE_LEAVE_REQUEST } from "_features/take-leave/router";
import { _userHasPermission, userHasPermission, userProfile } from "_features/user/redux/selectors";

class SummaryListRequestScreen extends React.PureComponent {
    _renderItem = ({item}) => {
        if (item.permission && !_userHasPermission(this.props.user, item.permission)) {
            return;
        }

        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <ListItem
                            thumbnail
                            onPress={item.onPress}
                            style={themeVariables.globalStyle.w100}
                        >
                            <Left>
                                <Button transparent>
                                    {item.icon}
                                </Button>
                            </Left>
                            <Body>
                                <Trans
                                    bold
                                    t={item.title}
                                />
                                <Trans
                                    style={s.f5}
                                    t={item.content}
                                />
                            </Body>
                            <Right>
                                <CardAngleRightIcon color={themeVariables.textColor} />
                            </Right>
                        </ListItem>
                    </Body>
                </CardItem>
            </Card>
        )
    };

    _keyExtractor = (item, index) => index.toString();

    render() {
        const dataItem = [
            {
                title: 'take_leave_summary.summary_record_edit_time',
                content: 'take_leave_summary.history_record_edit_time',
                icon: <TimeAdjustmentIcon size={themeVariables.fs4} color={themeVariables.black} />,
                onPress: () => {
                    this.props.navigation.navigate({
                        routeName: CHECK_TIME_ADJUSTMENT,
                        params: {isRootPage: false}
                    })
                },
                permission: 'check_time_change'
            },
            {
                title: 'take_leave_summary.summary_list',
                content: 'take_leave_summary.approval_list',
                icon: <TakeLeaveIcon size={themeVariables.fs4} color={themeVariables.black} />,
                onPress: () => {
                    this.props.navigation.navigate({
                        routeName: TAKE_LEAVE_REQUEST,
                        params: {isRootPage: false}
                    })
                },
                permission: 'take_leave'
            },
        ];

        return (
            <Container>
                <Content scrollEnabled={false}>
                    <View padder>
                        <FlatList
                            data={dataItem}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                        />
                        {!this.props.canTakeLeave && !this.props.canTimeAdjustment ?
                            <View style={styles.noResultView}>
                                <NoResult text={'take_leave_summary.no_result'} />
                            </View>
                            : null
                        }
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    noResultView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: themeVariables.sp3,
    }
});

SummaryListRequestScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

SummaryListRequestScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'take_leave_summary.title'} />,
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default connect(
    (state) => ({
        user: userProfile(state),
        canTakeLeave: userHasPermission(state, 'take_leave'),
        canTimeAdjustment: userHasPermission(state, 'check_time_change'),
    })
)(SummaryListRequestScreen);
