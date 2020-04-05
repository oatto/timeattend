/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { Container } from 'native-base';
import { STATE_REQUESTED_AND_REQUESTED_CANCEL } from '_features/common/redux/constants';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList';
import { getRecompenseWorkingByRequested } from '_features/recompense-working/redux/actions';
import { getRecompenseWorkingRequested } from '_features/recompense-working/redux/selectors';
import ListRecompenseWorking from '../../components/ListRecompenseWorking';
import { RECOMPENSE_WORKING_SHOW } from '../../router';

class RequestedListTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onReload = this._onReload.bind(this);
    }

    componentDidMount() {
        this.props.getRecompenseWorkingByRequested.request(STATE_REQUESTED_AND_REQUESTED_CANCEL);
    }

    _renderItem = ({item}) => {
        return (
            <ApprovalList
                onPress={() => {
                    this.props.navigation.navigate({
                        routeName: RECOMPENSE_WORKING_SHOW,
                        params: item
                    })
                }}
                state={item.state}
                detail={<ListRecompenseWorking item={item} />}
            />
        )
    };

    _onReload() {
        this.props.getRecompenseWorkingByRequested.refresh(STATE_REQUESTED_AND_REQUESTED_CANCEL)
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.recompenseWorkingRequested;

        return(
            <Container withBackground>
                {isLoading
                    ? <View /> :
                    data.length ?
                        <InfinityScrollList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            loadingMore={isLoadingMore}
                            refreshing={isRefreshing}
                            renderItem={this._renderItem}
                            onRefresh={this._onReload}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.getRecompenseWorkingByRequested.loadmore(STATE_REQUESTED_AND_REQUESTED_CANCEL);
                            }}
                        /> : <NoResult onReload={this._onReload} />
                }
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        recompenseWorkingRequested: getRecompenseWorkingRequested(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        getRecompenseWorkingByRequested: bindActionCreators(getRecompenseWorkingByRequested, dispatch)
    })
)(RequestedListTab);
