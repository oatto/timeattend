/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Card, CardItem, Body } from 'native-base';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import { MonthlyFilterForm1, NAME } from '_features/check-time/forms/MonthlyFilterForm';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import themeVariables from '_theme';
import isEmpty from 'lodash/isEmpty';
import CheckInTransactionList from '../../components/CheckInTransactionList';
import { getCheckTimeTransactionsOutsideHistory as getCheckTimeTransactionsOutsideHistoryActions } from '../../redux/actions';
import {
    getCheckTimeTransactionsOutsideHistory,
    getCheckTimeTransactionsOutsideHistoryWithGroup
} from '../../redux/selectors';

class _checkTimeTransactionsOutside extends React.PureComponent {
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

        this.props.getCheckTimeTransactionsOutsideHistory.request({
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
        this.props.getCheckTimeTransactionsOutsideHistory.request({
            year: this.state.year ? this.state.year : this.props.year,
            month: this.state.month ? this.state.month : this.props.month
        })
    }

    render() {
        const { isRefreshing, isLoadingMore, isLoading, pagination } = this.props.checkTimeTransactionsOutsideHistory;
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
                                    this.props.getCheckTimeTransactionsOutsideHistory.request({
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
                    !isEmpty(this.props.checkTimeTransactionsOutsideHistoryWithGroup) ?
                        <InfinityScrollList
                            data={this.props.checkTimeTransactionsOutsideHistoryWithGroup}
                            keyExtractor={(item) => item.day.toString()}
                            loadingMore={isLoadingMore}
                            refreshing={isRefreshing}
                            renderItem={this._renderItem}
                            onRefresh={() => {
                                this.props.getCheckTimeTransactionsOutsideHistory.refresh({
                                    year: this.state.year ? this.state.year : this.props.year,
                                    month: this.state.month ? this.state.month : this.props.month
                                })}
                            }
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.getCheckTimeTransactionsOutsideHistory.loadmore({
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

_checkTimeTransactionsOutside.propTypes = {
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
        checkTimeTransactionsOutsideHistory: getCheckTimeTransactionsOutsideHistory(state),
        checkTimeTransactionsOutsideHistoryWithGroup: getCheckTimeTransactionsOutsideHistoryWithGroup(state),
    }),
    (dispatch) => ({
        getCheckTimeTransactionsOutsideHistory: bindActionCreators(getCheckTimeTransactionsOutsideHistoryActions, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch)
    })
)(_checkTimeTransactionsOutside);
