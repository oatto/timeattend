/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Container, Card, CardItem, Body, View } from 'native-base';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import { NOTIFICATION_TIME_ADJUSTMENT_TYPE } from '_features/common/redux/constants';
import { notificationCenterRead, getNotificationCenterList } from '_features/common/redux/actions';
import { getNotificationCenterList as notificationCenterListSelector } from '_features/common/redux/selectors';
import { isEmpty } from 'lodash';
import themeVariables from '_theme';
import EmployeeSearchForm from '_features/mng-core/forms/EmployeeSearchForm';
import { fetchMngCheckTimeAdjustmentRequested } from '_features/mng-check-time-adjustment/redux/actions';
import { mngCheckTimeAdjustmentRequested } from '_features/mng-check-time-adjustment/redux/selectors';
import CheckTimeAdjustmentList from "_features/check-time-adjustment/components/CheckTimeAdjustmentList";
import { MNG_CHECK_TIME_ADJUSTMENT_SHOW } from '../../router';

class _requested extends React.PureComponent {
    constructor(props){
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            searchValues: {}
        }
    }

    componentDidMount() {
        this.props.fetchMngCheckTimeAdjustmentRequested.request();
        this.props.getNotificationCenterList.request({type: NOTIFICATION_TIME_ADJUSTMENT_TYPE});
    }

    _renderItem = ({item}) => {
        const { data } = this.props.notificationCenterListSelector;

        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <CheckTimeAdjustmentList
                            data={item}
                            onPress={() => {
                                this.props.navigation.navigate({
                                    routeName: MNG_CHECK_TIME_ADJUSTMENT_SHOW,
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
                            dataChangeLatest={!isEmpty(data) ? data.findIndex(data => data.origin_id === item.id) !== -1 : false}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    _onRefresh() {
        this.props.fetchMngCheckTimeAdjustmentRequested.refresh(this.state.searchValues);
        this.props.getNotificationCenterList.request({type: NOTIFICATION_TIME_ADJUSTMENT_TYPE});
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.mngCheckTimeAdjustmentRequested;

        return (
            <Container withBackground>
                <Card withSpace style={themeVariables.globalStyle.flex0}>
                    <CardItem>
                        <Body>
                            <EmployeeSearchForm
                                onSubmit={(values) => {
                                    this.setState({searchValues: values});
                                    this.props.fetchMngCheckTimeAdjustmentRequested.request(values);
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

                                this.props.fetchMngCheckTimeAdjustmentRequested.loadmore(this.state.searchValues);
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        mngCheckTimeAdjustmentRequested: mngCheckTimeAdjustmentRequested(state),
        notificationCenterListSelector: notificationCenterListSelector(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        fetchMngCheckTimeAdjustmentRequested: bindActionCreators(fetchMngCheckTimeAdjustmentRequested, dispatch),
        notificationCenterRead: bindActionCreators(notificationCenterRead, dispatch),
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch)
    })
)(_requested);
