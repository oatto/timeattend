/* eslint-disable react/prop-types */
import React from 'react';
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import isEmpty from 'lodash/isEmpty';
import { bindActionCreators } from 'redux';
import { styles as s } from 'react-native-style-tachyons';
import { Container, Content, View } from 'native-base';
import CommonText from '_features/common/components/CommonText';
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderMainDataUser from '_features/common/components/HeaderMainDataUser';
import Managers from "_features/mng-core/containers/Managers";
import Hr from '_features/common/components/Hr';
import Trans from "_features/common/containers/Trans";
import themeVariables from '_theme';
import { mngCurrentActiveEmployee } from "_features/mng-employee-management/redux/selectors";
import { mngEmTakeLeaveDataTypeByEmployee } from '../redux/selectors';
import {
    getMngEmTakeLeaveTypeDataByEmployee,
} from '../redux/actions';
import ButtonSubmit from "../../common/components/form/ButtonSubmit";
import NoResult from "../../common/components/NoResult";
import ColumnList from "../../common/components/ColumnList";

class MngEmProfileTakeLeaveScreen extends React.PureComponent {
    componentDidMount() {
        this.props.getMngEmTakeLeaveTypeDataByEmployee.request(this.props.currentActiveEmployee.id);
    }

    _renderTakeLeaveRemainingItem = ({item}) => {
        const remainingMin = item.remaining_minutes ? item.remaining_minutes : 0;

        return (
            <View style={s.ml3}>
                <ColumnList
                    label={item.type_name}
                    translateLabel={false}
                    data={`${item.remaining_days} ${Trans.tran('general.unit.day')} ${item.remaining_hours} ${Trans.tran('general.unit.hour')} ${remainingMin} ${Trans.tran('general.unit.min')}` }
                    containerStyle={styles.container}
                />
            </View>
        );
    };

    render() {
        const employee = this.props.currentActiveEmployee;
        const takeLeave = this.props.mngEmTakeLeaveDataTypeByEmployee;

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={employee} showTime={false} />
                <Content>
                    <View>
                        <View padder>
                            <CommonText
                                bold
                                text={Trans.tran('user.profile.profile_take_leave.remaining_days')}
                                style={s.mv1}
                            />
                            {!isEmpty(takeLeave)
                                ? <FlatList
                                    data={takeLeave}
                                    renderItem={this._renderTakeLeaveRemainingItem}
                                    keyExtractor={(item, index) => index.toString()}
                                /> : <NoResult />
                            }
                        </View>
                        <Hr style={s.mv0} />
                        <View whiteBackground padder>
                            <CommonText
                                bold
                                text={Trans.tran('mng.take_leave_approval.detail.approvers')}
                            />
                            <Managers employeeId={employee.id} />
                            <Hr style={s.mv0} />
                            <ButtonSubmit
                                onPress={() => this.props.navigationActions.navigate({
                                    routeName: 'MNG_EM_TAKE_LEAVE_CREATE'
                                })}
                                label="mng.take_leave.add.button"
                            />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

MngEmProfileTakeLeaveScreen.navigationOptions = {
    headerTitle: <HeaderTitle text={'mng.menus.employee_detail'} />,
};

const styles = StyleSheet.create({
    container: {
        marginBottom: themeVariables.sp1,
    },
});

export default connect(
    (state) => ({
        currentActiveEmployee: mngCurrentActiveEmployee(state),
        mngEmTakeLeaveDataTypeByEmployee: mngEmTakeLeaveDataTypeByEmployee(state),
    }),
    (dispatch) => ({
        getMngEmTakeLeaveTypeDataByEmployee: bindActionCreators(getMngEmTakeLeaveTypeDataByEmployee, dispatch),
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(MngEmProfileTakeLeaveScreen);
