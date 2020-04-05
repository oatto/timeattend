/* eslint-disable react/prop-types */
import React from 'react';
import {Button, Container, View, Card, CardItem, Body} from 'native-base';
import {connect} from 'react-redux';
import {styles as s} from "react-native-style-tachyons";
import {bindActionCreators} from 'redux';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import Hr from '_features/common/components/Hr';
import NoResult from '_features/common/components/NoResult';
import Trans from '_features/common/containers/Trans';
import MngModal from '_features/mng-core/components/MngModal';
import { isEmpty } from 'lodash';
import MngModalRejectReason from '_features/mng-core/components/MngModalRejectReason';
import { notificationCenterRead, getNotificationCenterList } from '_features/common/redux/actions';
import { getNotificationCenterList as notificationCenterListSelector } from '_features/common/redux/selectors';
import { NOTIFICATION_MOBILE_ACCESS_TYPE } from '_features/common/redux/constants';
import EmployeeSearchForm from '_features/mng-core/forms/EmployeeSearchForm';
import CommonText from "_features/common/components/CommonText";
import themeVariables from "_theme";
import MngModalMobileAccessDetail from '../../components/MngModalMobileAccessDetail';
import {
    fetchMngMobileAccessApprovalRequested,
    mngApprovedMobileAccess,
    mngRejectedMobileAccess
} from '../../redux/actions';
import {mngMobileAccessApprovalRequested} from '../../redux/selectors';
import MobileAccessList from '../../components/MobileAccessList';

class _requested extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            modalVisible: false,
            modalRejectedReasonVisible: false,
            activeData: {},
            searchValues: {}
        };
    }

    componentDidMount() {
        this.props.fetchMngMobileAccessApprovalRequested.request();
        this.props.getNotificationCenterList.request({type: NOTIFICATION_MOBILE_ACCESS_TYPE});
    }

    _renderItem = ({item}) => {
        let { data } = this.props.notificationCenterListSelector;

        return (
            <MobileAccessList
                data={item}
                onPress={() => {
                    this.setState({
                        modalVisible: true,
                        modalRejectedReasonVisible: false,
                        activeData: item
                    });

                    if (!isEmpty(data)) {
                        const notificationDataIndexRead = data.findIndex(data => data.origin_id === item.id);
                        if (notificationDataIndexRead !== -1) {
                            this.props.notificationCenterRead.request({
                                id: data[notificationDataIndexRead].id,
                                type: NOTIFICATION_MOBILE_ACCESS_TYPE
                            });
                        }
                    }
                }}
                dataChangeLatest={!isEmpty(data) ? data.findIndex(data => data.origin_id === item.id) !== -1 : false}
            />
        )
    };

    _onRefresh() {
        this.props.fetchMngMobileAccessApprovalRequested.refresh(this.state.searchValues);
        this.props.getNotificationCenterList.request({type: NOTIFICATION_MOBILE_ACCESS_TYPE});
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngMobileAccessApprovalRequested;

        return (
            <Container withBackground>
                <Card withSpace style={themeVariables.globalStyle.flex0}>
                    <CardItem>
                        <Body>
                            <EmployeeSearchForm
                                onSubmit={(values) => {
                                    this.setState({searchValues: values,});
                                    this.props.fetchMngMobileAccessApprovalRequested.request(values);
                                }}
                            />
                        </Body>
                    </CardItem>
                </Card>

                {isLoading
                    ? null :
                    data.length ?
                        <InfinityScrollList
                            data={data}
                            loadingMore={isLoadingMore}
                            refreshing={isRefreshing}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            onRefresh={this._onRefresh}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.fetchMngMobileAccessApprovalRequested.loadmore(this.state.searchValues);
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }

                <MngModalRejectReason
                    isVisible={this.state.modalRejectedReasonVisible}
                    onClosePress={() => this.setState({modalRejectedReasonVisible: false})}
                    onConfirm={(values) => {
                        this.setState({
                            modalRejectedReasonVisible: false,
                            activeData: {}
                        });

                        this.props.mngRejectedMobileAccess.submit({
                            id: this.state.activeData.id,
                            rejectedReason: values.rejectedReason
                        });
                    }}
                    modalProps={{
                        animationType: 'none'
                    }}
                />

                <MngModal
                    isVisible={this.state.modalVisible}
                    title={Trans.tran('mng.mobile_access_approval.modal.title')}
                    onClosePress={() => this.setState({modalVisible: false})}
                    modalProps={{
                        animationType: 'none'
                    }}
                >
                    <MngModalMobileAccessDetail data={this.state.activeData} />
                    <Hr />
                    <View style={s.flx_row}>
                        <Button
                            actionModalHalf
                            onPress={() => {
                                this.setState({
                                    modalVisible: false,
                                    modalRejectedReasonVisible: true
                                });
                            }}
                        >
                            <CommonText text={Trans.tran('general.button.rejected')} />
                        </Button>
                        <Button
                            actionModalHalf
                            onPress={() => {
                                this.setState({
                                    modalVisible: false,
                                    activeData: {}
                                });

                                this.props.mngApprovedMobileAccess.submit({
                                    id: this.state.activeData.id
                                });
                            }}
                        >
                            <CommonText text={Trans.tran('general.button.approved')} />
                        </Button>
                    </View>
                </MngModal>
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        mngMobileAccessApprovalRequested: mngMobileAccessApprovalRequested(state),
        notificationCenterListSelector: notificationCenterListSelector(state)
    }),
    (dispatch) => ({
        fetchMngMobileAccessApprovalRequested: bindActionCreators(fetchMngMobileAccessApprovalRequested, dispatch),
        mngApprovedMobileAccess: bindActionCreators(mngApprovedMobileAccess, dispatch),
        mngRejectedMobileAccess: bindActionCreators(mngRejectedMobileAccess, dispatch),
        getNotificationCenterList: bindActionCreators(getNotificationCenterList, dispatch),
        notificationCenterRead: bindActionCreators(notificationCenterRead, dispatch)
    })
)(_requested)
