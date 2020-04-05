/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Card, CardItem, Body } from 'native-base';
import PropTypes from 'prop-types';
import themeVariables from '_theme';
import { MonthlyFilterForm1, NAME } from '_features/check-time/forms/MonthlyFilterForm';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import isEmpty from 'lodash/isEmpty';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import CheckInTransactionList from '_features/check-time/components/CheckInTransactionList';
import { getMngEmCheckTimeTransactionsOutsideHistory } from '../../redux/actions';
import {
    mngEmCheckTimeTransactionsOutsideHistory,
    mngEmCheckTimeTransactionsOutsideHistoryWithGroup
} from '../../redux/selectors';

class _mngEmCheckTimeTransactionsOutside extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            year: null,
            month: null,
        };

        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.resetForm(`${NAME}1`);

        this.props.getMngEmCheckTimeTransactionsOutsideHistory.request({
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
        this.props.getMngEmCheckTimeTransactionsOutsideHistory.request({
            employeeId: this.props.employeeId,
            year: this.state.year ? this.state.year : this.props.year,
            month: this.state.month ? this.state.month : this.props.month
        })
    }

    render() {
        const {isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngEmCheckTimeTransactionsOutsideHistory;
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
                            <MonthlyFilterForm1
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    this.props.getMngEmCheckTimeTransactionsOutsideHistory.request({
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
                    !isEmpty(this.props.mngEmCheckTimeTransactionsOutsideHistoryWithGroup) ?
                        <InfinityScrollList
                            data={this.props.mngEmCheckTimeTransactionsOutsideHistoryWithGroup}
                            keyExtractor={(item) => item.day.toString()}
                            loadingMore={isLoadingMore}
                            refreshing={isRefreshing}
                            renderItem={this._renderItem}
                            onRefresh={() => {
                                this.props.getMngEmCheckTimeTransactionsOutsideHistory.refresh({
                                    employeeId: this.props.employeeId,
                                    year: this.state.year ? this.state.year : this.props.year,
                                    month: this.state.month ? this.state.month : this.props.month
                                })
                            }}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.getMngEmCheckTimeTransactionsOutsideHistory.loadmore({
                                    employeeId: this.props.employeeId,
                                    year: this.state.year ? this.state.year : this.props.year,
                                    month: this.state.month ? this.state.month : this.props.month
                                });
                            }}
                        /> : <NoResult text={'general.no_result.no_check_time_outside'} onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

_mngEmCheckTimeTransactionsOutside.propTypes = {
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
        mngEmCheckTimeTransactionsOutsideHistory: mngEmCheckTimeTransactionsOutsideHistory(state),
        mngEmCheckTimeTransactionsOutsideHistoryWithGroup: mngEmCheckTimeTransactionsOutsideHistoryWithGroup(state)
    }),
    (dispatch) => ({
        getMngEmCheckTimeTransactionsOutsideHistory: bindActionCreators(getMngEmCheckTimeTransactionsOutsideHistory, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(_mngEmCheckTimeTransactionsOutside);
