/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Container, View, Card, CardItem, Body } from 'native-base';
import PropTypes from 'prop-types';
import MonthlyFilterForm, { NAME } from '_features/check-time/forms/MonthlyFilterForm';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import themeVariables from '_theme';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import ApprovalList from '_features/common/components/ApprovalList';
import MngRecompenseWorkingList from '_features/mng-recompense-working/components/MngRecompenseWorkingList';
import { fetchMngEmRecompenseWorkingRequested } from '_features/mng-em-recompense-working/redux/actions';
import { mngEmRecompenseWorkingRequested } from '_features/mng-em-recompense-working/redux/selectors';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import { MNG_EM_RECOMPENSE_WORKING_SHOW } from '../../router';

class _requested extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            monthlyFilter: {}
        }
    }

    componentDidMount() {
        this.props.resetForm(NAME);
        this.props.fetchMngEmRecompenseWorkingRequested.request({
            employeeId: this.props.employeeId,
            transition: STATE_REQUESTED_AND_REQUESTED_CANCEL
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
        this.props.fetchMngEmRecompenseWorkingRequested.refresh({
            employeeId: this.props.employeeId,
            transition: STATE_REQUESTED_AND_REQUESTED_CANCEL,
            monthlyFilter: this.state.monthlyFilter
        })
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.mngEmRecompenseWorkingRequested;

        return (
            <Container iPhoneXSupport withBackground>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm
                                onSubmit={(values) => {
                                    this.setState({ monthlyFilter: values });
                                    this.props.fetchMngEmRecompenseWorkingRequested.request({
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

                                this.props.fetchMngEmRecompenseWorkingRequested.loadmore({
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

_requested.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default connect(
    (state) => ({
        mngEmRecompenseWorkingRequested: mngEmRecompenseWorkingRequested(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        fetchMngEmRecompenseWorkingRequested: bindActionCreators(fetchMngEmRecompenseWorkingRequested, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(_requested);
