/* eslint-disable react/prop-types */
import React from 'react';
import themeVariables from '_theme';
import moment from '_utils/moment';
import isEmpty from 'lodash/isEmpty';
import { NavigationActions } from 'react-navigation';
import { Container, View, Card, CardItem, Body } from 'native-base';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import HeaderTitle from '_features/common/components/HeaderTitle';
import NoResult from '_features/common/components/NoResult';
import { EmployeeSearchForm1, NAME } from '_features/mng-core/forms/EmployeeSearchForm';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import MngCheckInTransactionList from "_features/mng-dashboard/components/MngCheckInTransactionList";
import { getDepartments } from "_features/mng-core/redux/actions";
import { resetEmployeeFilterForm } from '_features/common/redux/actions';
import { getMyEmployeeCheckTimeOutside } from "_features/mng-dashboard/redux/actions";
import { getMyEmployeesCheckTimeTransactionsOutsideHistory, getMyEmployeesCheckTimeTransactionsOutsideHistoryWithGroup } from "_features/mng-dashboard/redux/selectors";
import { mngDepartmentsAsChoice, } from "_features/mng-core/redux/selectors";

class MngDashboardCheckTimeOutsideScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        const date = moment();
        const y = date.format('YYYY');
        const m = date.format('MM');
        const d = date.format('DD');

        this.state = {
            searchValues: {},
            today: {
                y: y,
                m: m,
                d: d
            }
        };

        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.resetForm(`${NAME}1`);

        if (0 === this.props.departmentsChoice.length) {
            this.props.getDepartments.request();
        }

        this.props.getMyEmployeeCheckTimeOutside.request({ today: this.state.today });
    }

    _onRefresh() {
        this.props.getMyEmployeeCheckTimeOutside.request({
            today: this.state.today,
            searchValues: this.state.searchValues
        })
    }

    _renderItem = ({ item }) => {
        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <MngCheckInTransactionList
                            item={item}
                            onPress={() => this.props.navigation.navigate({
                                routeName: 'EMPLOYEE_MANAGEMENT_MENUS',
                                params: { data: item.data[0].employee }
                            })}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    render() {
        const { isRefreshing, isLoadingMore, isLoading, pagination } = this.props.getMyEmployeesCheckTimeTransactionsOutsideHistory;

        return (
            <Container withBackground iPhoneXSupport>
                <View fill>
                    <Card withSpace style={themeVariables.globalStyle.flex0}>
                        <CardItem>
                            <Body>
                                <EmployeeSearchForm1
                                    onSubmit={(values) => {
                                        this.setState({ searchValues: values });
                                        this.props.getMyEmployeeCheckTimeOutside.request({
                                            today: this.state.today,
                                            searchValues: values
                                        });
                                    }}
                                    allClear={() => {
                                        this.props.getMyEmployeeCheckTimeOutside.request({
                                            today: this.state.today
                                        })
                                    }}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                    {isLoading
                        ? null :
                        !isEmpty(this.props.getMyEmployeesCheckTimeTransactionsOutsideHistoryWithGroup) ?
                            <InfinityScrollList
                                data={this.props.getMyEmployeesCheckTimeTransactionsOutsideHistoryWithGroup}
                                keyExtractor={(item) => item.employeeId.toString()}
                                loadingMore={isLoadingMore}
                                refreshing={isRefreshing}
                                renderItem={this._renderItem}
                                onRefresh={() => {
                                    this.props.getMyEmployeeCheckTimeOutside.refresh({
                                        today: this.state.today
                                    })}
                                }
                                onLoadMore={() => {
                                    if (!pagination.hasNextPage) {
                                        return;
                                    }

                                    this.props.getMyEmployeeCheckTimeOutside.loadmore({
                                        today: this.state.today
                                    });
                                }}
                            /> : <NoResult text={'general.no_result.no_check_time_outside'} onReload={this._onRefresh} />
                    }
                </View>
            </Container>
        )
    }
}

MngDashboardCheckTimeOutsideScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerTitle: <HeaderTitle text={'mng.dashboard.title'} />,
});

export default connect(
    (state) => ({
        departmentsChoice: mngDepartmentsAsChoice(state),
        getMyEmployeesCheckTimeTransactionsOutsideHistory: getMyEmployeesCheckTimeTransactionsOutsideHistory(state),
        getMyEmployeesCheckTimeTransactionsOutsideHistoryWithGroup: getMyEmployeesCheckTimeTransactionsOutsideHistoryWithGroup(state),
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        getDepartments: bindActionCreators(getDepartments, dispatch),
        getMyEmployeeCheckTimeOutside: bindActionCreators(getMyEmployeeCheckTimeOutside, dispatch),
        resetForm: bindActionCreators(resetEmployeeFilterForm, dispatch)
    })
)(MngDashboardCheckTimeOutsideScreen);
