/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Container, Card, CardItem, Body } from 'native-base';
import { View } from 'react-native';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import themeVariables from '_theme';
import { EmployeeSearchForm1 } from '_features/mng-core/forms/EmployeeSearchForm';
import { fetchMngCheckTimeAdjustmentApproved } from '_features/mng-check-time-adjustment/redux/actions';
import { mngCheckTimeAdjustmentApproved } from '_features/mng-check-time-adjustment/redux/selectors';
import CheckTimeAdjustmentList from "_features/check-time-adjustment/components/CheckTimeAdjustmentList";
import { MNG_CHECK_TIME_ADJUSTMENT_SHOW } from '../../router';

class _approved extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            searchValues: {}
        }
    }

    componentDidMount() {
        this.props.fetchMngCheckTimeAdjustmentApproved.request();
    }

    _renderItem = ({item}) => {
        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <CheckTimeAdjustmentList
                            data={item}
                            onPress={() => {
                                this.props.navigation.navigate({
                                    routeName: MNG_CHECK_TIME_ADJUSTMENT_SHOW,
                                    params: item
                                })
                            }}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    _onRefresh() {
        this.props.fetchMngCheckTimeAdjustmentApproved.refresh(this.state.searchValues)
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.mngCheckTimeAdjustmentApproved;

        return (
            <Container withBackground>
                <Card withSpace style={themeVariables.globalStyle.flex0}>
                    <CardItem>
                        <Body>
                            <EmployeeSearchForm1
                                onSubmit={(values) => {
                                    this.setState({searchValues: values});
                                    this.props.fetchMngCheckTimeAdjustmentApproved.request(values);
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

                                this.props.fetchMngCheckTimeAdjustmentApproved.loadmore(this.state.searchValues);
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        mngCheckTimeAdjustmentApproved: mngCheckTimeAdjustmentApproved(state)
    }),
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
        fetchMngCheckTimeAdjustmentApproved: bindActionCreators(fetchMngCheckTimeAdjustmentApproved, dispatch)
    })
)(_approved);
