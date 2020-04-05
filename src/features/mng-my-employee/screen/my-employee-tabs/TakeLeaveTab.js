/* eslint-disable react/prop-types */
import React from 'react';
import { FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NoResult from '_features/common/components/NoResult';
import ApprovalList from '_features/common/components/ApprovalList';
import MngTakeLeaveListDetail from '_features/mng-take-leave-approval/components/MngTakeLeaveListDetail';
import { mngTakeLeaveMonthly } from "../../redux/actions";
import { getTakeLeaveMonthly as getTakeLeaveMonthlySelector } from "../../redux/selectors";
import withMonthlyTab from "./HocMontlyTab";

class TakeLeaveTab extends React.PureComponent {
    _renderItem = ({item}) => {
        return (
            <ApprovalList
                state={item.state}
                onPress={() => {}}
                detail={<MngTakeLeaveListDetail data={item} />}
            />
        )
    };

    render() {
        return (
            <Container>
                <Content>
                    {this.props.takeLeaveMonthly.length ?
                        <FlatList
                            data={this.props.takeLeaveMonthly}
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
        takeLeaveMonthly: getTakeLeaveMonthlySelector(state)
    }),
    (dispatch) => ({
        mngGetTakeLeaveMonthly: bindActionCreators(mngTakeLeaveMonthly, dispatch),
        getData: (year, month) => {
            dispatch(mngTakeLeaveMonthly.request({
                year,
                month
            }))
        }
    })
)(withMonthlyTab(TakeLeaveTab))
