/* eslint-disable react/prop-types */
import React from 'react';
import { FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList';
import MngRecompenseWorkingList from '_features/mng-recompense-working/components/MngRecompenseWorkingList';
import { mngRecompenseWorkMonthly } from "../../redux/actions";
import { getRecompenseWorkMonthly as getRecompenseWorkMonthlySelector } from "../../redux/selectors";
import withMonthlyTab from "./HocMontlyTab";

class RecompenseTab extends React.PureComponent {
    _renderItem = ({item}) => {
        return (
            <ApprovalList
                state={item.state}
                onPress={() => {}}
                detail={<MngRecompenseWorkingList item={item} />}
            />
        )
    };

    render() {
        return (
            <Container>
                <Content>
                    {this.props.recompenseWorkMonthly.length ?
                        <FlatList
                            data={this.props.recompenseWorkMonthly}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={this._renderItem}
                        /> :
                        <NoResult />
                    }
                </Content>
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        recompenseWorkMonthly: getRecompenseWorkMonthlySelector(state)
    }),
    (dispatch) => ({
        mngGetRecompenseWorkMonthly: bindActionCreators(mngRecompenseWorkMonthly, dispatch),
        getData: (year, month) => {
            dispatch(mngRecompenseWorkMonthly.request({
                year,
                month
            }))
        }
    })
)(withMonthlyTab(RecompenseTab))
