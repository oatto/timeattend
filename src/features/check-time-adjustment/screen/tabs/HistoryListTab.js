/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import {Card, CardItem, Body, View} from 'native-base';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import { isEmpty } from 'lodash';
import { notificationCenterRead, getNotificationCenterList } from '_features/common/redux/actions';
import { getNotificationCenterList as notificationCenterListSelector } from '_features/common/redux/selectors';
import { NOTIFICATION_TIME_ADJUSTMENT_TYPE } from '_features/common/redux/constants';
import { getTimeAdjustmentIsNotRequested } from '_features/check-time-adjustment/redux/actions';
import { getCheckTimeAdjustmentIsNotRequested } from '_features/check-time-adjustment/redux/selectors';
import { CHECK_TIME_ADJUSTMENT_SHOW } from '../../router';
import CheckTimeAdjustmentList from '../../components/CheckTimeAdjustmentList';

class HistoryListTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onReload = this._onReload.bind(this);
    }

    componentDidMount() {
        this.props.getCheckTimeAdjustmentIsNotRequested.request();
        this.props.getNotificationCenterList.request({type: NOTIFICATION_TIME_ADJUSTMENT_TYPE});
    }

    _renderItem = ({item}) => {
        const { data } = this.props.notificationCenterListSelector;

        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <CheckTimeAdjustmentList
                            onPress={() => {
                                this.props.navigation.navigate({
                                    routeName: CHECK_TIME_ADJUSTMENT_SHOW,
                                    params: item
                                });

                                if (!isEmpty(data)) {
                                    const notificationDataIndexRead = data.findIndex(data => data.origin_id === item.id);
                                    if (notificationDataIndexRead !== -1) {
                                        this.props.notificationCenterRead.request({
                                            id: data[notificationDataIndexRead].id,
                                            type: NOTIFICATION_TIME_ADJUSTMENT_TYPE
                                        });
                                    }
                                }
                            }}
                            data={item}
                            dataChangeLatest={!isEmpty(data) ? data.findIndex(data => data.origin_id === item.id) !== -1 : false}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    _onReload() {
        this.props.getCheckTimeAdjustmentIsNotRequested.refresh();
        this.props.getNotificationCenterList.request({type: NOTIFICATION_TIME_ADJUSTMENT_TYPE});
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.checkTimeAdjustmentIsNotRequested;

        return(
            <View fill>
                {isLoading
                    ? <View /> :
                    data.length ?
                        <InfinityScrollList
                            data={data}
                            loadingMore={isLoadingMore}
                            refreshing={isRefreshing}
                            renderItem={this._renderItem}
                            onRefresh={this._onReload}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.getCheckTimeAdjustmentIsNotRequested.loadmore();
                            }}
                        /> : <NoResult onReload={this._onReload} />
                }
            </View>
        )
    }
}

export default connect(
    (state) => ({
        checkTimeAdjustmentIsNotRequested: getCheckTimeAdjustmentIsNotRequested(state),
        notificationCenterListSelector: notificationCenterListSelector(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        getCheckTimeAdjustmentIsNotRequested: bindActionCreators(getTimeAdjustmentIsNotRequested, dispatch),
        notificationCenterRead: bindActionCreators(notificationCenterRead, dispatch),
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch)
    })
)(HistoryListTab);
