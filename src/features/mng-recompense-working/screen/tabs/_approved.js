/* eslint-disable react/prop-types */
import React from 'react';
import { Container, View, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import themeVariables from '_theme';
import { EmployeeSearchForm1 } from '_features/mng-core/forms/EmployeeSearchForm';
import ApprovalList from '_features/common/components/ApprovalList'
import { fetchMngRecompenseWorksApproved } from '../../redux/actions';
import { mngRecompenseWorksApproved } from '../../redux/selectors';
import MngRecompenseWorkingList from '../../components/MngRecompenseWorkingList';
import { MNG_RECOMPENSE_WORKS_DETAIL } from '../../router';

class _approved extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            searchValues: {}
        }
    }
    componentDidMount() {
        this.props.fetchMngRecompenseWorksApproved.request();
    }

    _renderItem = ({item}) => {
        return (
            <ApprovalList
                state={item.state}
                onPress={() => {
                    this.props.navigation.navigate({
                        routeName: MNG_RECOMPENSE_WORKS_DETAIL,
                        params: item
                    })
                }}
                detail={<MngRecompenseWorkingList item={item} />}
            />
        )
    };

    _onRefresh() {
        this.props.fetchMngRecompenseWorksApproved.refresh(this.state.searchValues)
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngRecompenseWorksApproved;
        return (
            <Container withBackground>
                <Card withSpace style={themeVariables.globalStyle.flex0}>
                    <CardItem>
                        <Body>
                            <EmployeeSearchForm1
                                onSubmit={(values) => {
                                    this.setState({searchValues: values});
                                    this.props.fetchMngRecompenseWorksApproved.request(values);
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

                                this.props.fetchMngRecompenseWorksApproved.loadmore(this.state.searchValues);
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        mngRecompenseWorksApproved: mngRecompenseWorksApproved(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        fetchMngRecompenseWorksApproved: bindActionCreators(fetchMngRecompenseWorksApproved, dispatch),
    })
)(_approved)
