/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from 'native-base';
import { NavigationActions } from 'react-navigation';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList';
import { userProfile } from "_features/user/redux/selectors";
import themeVariables from '_theme';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import { getTakeLeaveRequestByRequested } from '_features/take-leave/redux/actions';
import { takeLeaveRequestByRequested } from '_features/take-leave/redux/selectors';
import TakeLeaveListDetail from '../../components/TakeLeaveListDetail';
import { TAKE_LEAVE_DETAIL } from '../../router';
import CommonText from "../../../common/components/CommonText";

class _requested extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.getTakeLeaveRequests.request(STATE_REQUESTED_AND_REQUESTED_CANCEL);
    }

    _renderItem = ({item}) => {
        return (
            <ApprovalList
                state={item.state}
                onPress={() => {
                    this.props.navigationActions.navigate({
                        routeName: TAKE_LEAVE_DETAIL,
                        params: item
                    })
                }}
                header={<CommonText text={item.company_take_leave_setting.type_name} color={themeVariables.white} />}
                detail={<TakeLeaveListDetail data={item} />}
            />
        );
    };

    _onRefresh() {
        this.props.getTakeLeaveRequests.refresh(STATE_REQUESTED_AND_REQUESTED_CANCEL)
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.takeLeaveRequests;
        return (
            <View fill>
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

                                this.props.getTakeLeaveRequests.loadmore(STATE_REQUESTED_AND_REQUESTED_CANCEL);
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </View>
        )
    }
}

export default connect(
    (state) => ({
        takeLeaveRequests: takeLeaveRequestByRequested(state),
        user: userProfile(state)
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        getTakeLeaveRequests: bindActionCreators(getTakeLeaveRequestByRequested, dispatch)
    })
)(_requested);
