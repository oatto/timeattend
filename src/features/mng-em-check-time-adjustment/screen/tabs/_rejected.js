/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Card, CardItem, Body, View } from 'native-base';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import themeVariables from '_theme';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import { MonthlyFilterForm2, NAME } from '_features/check-time/forms/MonthlyFilterForm';
import { fetchMngEmCheckTimeAdjustmentRejected } from '_features/mng-em-check-time-adjustment/redux/actions';
import { mngEmCheckTimeAdjustmentRejected } from '_features/mng-em-check-time-adjustment/redux/selectors';
import CheckTimeAdjustmentList from "_features/check-time-adjustment/components/CheckTimeAdjustmentList";
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import { MNG_EM_CHECK_TIME_ADJUSTMENT_SHOW } from '../../router';

class _rejected extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            monthlyFilter: {}
        }
    }

    componentDidMount() {
        this.props.resetForm(`${NAME}2`);
        this.props.fetchMngEmCheckTimeAdjustmentRejected.request({employeeId: this.props.employeeId});
    }

    _onRefresh() {
        this.props.fetchMngEmCheckTimeAdjustmentRejected.refresh({
            employeeId: this.props.employeeId,
            monthlyFilter: this.state.monthlyFilter
        })
    }

    _renderItem = ({item}) => {
        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <CheckTimeAdjustmentList
                            data={item}
                            onPress={() => {
                                this.props.navigation.navigate({
                                    routeName: MNG_EM_CHECK_TIME_ADJUSTMENT_SHOW,
                                    params: item
                                })
                            }}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.mngEmCheckTimeAdjustmentRejected;

        return (
            <Container withBackground>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm2
                                onSubmit={(values) => {
                                    this.setState({ monthlyFilter: values });
                                    this.props.fetchMngEmCheckTimeAdjustmentRejected.request({
                                        employeeId: this.props.employeeId,
                                        monthlyFilter: values
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

                                this.props.fetchMngEmCheckTimeAdjustmentRejected.loadmore({
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

_rejected.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default connect(
    (state) => ({
        mngEmCheckTimeAdjustmentRejected: mngEmCheckTimeAdjustmentRejected(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        fetchMngEmCheckTimeAdjustmentRejected: bindActionCreators(fetchMngEmCheckTimeAdjustmentRejected, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(_rejected);
