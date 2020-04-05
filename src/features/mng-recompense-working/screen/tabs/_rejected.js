/* eslint-disable react/prop-types */
import React from 'react';
import { Container, View, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import themeVariables from '_theme';
import { isEmpty } from 'lodash';
import { NOTIFICATION_RECOMPENSE_WORK_TYPE, STATE_REJECTED_AND_CANCELLED } from '_features/common/redux/constants';
import { notificationCenterRead, getNotificationCenterList } from '_features/common/redux/actions';
import { getNotificationCenterList as notificationCenterListSelector } from '_features/common/redux/selectors';
import { EmployeeSearchForm2 } from '_features/mng-core/forms/EmployeeSearchForm';
import ApprovalList from '_features/common/components/ApprovalList'
import { fetchMngRecompenseWorksRejected } from '../../redux/actions';
import { mngRecompenseWorksRejected } from '../../redux/selectors';
import MngRecompenseWorkingList from '../../components/MngRecompenseWorkingList';
import { MNG_RECOMPENSE_WORKS_DETAIL } from '../../router';

class _rejected extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            searchValues: {}
        }
    }

    componentDidMount() {
        this.props.fetchMngRecompenseWorksRejected.request({transition: STATE_REJECTED_AND_CANCELLED});
        this.props.getNotificationCenterList.request({type: NOTIFICATION_RECOMPENSE_WORK_TYPE});
    }

    _renderItem = ({item}) => {
        let { data } = this.props.notificationCenterListSelector;

        return (
            <ApprovalList
                state={item.state}
                onPress={() => {
                    this.props.navigation.navigate({
                        routeName: MNG_RECOMPENSE_WORKS_DETAIL,
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
                detail={
                    <MngRecompenseWorkingList
                        item={item}
                        dataChangeLatest={!isEmpty(data) ? data.findIndex(data => data.origin_id === item.id) !== -1 : false}
                    />
                }
            />
        )
    };

    _onRefresh() {
        this.props.fetchMngRecompenseWorksRejected.refresh({
            employee: this.state.searchValues,
            transition: STATE_REJECTED_AND_CANCELLED
        });

        this.props.getNotificationCenterList.request({type: NOTIFICATION_RECOMPENSE_WORK_TYPE});
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngRecompenseWorksRejected;

        return (
            <Container withBackground>
                <Card withSpace style={themeVariables.globalStyle.flex0}>
                    <CardItem>
                        <Body>
                            <EmployeeSearchForm2
                                onSubmit={(values) => {
                                    this.setState({searchValues: values.employee});
                                    this.props.fetchMngRecompenseWorksRejected.request({
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

                                this.props.fetchMngRecompenseWorksRejected.loadmore({
                                    employee: this.state.searchValues,
                                    transition: STATE_REJECTED_AND_CANCELLED
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
        mngRecompenseWorksRejected: mngRecompenseWorksRejected(state),
        notificationCenterListSelector: notificationCenterListSelector(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        fetchMngRecompenseWorksRejected: bindActionCreators(fetchMngRecompenseWorksRejected, dispatch),
        notificationCenterRead: bindActionCreators(notificationCenterRead, dispatch),
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch)
    })
)(_rejected)
