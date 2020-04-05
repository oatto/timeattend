/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Container, Card, CardItem, Body, View } from 'native-base';
import themeVariables from '_theme';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import MngEmployeeHeaderDetail from '_features/mng-core/components/MngEmployeeHeaderDetail';
import EmployeeSearchForm from '_features/mng-core/forms/EmployeeSearchForm';
import HeaderTitle from '_features/common/components/HeaderTitle';
import { EMPLOYEE_MANAGEMENT_MENUS } from '_features/mng-employee-management/router';
import { mngGetMyEmployees as mngGetMyEmployeesSelector } from '../redux/selectors';
import { mngGetMyEmployees } from '../redux/actions';
import NoResult from "../../common/components/NoResult";

class MyEmployeeListScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            searchValues: {}
        };
    }

    componentDidMount() {
        this.props.mngGetMyEmployees.request();
    }

    _renderItem = ({item}) => {
        return (
            <MngEmployeeHeaderDetail
                data={item}
                onPress={() => {
                    this.props.navigationActions.navigate({
                        routeName: EMPLOYEE_MANAGEMENT_MENUS,
                        params: {data: item}
                    })
                }}
            />
        )
    };

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.mngGetMyEmployeesSelector;

        return (
            <Container withBackground iPhoneXSupport>
                <View fill padder>
                    <Card withSpace style={themeVariables.globalStyle.flex0}>
                        <CardItem>
                            <Body>
                                <EmployeeSearchForm
                                    onSubmit={(values) => {
                                        this.setState({searchValues: values});
                                        this.props.mngGetMyEmployees.request(values);
                                    }}
                                />
                            </Body>
                        </CardItem>
                    </Card>

                    {isLoading
                        ? <View /> :
                        data.length ?
                            <InfinityScrollList
                                data={data}
                                loadingMore={isLoadingMore}
                                refreshing={isRefreshing}
                                renderItem={this._renderItem}
                                onRefresh={() => {
                                    this.props.mngGetMyEmployees.refresh(this.state.searchValues)
                                }}
                                onLoadMore={() => {
                                    if (!pagination.hasNextPage) {
                                        return;
                                    }

                                    this.props.mngGetMyEmployees.loadmore(this.state.searchValues);
                                }}
                            /> : <NoResult />
                    }
                </View>
            </Container>
        );
    }
}

MyEmployeeListScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerTitle: <HeaderTitle text={'mng.my_employee.title'} />,
});

export default connect(
    (state) => ({
        mngGetMyEmployeesSelector: mngGetMyEmployeesSelector(state),
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        mngGetMyEmployees: bindActionCreators(mngGetMyEmployees, dispatch),
    })
)(MyEmployeeListScreen);
