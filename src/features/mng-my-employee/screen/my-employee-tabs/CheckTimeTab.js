/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from "prop-types";
import { StyleSheet } from 'react-native';
import {Container, Content, Text, Card, CardItem, Body, View} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import NoResult from '_features/common/components/NoResult';
import MngCheckInList from '_features/mng-core/components/MngCheckInList';
import { getCheckTimeMonthly } from "../../redux/actions";
import { getCheckTimeMonthly as getCheckTimeMonthlySelector } from "../../redux/selectors";
import withMonthlyTab from "./HocMontlyTab";

class CheckTimeTab extends React.PureComponent {
    _renderItem = ({item}) => {
        return (
            <Card withSpace>
                <CardItem>
                    <Body>
                        <View style={styles.container}>
                            <MngCheckInList employeeData={item} />
                        </View>
                    </Body>
                </CardItem>
            </Card>
        )
    };

    render() {
        const {data, isRefreshing, isLoadingMore, isLoading, pagination} = this.props.checkTimeMonthly;

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
                            onRefresh={() => {
                                this.props.getCheckTimeMonthly.refresh()
                            }}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.getCheckTimeMonthly.loadmore();
                            }}
                        /> : <NoResult />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
});

export default connect(
    (state) => ({
        checkTimeMonthly: getCheckTimeMonthlySelector(state)
    }),
    (dispatch) => ({
        getCheckTimeMonthly: bindActionCreators(getCheckTimeMonthly, dispatch),
        getData: (year, month) => {
            dispatch(getCheckTimeMonthly.request({
                year,
                month
            }))
        }
    })
)(withMonthlyTab(CheckTimeTab))
