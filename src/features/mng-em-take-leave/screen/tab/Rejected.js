/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Container, Card, CardItem, Body } from 'native-base';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList';
import { MonthlyFilterForm2, NAME } from '_features/check-time/forms/MonthlyFilterForm';
import CommonText from "_features/common/components/CommonText";
import { STATE_REJECTED_AND_CANCELLED } from "_features/common/redux/constants";
import TakeLeaveListDetail from '_features/take-leave/components/TakeLeaveListDetail';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import themeVariables from '_theme';
import { getMngEmTakeLeaveRequestByUserAndRejected } from '../../redux/actions';
import { mngEmTakeLeaveRequestByRejected } from '../../redux/selectors';

class Rejected extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            monthlyFilter: {}
        };
    }

    componentDidMount() {
        this.props.resetForm(`${NAME}2`);
        this.props.getMngEmTakeLeaveRequestByUserAndRejected.request({
            employeeId: this.props.employeeId,
            transition: STATE_REJECTED_AND_CANCELLED
        });
    }

    _renderItem = ({item}) => {
        return (
            <ApprovalList
                state={item.state}
                onPress={() => this.props.navigationActions.navigate({
                    routeName: 'MNG_EM_TAKE_LEAVE_SHOW',
                    params: item
                })}
                header={<CommonText text={item.company_take_leave_setting.type_name} color={themeVariables.white} />}
                detail={<TakeLeaveListDetail data={item} />}
            />
        );
    };

    _onRefresh() {
        this.props.getMngEmTakeLeaveRequestByUserAndRejected.refresh({
            employeeId: this.props.employeeId,
            monthlyFilter: this.state.monthlyFilter,
            transition: STATE_REJECTED_AND_CANCELLED
        })
    }

    render () {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.mngEmTakeLeaveRequestByRejected;

        return (
            <Container iPhoneXSupport withBackground>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm2
                                onSubmit={(values) => {
                                    this.setState({ monthlyFilter: values });
                                    this.props.getMngEmTakeLeaveRequestByUserAndRejected.request({
                                        employeeId: this.props.employeeId,
                                        monthlyFilter: values,
                                        transition: STATE_REJECTED_AND_CANCELLED
                                    });
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
                            onRefresh={this._onRefresh}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.getMngEmTakeLeaveRequestByUserAndRejected.loadmore({
                                    employeeId: this.props.employeeId,
                                    monthlyFilter: this.state.monthlyFilter,
                                    transition: STATE_REJECTED_AND_CANCELLED
                                });
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

Rejected.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default connect(
    (state) => ({
        mngEmTakeLeaveRequestByRejected: mngEmTakeLeaveRequestByRejected(state)
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        getMngEmTakeLeaveRequestByUserAndRejected: bindActionCreators(getMngEmTakeLeaveRequestByUserAndRejected, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(Rejected);
