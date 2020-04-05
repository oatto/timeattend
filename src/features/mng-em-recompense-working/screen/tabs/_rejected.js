/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Container, View, Card, CardItem, Body } from 'native-base';
import themeVariables from '_theme';
import PropTypes from 'prop-types';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import { MonthlyFilterForm2, NAME } from '_features/check-time/forms/MonthlyFilterForm';
import ApprovalList from '_features/common/components/ApprovalList';
import MngRecompenseWorkingList from '_features/mng-recompense-working/components/MngRecompenseWorkingList';
import { fetchMngEmRecompenseWorkingRejected } from '_features/mng-em-recompense-working/redux/actions';
import { STATE_REJECTED_AND_CANCELLED } from "_features/common/redux/constants";
import { mngEmRecompenseWorkingRejected } from '_features/mng-em-recompense-working/redux/selectors';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import { MNG_EM_RECOMPENSE_WORKING_SHOW } from '../../router';

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
        this.props.fetchMngEmRecompenseWorkingRejected.request({
            employeeId: this.props.employeeId,
            transition: STATE_REJECTED_AND_CANCELLED
        });
    }

    _renderItem = ({item}) => {
        return (
            <ApprovalList
                state={item.state}
                onPress={() => {
                    this.props.navigation.navigate({
                        routeName: MNG_EM_RECOMPENSE_WORKING_SHOW,
                        params: item
                    })
                }}
                detail={<MngRecompenseWorkingList item={item} />}
            />
        )
    };

    _onRefresh() {
        this.props.fetchMngEmRecompenseWorkingRejected.refresh({
            employeeId: this.props.employeeId,
            monthlyFilter: this.state.monthlyFilter,
            transition: STATE_REJECTED_AND_CANCELLED
        })
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.mngEmRecompenseWorkingRejected;

        return (
            <Container withBackground>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm2
                                onSubmit={(values) => {
                                    this.setState({ monthlyFilter: values });
                                    this.props.fetchMngEmRecompenseWorkingRejected.request({
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

                                this.props.fetchMngEmRecompenseWorkingRejected.loadmore({
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

_rejected.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default connect(
    (state) => ({
        mngEmRecompenseWorkingRejected: mngEmRecompenseWorkingRejected(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        fetchMngEmRecompenseWorkingRejected: bindActionCreators(fetchMngEmRecompenseWorkingRejected, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(_rejected);
