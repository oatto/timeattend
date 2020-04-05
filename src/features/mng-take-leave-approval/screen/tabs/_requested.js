/* eslint-disable react/prop-types */
import React from 'react';
import { Container, View, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList'
import themeVariables from '_theme';
import { isEmpty } from 'lodash';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL, NOTIFICATION_TAKE_LEAVE_TYPE } from '_features/common/redux/constants';
import { notificationCenterRead, getNotificationCenterList } from '_features/common/redux/actions';
import { getNotificationCenterList as notificationCenterListSelector } from '_features/common/redux/selectors';
import EmployeeSearchForm from '_features/mng-core/forms/EmployeeSearchForm';
import MngTakeLeaveListDetail from '../../components/MngTakeLeaveListDetail'
import { fetchMngTakeLeaveRequested } from '../../redux/actions';
import { MNG_TAKE_LEAVE_DETAIL_SCREEN } from '../../router';
import { mngTakeLeaveRequested } from '../../redux/selectors';

class _requested extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            searchValues: {}
        };
    }

    componentDidMount() {
        this.props.fetchMngTakeLeaveRequested.request({transition: STATE_REQUESTED_AND_REQUESTED_CANCEL});
        this.props.getNotificationCenterList.request({type: NOTIFICATION_TAKE_LEAVE_TYPE});
    }

    _renderItem = ({item}) => {
        let { data } = this.props.notificationCenterListSelector;

        return (
            <ApprovalList
                state={item.state}
                onPress={() => {
                    this.props.navigationActions.navigate({
                        routeName: MNG_TAKE_LEAVE_DETAIL_SCREEN,
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
                detail={
                    <MngTakeLeaveListDetail
                        data={item}
                        dataChangeLatest={!isEmpty(data) ? data.findIndex(data => data.origin_id === item.id) !== -1 : false}
                    />
                }
            />
        )
    };

    _onRefresh() {
        this.props.fetchMngTakeLeaveRequested.refresh({
            employee: this.state.searchValues,
            transition: STATE_REQUESTED_AND_REQUESTED_CANCEL
        });
        this.props.getNotificationCenterList.request({type: NOTIFICATION_TAKE_LEAVE_TYPE});
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngTakeLeaveRequested;
        return (
            <Container withBackground>
                <Card withSpace style={themeVariables.globalStyle.flex0}>
                    <CardItem>
                        <Body>
                            <EmployeeSearchForm
                                onSubmit={(values) => {
                                    this.setState({searchValues: values.employee});
                                    this.props.fetchMngTakeLeaveRequested.request({
                                        employee: values.employee,
                                        transition: STATE_REQUESTED_AND_REQUESTED_CANCEL
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

                                this.props.fetchMngTakeLeaveRequested.loadmore({
                                    employee: this.state.searchValues,
                                    transition: STATE_REQUESTED_AND_REQUESTED_CANCEL
                                });
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        mngTakeLeaveRequested: mngTakeLeaveRequested(state),
        notificationCenterListSelector: notificationCenterListSelector(state)
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        fetchMngTakeLeaveRequested: bindActionCreators(fetchMngTakeLeaveRequested, dispatch),
        notificationCenterRead: bindActionCreators(notificationCenterRead, dispatch),
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch)
    })
)(_requested)
