/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Container, View, Card, CardItem, Body } from 'native-base';
import PropTypes from 'prop-types';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import themeVariables from '_theme';
import ApprovalList from '_features/common/components/ApprovalList';
import { MonthlyFilterForm1, NAME } from '_features/check-time/forms/MonthlyFilterForm';
import MngRecompenseWorkingList from '_features/mng-recompense-working/components/MngRecompenseWorkingList';
import { fetchMngEmRecompenseWorkingApproved } from '_features/mng-em-recompense-working/redux/actions';
import { mngEmRecompenseWorkingApproved } from '_features/mng-em-recompense-working/redux/selectors';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import { MNG_EM_RECOMPENSE_WORKING_SHOW } from '../../router';

class _approved extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            monthlyFilter: {}
        }
    }

    componentDidMount() {
        this.props.resetForm(`${NAME}1`);
        this.props.fetchMngEmRecompenseWorkingApproved.request({employeeId: this.props.employeeId});
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
        this.props.fetchMngEmRecompenseWorkingApproved.refresh({
            employeeId: this.props.employeeId,
            monthlyFilter: this.state.monthlyFilter
        })
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.mngEmRecompenseWorkingApproved;

        return (
            <Container iPhoneXSupport withBackground>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm1
                                onSubmit={(values) => {
                                    this.setState({ monthlyFilter: values });
                                    this.props.fetchMngEmRecompenseWorkingApproved.request({
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

                                this.props.fetchMngEmRecompenseWorkingApproved.loadmore({
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

_approved.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default connect(
    (state) => ({
        mngEmRecompenseWorkingApproved: mngEmRecompenseWorkingApproved(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        fetchMngEmRecompenseWorkingApproved: bindActionCreators(fetchMngEmRecompenseWorkingApproved, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(_approved);
