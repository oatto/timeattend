/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Card, CardItem, Body,  } from 'native-base';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import InitialValuesDateForm from '_features/common/containers/InitialValuesDateForm';
import MonthlyFilterForm, { NAME } from '_features/check-time/forms/MonthlyFilterForm';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import ApprovalList from '_features/common/components/ApprovalList';
import CommonText from "_features/common/components/CommonText";
import TakeLeaveListDetail from '_features/take-leave/components/TakeLeaveListDetail';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import themeVariables from '_theme';
import { getMngEmTakeLeaveRequestByUserAndRequested } from '../../redux/actions';
import { mngEmTakeLeaveByRequested } from '../../redux/selectors';

class Requested extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            monthlyFilter: {}
        };
    }

    componentDidMount() {
        this.props.resetForm(NAME);

        this.props.getMngEmTakeLeaveRequestByUserAndRequested.request({
            employeeId: this.props.employeeId,
            transition: STATE_REQUESTED_AND_REQUESTED_CANCEL
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
        this.props.getMngEmTakeLeaveRequestByUserAndRequested.refresh({
            employeeId: this.props.employeeId,
            transition: STATE_REQUESTED_AND_REQUESTED_CANCEL,
            monthlyFilter: this.state.monthlyFilter
        })
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngEmTakeLeaveByRequested;

        return (
            <Container iPhoneXSupport withBackground>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm
                                onSubmit={(values) => {
                                    this.setState({ monthlyFilter: values });
                                    this.props.getMngEmTakeLeaveRequestByUserAndRequested.request({
                                        employeeId: this.props.employeeId,
                                        transition: STATE_REQUESTED_AND_REQUESTED_CANCEL,
                                        monthlyFilter: values
                                    });
                                }}
                            />
                        </Body>
                    </CardItem>
                </Card>
                {isLoading
                    ? null :
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

                                this.props.getMngEmTakeLeaveRequestByUserAndRequested.loadmore({
                                    employeeId: this.props.employeeId,
                                    transition: STATE_REQUESTED_AND_REQUESTED_CANCEL,
                                    monthlyFilter: this.state.monthlyFilter
                                });
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

Requested.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired
};

export default connect(
    (state) => ({
        mngEmTakeLeaveByRequested: mngEmTakeLeaveByRequested(state),
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        getMngEmTakeLeaveRequestByUserAndRequested: bindActionCreators(getMngEmTakeLeaveRequestByUserAndRequested, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(Requested);
