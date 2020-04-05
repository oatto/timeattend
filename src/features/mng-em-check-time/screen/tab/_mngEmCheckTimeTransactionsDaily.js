/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Card, CardItem, Body } from 'native-base';
import PropTypes from 'prop-types';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import themeVariables from '_theme';
import MonthlyFilterForm, { NAME } from '_features/check-time/forms/MonthlyFilterForm';
import NoResult from '_features/common/components/NoResult';
import isEmpty from 'lodash/isEmpty';
import CheckInTransactionList from '_features/check-time/components/CheckInTransactionList';
import { resetMonthlyFilterForm } from '_features/common/redux/actions';
import { getMngEmCheckTimeTransactionsDailyHistory } from '../../redux/actions';
import {
    mngEmCheckTimeTransactionsDailyHistory,
    mngEmCheckTimeTransactionsDailyHistoryWithGroup
} from '../../redux/selectors';

class _mngEmCheckTimeTransactionsDaily extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            year: null,
            month: null,
        };

        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.resetForm(NAME);

        this.props.getMngEmCheckTimeTransactionsDailyHistory.request({
            employeeId: this.props.employeeId,
            year: this.props.year,
            month: this.props.month
        });
    }

    _renderItem = ({item}) => {
        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <CheckInTransactionList item={item} />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    _onRefresh() {
        this.props.getMngEmCheckTimeTransactionsDailyHistory.request({
            employeeId: this.props.employeeId,
            year: this.state.year ? this.state.year : this.props.year,
            month: this.state.month ? this.state.month : this.props.month
        })
    }

    render() {
        const {isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngEmCheckTimeTransactionsDailyHistory;
        const d = new Date();
        const month = d.getMonth() + 1;
        const initialValues = {
            year: d.getFullYear().toString(),
            month: month > 9 ? month.toString() : '0' + month.toString(),
        };

        return (
            <Container withBackground>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    this.props.getMngEmCheckTimeTransactionsDailyHistory.request({
                                        employeeId: this.props.employeeId,
                                        year: values.year,
                                        month: values.month,
                                    });

                                    this.setState({
                                        year: values.year,
                                        month: values.month,
                                    })
                                }}
                            />
                        </Body>
                    </CardItem>
                </Card>
                {isLoading
                    ? null :
                    !isEmpty(this.props.mngEmCheckTimeTransactionsDailyHistoryWithGroup) ?
                        <InfinityScrollList
                            data={this.props.mngEmCheckTimeTransactionsDailyHistoryWithGroup}
                            keyExtractor={(item) => item.day.toString()}
                            loadingMore={isLoadingMore}
                            refreshing={isRefreshing}
                            renderItem={this._renderItem}
                            onRefresh={() => {
                                this.props.getMngEmCheckTimeTransactionsDailyHistory.refresh({
                                    employeeId: this.props.employeeId,
                                    year: this.state.year ? this.state.year : this.props.year,
                                    month: this.state.month ? this.state.month : this.props.month
                                })
                            }}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.getMngEmCheckTimeTransactionsDailyHistory.loadmore({
                                    employeeId: this.props.employeeId,
                                    year: this.state.year ? this.state.year : this.props.year,
                                    month: this.state.month ? this.state.month : this.props.month
                                });
                            }}
                        /> : <NoResult text={'general.no_result.no_check_time_daily'} onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

_mngEmCheckTimeTransactionsDaily.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    month: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    year: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired
};

export default connect(
    (state) => ({
        mngEmCheckTimeTransactionsDailyHistory: mngEmCheckTimeTransactionsDailyHistory(state),
        mngEmCheckTimeTransactionsDailyHistoryWithGroup: mngEmCheckTimeTransactionsDailyHistoryWithGroup(state)
    }),
    (dispatch) => ({
        getMngEmCheckTimeTransactionsDailyHistory: bindActionCreators(getMngEmCheckTimeTransactionsDailyHistory, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(_mngEmCheckTimeTransactionsDaily);
