/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Card, CardItem, Body } from 'native-base';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList';
import CommonText from "_features/common/components/CommonText";
import TakeLeaveListDetail from '_features/take-leave/components/TakeLeaveListDetail';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import themeVariables from '_theme';
import { MonthlyFilterForm1, NAME } from '_features/check-time/forms/MonthlyFilterForm';
import { getMngEmTakeLeaveRequestByUserAndApproved } from '../../redux/actions';
import { mngEmTakeLeaveRequestByApproved } from '../../redux/selectors';

class Approved extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            monthlyFilter: {}
        };
    }

    componentDidMount() {
        this.props.resetForm(`${NAME}1`);
        this.props.getMngEmTakeLeaveRequestByUserAndApproved.request({ employeeId: this.props.employeeId });
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
        this.props.getMngEmTakeLeaveRequestByUserAndApproved.refresh({
            employeeId: this.props.employeeId,
            monthlyFilter: this.state.monthlyFilter
        })
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngEmTakeLeaveRequestByApproved;

        return (
            <Container iPhoneXSupport withBackground>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm1
                                onSubmit={(values) => {
                                    this.setState({ monthlyFilter: values });
                                    this.props.getMngEmTakeLeaveRequestByUserAndApproved.request({
                                        employeeId: this.props.employeeId,
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

                                this.props.getMngEmTakeLeaveRequestByUserAndApproved.loadmore({
                                    employeeId: this.props.employeeId,
                                    monthlyFilter: this.state.monthlyFilter
                                });
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

Approved.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired
};

export default connect(
    (state) => ({
        mngEmTakeLeaveRequestByApproved: mngEmTakeLeaveRequestByApproved(state),
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        getMngEmTakeLeaveRequestByUserAndApproved: bindActionCreators(getMngEmTakeLeaveRequestByUserAndApproved, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(Approved);
