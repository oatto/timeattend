/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Button, Card, CardItem, Body } from 'native-base';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles as s } from 'react-native-style-tachyons';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import Hr from '_features/common/components/Hr';
import CommonText from '_features/common/components/CommonText';
import MngModal from '_features/mng-core/components/MngModal';
import themeVariables from '_theme';
import { EmployeeSearchForm1 } from '_features/mng-core/forms/EmployeeSearchForm';
import Trans from '_features/common/containers/Trans';
import MngModalMobileAccessDetail from '../../components/MngModalMobileAccessDetail';
import {
    fetchMngMobileAccessApproved,
    mngDeleteMobileAccess
} from '../../redux/actions';

import { mngMobileAccessApproved } from '../../redux/selectors';
import MobileAccessList from '../../components/MobileAccessList';

class _approved extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            modalVisible: false,
            activeData: {},
            searchValues: {}
        };
    }

    componentDidMount() {
        this.props.fetchMngMobileAccessApproved.request();
    }

    _renderItem = ({item}) => {
        return (
            <MobileAccessList
                data={item}
                onPress={() => {
                    this.setState({
                        modalVisible: true,
                        activeData: item
                    });
                }}
            />
        )
    };

    _onRefresh() {
        this.props.fetchMngMobileAccessApproved.refresh(this.state.searchValues)
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngMobileAccessApproved;

        return (
            <Container withBackground>
                <Card withSpace style={themeVariables.globalStyle.flex0}>
                    <CardItem>
                        <Body>
                            <EmployeeSearchForm1
                                onSubmit={(values) => {
                                    this.setState({searchValues: values});
                                    this.props.fetchMngMobileAccessApproved.request(values);
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
                            keyExtractor={(item) => item.id.toString()}
                            loadingMore={isLoadingMore}
                            refreshing={isRefreshing}
                            renderItem={this._renderItem}
                            onRefresh={this._onRefresh}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.fetchMngMobileAccessApproved.loadmore(this.state.searchValues);
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }

                <MngModal
                    isVisible={this.state.modalVisible}
                    title={Trans.tran('mng.mobile_access_approval.modal.title')}
                    onClosePress={() => this.setState({modalVisible: false})}
                >
                    <MngModalMobileAccessDetail data={this.state.activeData} />
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

                                this.props.mngDeleteMobileAccess.submit({
                                    id: this.state.activeData.id
                                });
                            }}
                        >
                            <CommonText text={Trans.tran('mng.mobile_access_approval.modal.button.cancel')} />
                        </Button>
                    </View>
                </MngModal>
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        mngMobileAccessApproved: mngMobileAccessApproved(state)
    }),
    (dispatch) => ({
        fetchMngMobileAccessApproved: bindActionCreators(fetchMngMobileAccessApproved, dispatch),
        mngDeleteMobileAccess: bindActionCreators(mngDeleteMobileAccess, dispatch)
    })
)(_approved)
