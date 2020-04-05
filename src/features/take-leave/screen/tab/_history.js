/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'native-base';
import { NavigationActions } from 'react-navigation';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList';
import themeVariables from '_theme';
import { getTakeLeaveRequestByNoneRequested } from '_features/take-leave/redux/actions';
import { notificationCenterRead, getNotificationCenterList } from '_features/common/redux/actions';
import { getNotificationCenterList as notificationCenterListSelector } from '_features/common/redux/selectors';
import { isEmpty } from 'lodash';
import { NOTIFICATION_TAKE_LEAVE_TYPE } from '_features/common/redux/constants';
import { takeLeaveRequestByNoneRequested } from '_features/take-leave/redux/selectors';
import TakeLeaveListDetail from '../../components/TakeLeaveListDetail';
import { TAKE_LEAVE_DETAIL } from '../../router';
import CommonText from "../../../common/components/CommonText";

class _history extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.fetchTakeLeaveRequests.request();
        this.props.getNotificationCenterList.request({type: NOTIFICATION_TAKE_LEAVE_TYPE});
    }

    _renderItem = ({item}) => {
        const { data } = this.props.notificationCenterListSelector;

        return (
            <ApprovalList
                state={item.state}
                onPress={() => {
                    this.props.navigationActions.navigate({
                        routeName: TAKE_LEAVE_DETAIL,
                        params: item
                    });

                    if (!isEmpty(data)) {
                        const notificationDataIndexRead = data.findIndex(data => data.origin_id === item.id);
                        if (notificationDataIndexRead !== -1) {
                            this.props.notificationCenterRead.request({
                                id: data[notificationDataIndexRead].id,
                                type: NOTIFICATION_TAKE_LEAVE_TYPE
                            });
                        }
                    }
                }}
                header={<CommonText text={item.company_take_leave_setting.type_name} color={themeVariables.white} />}
                detail={<TakeLeaveListDetail data={item} />}
                dataChangeLatest={!isEmpty(data) ? data.findIndex(data => data.origin_id === item.id) !== -1 : false}
            />
        );
    };

    _onRefresh() {
        this.props.fetchTakeLeaveRequests.refresh();
        this.props.getNotificationCenterList.request({type: NOTIFICATION_TAKE_LEAVE_TYPE});
    }

    render () {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.takeLeaveRequests;

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

                                this.props.fetchTakeLeaveRequests.loadmore();
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </View>
        )
    }
}

export default connect(
    (state) => ({
        takeLeaveRequests: takeLeaveRequestByNoneRequested(state),
        notificationCenterListSelector: notificationCenterListSelector(state)
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        fetchTakeLeaveRequests: bindActionCreators(getTakeLeaveRequestByNoneRequested, dispatch),
        notificationCenterRead: bindActionCreators(notificationCenterRead, dispatch),
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch)
    })
)(_history);
