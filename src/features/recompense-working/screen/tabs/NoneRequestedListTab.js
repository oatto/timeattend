/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { Container } from 'native-base';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList';
import { isEmpty } from 'lodash';
import { getRecompenseWorkingByNoneRequested } from '_features/recompense-working/redux/actions';
import { getNotificationCenterList, notificationCenterRead } from '_features/common/redux/actions';
import { getNotificationCenterList as notificationCenterListSelector } from '_features/common/redux/selectors';
import { NOTIFICATION_RECOMPENSE_WORK_TYPE } from '_features/common/redux/constants';
import { getRecompenseWorkingNoneRequested } from '_features/recompense-working/redux/selectors';
import ListRecompenseWorking from '../../components/ListRecompenseWorking';
import { RECOMPENSE_WORKING_SHOW } from '../../router';

class NoneRequestedListTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onReload = this._onReload.bind(this);
    }

    componentDidMount() {
        this.props.getRecompenseWorkingNoneRequested.request();
        this.props.getNotificationCenterList.request({type: NOTIFICATION_RECOMPENSE_WORK_TYPE});
    }

    _renderItem = ({item}) => {
        let { data } = this.props.notificationCenterListSelector;

        return (
            <ApprovalList
                onPress={() => {
                    this.props.navigation.navigate({
                        routeName: RECOMPENSE_WORKING_SHOW,
                        params: item
                    });

                    if (!isEmpty(data)) {
                        const notificationDataIndexRead = data.findIndex(data => data.origin_id === item.id);
                        if (notificationDataIndexRead !== -1) {
                            this.props.notificationCenterRead.request({
                                id: data[notificationDataIndexRead].id,
                                type: NOTIFICATION_RECOMPENSE_WORK_TYPE
                            });
                        }
                    }
                }}
                state={item.state}
                detail={<ListRecompenseWorking
                    item={item}
                    dataChangeLatest={!isEmpty(data) ? data.findIndex(data => data.origin_id === item.id) !== -1 : false}
                />}
            />
        )
    };

    _onReload() {
        return this.props.getRecompenseWorkingNoneRequested.refresh()
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.recompenseWorkingNoneRequested;

        return(
            <Container withBackground>
                {isLoading
                    ? <View /> :
                    data.length ?
                        <InfinityScrollList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            loadingMore={isLoadingMore}
                            refreshing={isRefreshing}
                            renderItem={this._renderItem}
                            onRefresh={this._onReload}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.getRecompenseWorkingNoneRequested.loadmore();
                            }}
                        /> : <NoResult onReload={this._onReload} />
                }
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        recompenseWorkingNoneRequested: getRecompenseWorkingNoneRequested(state),
        notificationCenterListSelector: notificationCenterListSelector(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        getRecompenseWorkingNoneRequested: bindActionCreators(getRecompenseWorkingByNoneRequested, dispatch),
        notificationCenterRead: bindActionCreators(notificationCenterRead, dispatch),
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch)
    })
)(NoneRequestedListTab);
