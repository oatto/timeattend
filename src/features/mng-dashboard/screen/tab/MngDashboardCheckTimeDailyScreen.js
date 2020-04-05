/* eslint-disable react/prop-types */
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import themeVariables from '_theme';
import { NavigationActions } from 'react-navigation';
import { Container, View, Content, Card, CardItem, Body } from 'native-base';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import CommonText from '_features/common/components/CommonText';
import Trans from '_features/common/containers/Trans';
import NoResult from '_features/common/components/NoResult';
import EmployeeSearchForm, { NAME }  from '_features/mng-core/forms/EmployeeSearchForm';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import MngCheckInList from "_features/mng-core/components/MngCheckInList";
import { getDepartments } from "_features/mng-core/redux/actions";
import { getMyEmployees } from "_features/mng-dashboard/redux/actions";
import { resetEmployeeFilterForm } from "_features/common/redux/actions";
import { getCheckedAndUnCheckedMyEmployee, myEmployees } from "_features/mng-dashboard/redux/selectors";
import { mngDepartmentsAsChoice, } from "_features/mng-core/redux/selectors";

class MngDashboardCheckTimeDailyScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            filter: 'all',
            searchValues: {}
        };

        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.resetForm(NAME);

        if (0 === this.props.departmentsChoice.length) {
            this.props.getDepartments.request();
        }

        this.props.getMyEmployees.request();
    }

    _renderFilter() {
        return ['all', 'checked', 'unchecked'].map((k) => {
            const filterStyles = [styles.summaryCol];
            if ('checked' === k) {
                filterStyles.push(styles.summaryMiddle)
            }
            if (k === this.state.filter) {
                filterStyles.push(styles.summaryColActive)
            }
            return (
                <TouchableOpacity
                    key={k}
                    onPress={() => this.setState({ filter: k })}
                    style={filterStyles}
                >
                    <CommonText text={this.props.checkedAndUnCheckedMyEmployee[k].length} size={themeVariables.fs3}/>
                    <CommonText text={Trans.tran(`mng.dashboard.filter.${k}`)} size={themeVariables.fs7}/>
                </TouchableOpacity>
            )
        })
    }

    _onRefresh() {
        this.props.getMyEmployees.request(this.state.searchValues)
    }

    _renderItem = ({ item }) => {
        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <MngCheckInList
                            employeeData={item}
                            onPress={() => this.props.navigation.navigate({
                                routeName: 'EMPLOYEE_MANAGEMENT_MENUS',
                                params: { data: item }
                            })}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    render() {
        const { isLoading } = this.props.myEmployees;
        const dataFilter = this.props.checkedAndUnCheckedMyEmployee[this.state.filter];

        return (
            <Container withBackground iPhoneXSupport>
                <View fill>
                    <Card withSpace style={themeVariables.globalStyle.flex0}>
                        <CardItem padder>
                            <Body>
                                <EmployeeSearchForm
                                    withDepartment
                                    departments={this.props.departmentsChoice}
                                    showClearButtonInner={false}
                                    onSubmit={(values) => {
                                        this.setState({ searchValues: values });
                                        this.props.getMyEmployees.request(values);
                                    }}
                                    allClear={() => {
                                        this.props.getMyEmployees.request()
                                    }}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                    <Content>
                        <Card withSpace style={themeVariables.globalStyle.flex0}>
                            <CardItem>
                                <Body>
                                    <View style={styles.headerContainer}>
                                        <CommonText
                                            text={Trans.tran('mng.dashboard.check_time_today')}
                                            color={themeVariables.textColor}
                                        />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        {this._renderFilter()}
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                        {isLoading
                            ? <View /> :
                            dataFilter.length ?
                                <FlatList
                                    data={dataFilter}
                                    renderItem={this._renderItem}
                                    keyExtractor={(item) => item.id.toString()}
                                /> : <NoResult onReload={this._onRefresh} />
                        }
                    </Content>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    summaryContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    summaryCol: {
        display: 'flex',
        alignItems: 'center',
        flexBasis: '33.33%',
        padding: themeVariables.sp2
    },
    summaryMiddle: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: themeVariables.grayLighter
    },
    summaryColActive: {
        borderBottomWidth: 3,
        borderBottomColor: themeVariables.brandPrimary
    },
    headerContainer: {
        backgroundColor: themeVariables.gray,
        padding: themeVariables.sp2,
        width: '100%'
    },
});

MngDashboardCheckTimeDailyScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerTitle: <HeaderTitle text={'mng.dashboard.title'} />,
});

export default connect(
    (state) => ({
        departmentsChoice: mngDepartmentsAsChoice(state),
        checkedAndUnCheckedMyEmployee: getCheckedAndUnCheckedMyEmployee(state),
        myEmployees: myEmployees(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        getDepartments: bindActionCreators(getDepartments, dispatch),
        getMyEmployees: bindActionCreators(getMyEmployees, dispatch),
        resetForm: bindActionCreators(resetEmployeeFilterForm, dispatch)
    })
)(MngDashboardCheckTimeDailyScreen);
