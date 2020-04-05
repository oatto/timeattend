/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Body, Card, CardItem, View } from 'native-base';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import CheckTimeAdjustmentList from '_features/check-time-adjustment/components/CheckTimeAdjustmentList';
import { getTimeAdjustmentByRequested } from '_features/check-time-adjustment/redux/actions';
import { getCheckTimeAdjustmentRequested } from '_features/check-time-adjustment/redux/selectors';
import { CHECK_TIME_ADJUSTMENT_SHOW } from '../../router';

class RequestingTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.getCheckTimeAdjustmentByRequested.request('requested');
    }

    _renderItem = ({item}) => {
        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <CheckTimeAdjustmentList
                            onPress={() => {
                                this.props.navigation.navigate({
                                    routeName: CHECK_TIME_ADJUSTMENT_SHOW,
                                    params: item
                                })
                            }}
                            data={item}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    _onRefresh() {
        this.props.getCheckTimeAdjustmentByRequested.refresh('requested')
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.checkTimeAdjustmentByRequested;

        return (
            <View fill>
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

                                this.props.getCheckTimeAdjustmentByRequested.loadmore('requested');
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </View>
        )
    }
}

export default connect(
    (state) => ({
        checkTimeAdjustmentByRequested: getCheckTimeAdjustmentRequested(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        getCheckTimeAdjustmentByRequested: bindActionCreators(getTimeAdjustmentByRequested, dispatch)
    })
)(RequestingTab);
