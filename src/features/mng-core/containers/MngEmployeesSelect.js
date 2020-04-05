/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Body, Card, CardItem, Container, View } from 'native-base';
import PropTypes from 'prop-types';
import themeVariables from "_theme";
import { bindActionCreators } from 'redux';
import includes from "lodash/includes";
import { NavigationActions } from "react-navigation";
import InfinityScrollList from "react-native-core/features/common/components/InfinityScrollList";
import EmployeeSearchForm from "../forms/EmployeeSearchForm";
import MngEmployeeHeaderDetail from "../components/MngEmployeeHeaderDetail";
import NoResult from "../../common/components/NoResult";
import { mngGetMyEmployees as mngGetMyEmployeesSelector } from "../../mng-my-employee/redux/selectors";
import { mngGetMyEmployees } from "../../mng-my-employee/redux/actions";

class MngEmployeesSelect extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            searchValues: {}
        };
    }

    componentDidMount() {
        this.props.mngGetMyEmployees.request();
    }

    _insertOrDeleteEmployee = (employeeId) => {
        const employees = [...this.state.employees];
        const employeeIdIndex = employees.indexOf(employeeId);

        if (-1 === employeeIdIndex) {
            employees.push(employeeId);
        } else {
            employees.splice(employeeIdIndex, 1);
        }

        this.setState({employees});

        this.props.onChange(employees);
    };

    _renderItem = ({item}) => {
        return (
            <MngEmployeeHeaderDetail
                data={item}
                active={includes(this.state.employees, item.id)}
                onPress={() => {
                    this._insertOrDeleteEmployee(item.id)
                }}
            />
        )
    };

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngGetMyEmployeesSelector;

        return (
            <Container withBackground>
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
                                keyExtractor={(item, index) => index.toString()}
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
                {isLoading || 0 === data.length || 0 === this.state.employees.length
                    ? <View /> :
                    this.props.submitButton
                }
            </Container>
        );
    }
}

MngEmployeesSelect.propTypes = {
    submitButton: PropTypes.element.isRequired,
    onChange: PropTypes.func.isRequired
};

export default connect(
    (state) => ({
        mngGetMyEmployeesSelector: mngGetMyEmployeesSelector(state),
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        mngGetMyEmployees: bindActionCreators(mngGetMyEmployees, dispatch),
    })
)(MngEmployeesSelect);
