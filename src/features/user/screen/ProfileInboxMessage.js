/* eslint-disable react/prop-types,react/no-did-update-set-state */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, View } from 'native-base';
import ref from "react-native-core/utils/ref";
import { isEmpty } from 'lodash';
import NoResult from "_features/common/components/NoResult";
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import MngModal from '_features/mng-core/components/MngModal';
import Trans from '_features/common/containers/Trans';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import ModalMessageDetail from '_features/user/components/ModalMessageDetail';
import { notificationCenterRead, getNotificationCenterList } from '_features/common/redux/actions';
import { getNotificationCenterList as notificationCenterListSelector } from '_features/common/redux/selectors';
import { NOTIFICATION_DIRECT_MESSAGE_TYPE } from '_features/common/redux/constants';
import HeaderTitle from '_features/common/components/HeaderTitle';
import { getInboxMessage } from '_features/user/redux/actions';
import { userInboxMessage } from '_features/user/redux/selectors';
import EmployeeHeaderDetail from "../components/EmployeeHeaderDetail";

class ProfileInboxMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            activeData: {}
        };

        this._onReload = this._onReload.bind(this);
    }

    componentDidMount() {
        this.props.getInboxMessage.request();
        this.props.getNotificationCenterList.request({type: NOTIFICATION_DIRECT_MESSAGE_TYPE});
    }

    _renderItem = ({item}) => {
        const { data } = this.props.notificationCenterListSelector;

        return (
            <EmployeeHeaderDetail
                data={item}
                onPress={() => {
                    this.setState({
                        modalVisible: true,
                        activeData: item
                    });

                    if (!isEmpty(data)) {
                        const notificationDataIndexRead = data.findIndex(data => data.origin_id === item.id);
                        if (notificationDataIndexRead !== -1) {
                            this.props.notificationCenterRead.request({
                                id: data[notificationDataIndexRead].id,
                                type: NOTIFICATION_DIRECT_MESSAGE_TYPE
                            });
                        }
                    }
                }}
                dataLatest={!isEmpty(data) ? data.findIndex(data => data.origin_id === item.id) !== -1 : false}
            />
        )
    };

    _onReload() {
        this.props.getInboxMessage.request()
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.userInboxMessage;

        return (
            <Container withBackground iPhoneXSupport>
                <View fill padder>
                    {isLoading
                        ? <View /> :
                        data.length ?
                            <InfinityScrollList
                                data={data}
                                loadingMore={isLoadingMore}
                                refreshing={isRefreshing}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                onRefresh={() => {
                                    this.props.getInboxMessage.refresh()
                                }}
                                onLoadMore={() => {
                                    if (!pagination.hasNextPage) {
                                        return;
                                    }

                                    this.props.getInboxMessage.loadmore();
                                }}
                            /> : <NoResult onReload={this._onReload} />
                    }

                    <MngModal
                        isVisible={this.state.modalVisible}
                        title={Trans.tran('user.profile.message_title')}
                        onClosePress={() => this.setState({modalVisible: false})}
                        modalProps={{
                            animationType: 'none'
                        }}
                    >
                        <ModalMessageDetail data={this.state.activeData} />
                    </MngModal>
                </View>
            </Container>
        );
    }
}

ProfileInboxMessage.navigationOptions = ({navigation}) => {
    const headers = {
        headerTitle: <HeaderTitle text={'user.profile_list.title_inbox_message'} />
    };

    if (true === ref(navigation, 'state.params.isRootPage')) {
        headers.headerLeft = <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />;
    }

    return headers;
};

export default connect(
    (state) => ({
        userInboxMessage: userInboxMessage(state),
        notificationCenterListSelector: notificationCenterListSelector(state)
    }),
    (dispatch) => ({
        getInboxMessage: bindActionCreators(getInboxMessage, dispatch),
        notificationCenterRead: bindActionCreators(notificationCenterRead, dispatch),
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch)
    })
)(ProfileInboxMessage);
