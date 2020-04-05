/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import NoResult from '_features/common/components/NoResult';
import { isEmpty } from 'lodash';
import Trans from '_features/common/containers/Trans';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import { styles as s } from 'react-native-style-tachyons';
import { View, Button } from 'native-base';
import CommonText from '_features/common/components/CommonText';
import Hr from '_features/common/components/Hr';
import MngModal from '_features/mng-core/components/MngModal';
import NotificationList from '_features/common/components/NotificationList'
import {
    NOTIFICATION_TAKE_LEAVE_TYPE,
    NOTIFICATION_TIME_ADJUSTMENT_TYPE,
    NOTIFICATION_RECOMPENSE_WORK_TYPE,
    NOTIFICATION_DIRECT_MESSAGE_TYPE,
    NOTIFICATION_CHECK_TIME_TYPE,
    NOTIFICATION_MOBILE_ACCESS_TYPE,
    NOTIFICATION_ORIGIN_TYPE_REQUEST_AND_REQUEST_CANCEL
} from '_features/common/redux/constants'
import HeaderTitle from '_features/common/components/HeaderTitle';
import { IS_MANAGER_APP } from '../../../common/constants';
import { getNotificationCenterList, notificationCenterRead } from '../redux/actions';
import { getNotificationCenterList as getNotificationCenterListSelector } from '../redux/selectors';

class NotificationScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            modalVisible: false,
            activeData: {}
        };
    }

    componentDidMount() {
        this.props.getNotificationCenterList.request();
    }

    _renderItem = ({item}) => {
        let navigation;

        if (IS_MANAGER_APP) {
            if (NOTIFICATION_TAKE_LEAVE_TYPE === item.origin_topic) {
                navigation = {
                    route: 'MNG_TAKE_LEAVE_APPROVAL',
                    tabIndexInit: item.origin_type === 'cancel' ? 2 : 0
                };
            } else if (NOTIFICATION_TIME_ADJUSTMENT_TYPE === item.origin_topic) {
                navigation = {
                    route: 'MNG_CHECK_TIME_ADJUSTMENT'
                };
            } else if (NOTIFICATION_RECOMPENSE_WORK_TYPE === item.origin_topic) {
                navigation = {
                    route: 'MNG_RECOMPENSE_WORKS',
                    tabIndexInit: item.origin_type === 'cancel' ? 2 : 0
                };
            } else if (NOTIFICATION_MOBILE_ACCESS_TYPE === item.origin_topic) {
                navigation = {
                    route: 'MNG_MOBILE_ACCESS_APPROVAL'
                };
            } else if (NOTIFICATION_CHECK_TIME_TYPE === item.origin_topic) {
                navigation = {};
            }
        } else {
            if (NOTIFICATION_TAKE_LEAVE_TYPE === item.origin_topic) {
                navigation = {
                    route: 'TAKE_LEAVE_REQUEST',
                    tabIndexInit: 1
                };
            } else if (NOTIFICATION_TIME_ADJUSTMENT_TYPE === item.origin_topic) {
                navigation = {
                    route: 'CHECK_TIME_ADJUSTMENT',
                    tabIndexInit: 2
                };
            } else if (NOTIFICATION_RECOMPENSE_WORK_TYPE === item.origin_topic) {
                navigation = {
                    route: 'RECOMPENSE_WORKING',
                    tabIndexInit: 1
                };
            } else if (NOTIFICATION_DIRECT_MESSAGE_TYPE === item.origin_topic) {
                navigation = {
                    route: 'PROFILE_INBOX_MESSAGE'
                };
            }
        }

        return (
            <NotificationList
                data={item}
                onPress={() => {
                    if (!isEmpty(navigation)) {
                        this.props.navigationActions.navigate({
                            routeName: navigation.route,
                            params: {
                                tabIndexInit: navigation.tabIndexInit,
                                isRootPage: true,
                                notificationCenterData: item
                            }
                        });
                    } else {
                        this.setState({
                            modalVisible: true,
                            activeData: item
                        });
                    }
                }}
            />
        );
    };

    _onRefresh() {
        this.props.getNotificationCenterList.refresh()
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.getNotificationCenterListSelector;

        return (
            <View fill>
                {isLoading
                    ? null :
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

                                this.props.getNotificationCenterList.loadmore();
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }

                <MngModal
                    isVisible={this.state.modalVisible}
                    title={Trans.tran('mng.notification.modal.title')}
                    onClosePress={() => this.setState({modalVisible: false})}
                >
                    <Hr />
                    <View style={s.flx_row}>
                        <Button
                            actionModal
                            full
                            onPress={() => {
                                this.setState({
                                    modalVisible: false,
                                    activeData: {}
                                });

                                this.props.notificationCenterRead.request({
                                    id: this.state.activeData.id,
                                    type: NOTIFICATION_CHECK_TIME_TYPE
                                });
                            }}
                        >
                            <CommonText text={Trans.tran('mng.notification.modal.button')} />
                        </Button>
                    </View>
                </MngModal>
            </View>
        )
    }
}

NotificationScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'general.notification.title'} />,
});

export default connect(
    (state) => ({
        getNotificationCenterListSelector: getNotificationCenterListSelector(state),
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch),
        notificationCenterRead: bindActionCreators(notificationCenterRead, dispatch),
    })
)(NotificationScreen);
