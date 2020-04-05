/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Card, CardItem, Body } from 'native-base';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import MonthlyFilterForm, { NAME } from '_features/check-time/forms/MonthlyFilterForm';
import { resetMonthlyFilterForm } from '_features/common/redux/actions';
import themeVariables from '_theme';
import isEmpty from 'lodash/isEmpty';
import CheckInTransactionList from '../../components/CheckInTransactionList';
import { getCheckTimeTransactionsDailyHistory as getCheckTimeTransactionsDailyHistoryActions } from '../../redux/actions';
import {
    getCheckTimeTransactionsDailyHistory,
    getCheckTimeTransactionsDailyHistoryWithGroup
} from '../../redux/selectors';

class _checkTimeTransactionsDaily extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            year: null,
            month: null,
        };

        this._onRefresh = this._onRefresh.bind(this);
        this._onReload = this._onReload.bind(this);
        this._onLoadMore = this._onLoadMore.bind(this);
    }

    componentDidMount() {
        this.props.resetForm(NAME);

        this.props.getCheckTimeTransactionDailyHistory.request({
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
        this.props.getCheckTimeTransactionDailyHistory.refresh({
            year: this.state.year ? this.state.year : this.props.year,
            month: this.state.month ? this.state.month : this.props.month
        })
    }

    _onReload() {
        this.props.getCheckTimeTransactionDailyHistory.request({
            year: this.state.year ? this.state.year : this.props.year,
            month: this.state.month ? this.state.month : this.props.month
        })
    }

    _onLoadMore() {
        this.props.getCheckTimeTransactionDailyHistory.loadmore({
            year: this.state.year ? this.state.year : this.props.year,
            month: this.state.month ? this.state.month : this.props.month
        });
    }

    render() {
        const {isRefreshing, isLoadingMore, isLoading, pagination} = this.props.checkTimeTransactionsDailyHistory;
        const d = new Date();
        const month = d.getMonth() + 1;
        const initialValues = {
            year: d.getFullYear().toString(),
            month: month > 9 ? month.toString() : '0' + month.toString(),
        };

        return (
            <Container withBackground iPhoneXPadder>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    this.props.getCheckTimeTransactionDailyHistory.request({
                                        year: values.year,
                                        month: values.month,
                                    });

                                    this.setState({
                                        month: values.month,
                                        year: values.year,
                                    });
                                }}
                            />
                        </Body>
                    </CardItem>
                </Card>
                {isLoading
                    ? null :
                    !isEmpty(this.props.checkTimeTransactionsDailyHistoryWithGroup) ?
                        <InfinityScrollList
                            data={this.props.checkTimeTransactionsDailyHistoryWithGroup}
                            keyExtractor={(item) => item.day.toString()}
                            loadingMore={isLoadingMore}
                            refreshing={isRefreshing}
                            renderItem={this._renderItem}
                            onRefresh={this._onRefresh}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this._onLoadMore();
                            }}
                        /> : <NoResult text={'general.no_result.no_check_time_daily'} onReload={this._onReload} />
                }
            </Container>
        )
    }
}

_checkTimeTransactionsDaily.propTypes = {
    month: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    year: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default connect(
    (state) => ({
        checkTimeTransactionsDailyHistory: getCheckTimeTransactionsDailyHistory(state),
        checkTimeTransactionsDailyHistoryWithGroup: getCheckTimeTransactionsDailyHistoryWithGroup(state),
    }),
    (dispatch) => ({
        getCheckTimeTransactionDailyHistory: bindActionCreators(getCheckTimeTransactionsDailyHistoryActions, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch)
    })
)(_checkTimeTransactionsDaily);
