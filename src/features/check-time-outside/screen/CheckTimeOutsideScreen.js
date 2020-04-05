/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList } from 'react-native';
import { Container, Content, View, Card, CardItem } from 'native-base';
import themeVariables from '_theme';
import moment from '_utils/moment';
import NoResult from '_features/common/components/NoResult';
import CheckInDetail from '_features/check-time/components/CheckInDetail';
import HeaderMainDataUser from "_features/common/components/HeaderMainDataUser";
import {CheckInIcons} from "_features/common/components/icons/CheckInIcons";
import {CheckOutIcons} from "_features/common/components/icons/CheckOutIcons";
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderIconMenu from "_features/common/components/HeaderIconMenu";
import ButtonFixedFooter from "_features/common/components/ButtonFixedFooter";
import { userProfile } from "_features/user/redux/selectors";
import { CHECK_TIME_TYPE } from '_features/check-time/router';
import { fetchOutsideCheckTimeTransaction } from '../redux/actions';
import { checkTimeOutsideTransaction } from '../redux/selectors';

class CheckTimeOutsideScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.fetchTransaction.request();
    }

    drawerOpen = () => {
        this.props.navigation.navigate('DrawerOpen');
    };

    chooseTypeCheckTime(type) {
        this.props.navigation.navigate({
            routeName: CHECK_TIME_TYPE,
            params: {
                typeName: 'outside',
                typeValue: type,
            }
        })
    };

    _renderItem = ({item}) => {
        return (
            <Card withSpace>
                <CardItem>
                    <CheckInDetail
                        type={item.type}
                        place={item.place.name}
                        placeType={item.place.type}
                        time={moment(item.checked_at).format('HH:mm')}
                    />
                </CardItem>
            </Card>
        )
    };

    _onRefresh() {
        this.props.fetchTransaction.request()
    }

    render() {
        const transactions = this.props.transaction;

        return (
            <Container withBackground>
                <HeaderMainDataUser
                    user={this.props.userProfile}
                    onPressHeaderLeft={this.drawerOpen}
                    titlePage={'check_time_outside.title'}
                />
                <Content>
                    {!isEmpty(transactions)
                        ?
                            <View padder>
                                <FlatList
                                    data={transactions}
                                    renderItem={this._renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        :
                            <NoResult
                                text={'general.no_result.no_check_time_outside'}
                                onReload={this._onRefresh}
                            />
                    }
                </Content>
                <ButtonFixedFooter
                    leftBtn={{
                        btnProps: {
                            onPress: this.chooseTypeCheckTime.bind(this, 'check-in'),
                        },
                        icon: <CheckInIcons buttonFooter />,
                        label: 'dashboard.title_button_check_in',
                    }}
                    rightBtn={{
                        btnProps: {
                            onPress: this.chooseTypeCheckTime.bind(this, 'check-out')
                        },
                        icon: <CheckOutIcons buttonFooter />,
                        label: 'dashboard.title_button_check_out'
                    }}
                />
            </Container>
        )
    }
}

CheckTimeOutsideScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

CheckTimeOutsideScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle text={'check_time_outside.title'} />,
    headerLeft: <HeaderIconMenu onPress={()=> navigation.navigate('DrawerOpen')} />,
    headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: themeVariables.primary
    }
});

export default connect(
    (state) => ({
        userProfile: userProfile(state),
        transaction: checkTimeOutsideTransaction(state)
    }),
    (dispatch) => ({
        fetchTransaction: bindActionCreators(fetchOutsideCheckTimeTransaction, dispatch)
    })
)(CheckTimeOutsideScreen);
