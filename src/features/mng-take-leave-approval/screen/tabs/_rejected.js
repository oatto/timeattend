/* eslint-disable react/prop-types */
import React from 'react';
import { Container, View, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList'
import { notificationCenterRead, getNotificationCenterList } from '_features/common/redux/actions';
import { getNotificationCenterList as notificationCenterListSelector } from '_features/common/redux/selectors';
import { isEmpty } from 'lodash';
import { EmployeeSearchForm2 } from '_features/mng-core/forms/EmployeeSearchForm';
import themeVariables from '_theme';
import { STATE_REJECTED_AND_CANCELLED, NOTIFICATION_TAKE_LEAVE_TYPE } from "_features/common/redux/constants";
import MngTakeLeaveListDetail from '../../components/MngTakeLeaveListDetail'
import { fetchMngTakeLeaveRejected } from '../../redux/actions';
import { mngTakeLeaveRejected } from '../../redux/selectors';
import { MNG_TAKE_LEAVE_DETAIL_SCREEN } from '../../router';

class _rejected extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            searchValues: {}
        };
    }

    componentDidMount() {
        this.props.fetchMngTakeLeaveRejected.request({transition: STATE_REJECTED_AND_CANCELLED});
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
        this.props.fetchMngTakeLeaveRejected.refresh({
            employee: this.state.searchValues,
            transition: STATE_REJECTED_AND_CANCELLED
        })
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngTakeLeaveRejected;

        return (
            <Container withBackground>
                <Card withSpace style={themeVariables.globalStyle.flex0}>
                    <CardItem>
                        <Body>
                            <EmployeeSearchForm2
                                onSubmit={(values) => {
                                    this.setState({searchValues: values.employee});
                                    this.props.fetchMngTakeLeaveRejected.request({
                                        employee: values.employee,
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

                                this.props.fetchMngTakeLeaveRejected.loadmore({
                                    employee: this.state.searchValues,
                                    transition: STATE_REJECTED_AND_CANCELLED
                                })
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        mngTakeLeaveRejected: mngTakeLeaveRejected(state),
        notificationCenterListSelector: notificationCenterListSelector(state)
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        fetchMngTakeLeaveRejected: bindActionCreators(fetchMngTakeLeaveRejected, dispatch),
        notificationCenterRead: bindActionCreators(notificationCenterRead, dispatch),
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch)
    })
)(_rejected)
