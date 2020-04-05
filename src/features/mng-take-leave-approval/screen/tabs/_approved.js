/* eslint-disable react/prop-types */
import React from 'react';
import { Container, View, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList'
import { EmployeeSearchForm1 } from '_features/mng-core/forms/EmployeeSearchForm';
import themeVariables from '_theme';
import MngTakeLeaveListDetail from '../../components/MngTakeLeaveListDetail'
import { fetchMngTakeLeaveApproved } from '../../redux/actions';
import { mngTakeLeaveApproved } from '../../redux/selectors';
import { MNG_TAKE_LEAVE_DETAIL_SCREEN } from '../../router';

class _approved extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            searchValues: {}
        };
    }

    componentDidMount() {
        this.props.fetchMngTakeLeaveApproved.request();
    }

    _renderItem = ({item}) => {
        return (
            <ApprovalList
                state={item.state}
                onPress={() => {
                    this.props.navigationActions.navigate({
                        routeName: MNG_TAKE_LEAVE_DETAIL_SCREEN,
                        params: item
                    })
                }}
                detail={<MngTakeLeaveListDetail data={item} />}
            />
        )
    };

    _onRefresh() {
        this.props.fetchMngTakeLeaveApproved.refresh(this.state.searchValues)
    }

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.mngTakeLeaveApproved;
        return (
            <Container withBackground>
                <Card withSpace style={themeVariables.globalStyle.flex0}>
                    <CardItem>
                        <Body>
                            <EmployeeSearchForm1
                                onSubmit={(values) => {
                                    this.setState({searchValues: values});
                                    this.props.fetchMngTakeLeaveApproved.request(values);
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

                                this.props.fetchMngTakeLeaveApproved.loadmore(this.state.searchValues);
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        mngTakeLeaveApproved: mngTakeLeaveApproved(state)
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        fetchMngTakeLeaveApproved: bindActionCreators(fetchMngTakeLeaveApproved, dispatch),
    })
)(_approved)
