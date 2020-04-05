/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Card, CardItem, Body } from 'native-base';
import PropTypes from "prop-types";
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import MngMobileDevicesList from '_features/mng-core/components/MngMobileDevicesList';
import { mngFetchPublicDevice, mngPublicMobileDevice } from '../../redux/actions';
import { mngPublicMobileDevices as mngPublicMobileDevicesSelector } from '../../redux/selectors';
import withMobileDeviceTab from "./HocMobileDevice";

class _publicDevices extends React.PureComponent {
    static propTypes = {
        setWrapperState: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
    }
    
    componentDidMount() {
        this.props.mngFetchPublicDevice.request();
    }

    _renderItem = ({item}) => {
        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <MngMobileDevicesList
                            data={item}
                            onPress={() => {
                                if (item.public_device) {
                                    this.props.setWrapperState({
                                        modalVisible: false,
                                        modalMobileDeviceVisible: false,
                                        modalMobileDeviceActionsVisible: true,
                                        activeData: item,
                                    });

                                    return;
                                }
                                this.props.setWrapperState({
                                    modalVisible: true,
                                    modalMobileDeviceVisible: false,
                                    activeData: item,
                                });
                            }}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    _onRefresh() {
        this.props.mngFetchPublicDevice.refresh()
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngPublicDevices;

        return (
            <Container withBackground>
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

                                this.props.mngFetchPublicDevice.loadmore();
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        mngPublicDevices: mngPublicMobileDevicesSelector(state)
    }),
    (dispatch) => ({
        mngFetchPublicDevice: bindActionCreators(mngFetchPublicDevice, dispatch),
        mngPublicMobileDevice: bindActionCreators(mngPublicMobileDevice, dispatch),
    })
)(withMobileDeviceTab(_publicDevices))
