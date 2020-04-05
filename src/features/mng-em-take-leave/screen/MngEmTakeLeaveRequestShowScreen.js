/* eslint-disable react/prop-types */
import React from 'react';
import { Alert } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { styles as s } from 'react-native-style-tachyons';
import { Container, Content, View } from 'native-base';
import CommonText from '_features/common/components/CommonText';
import HeaderTitle from '_features/common/components/HeaderTitle';
import MngModalRejectReason from "_features/mng-core/components/MngModalRejectReason";
import HeaderMainDataUser from '_features/common/components/HeaderMainDataUser';
import Managers from "_features/mng-core/containers/Managers";
import Hr from '_features/common/components/Hr';
import themeVariables from '_theme';
import Trans from "_features/common/containers/Trans";
import TakeLeaveDetail from "_features/take-leave/components/TakeLeaveDetail";
import MngButtonSubmit from "_features/mng-core/components/MngButtonSubmit";
import { mngCurrentActiveEmployee } from "_features/mng-employee-management/redux/selectors";
import PhoneCallButton from "_features/common/components/form/PhoneCallButton";
import { mngEmTakeLeaveDataTypeByEmployee } from '../redux/selectors';
import {
    getMngEmTakeLeaveTypeDataByEmployee,
    mngEmTakeLeaveAllApproveTransition,
    mngEmTakeLeaveAllRejectTransition
} from '../redux/actions';

class MngEmTakeLeaveRequestShowScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rejectModalVisible: false
        }
    }

    componentDidMount() {
        this.props.getMngEmTakeLeaveTypeDataByEmployee.request(this.props.currentActiveEmployee.id);
    }

    _getAllApprovalTransition = (state) => {
        return themeVariables.getMngApproveTransitionFromState(state);
    };

    _getAllRejectTransition = (state) => {
        return themeVariables.getMngRejectTransitionFromState(state);
    };

    render() {
        const takeLeave = this.props.navigation.state.params;
        const employee = this.props.currentActiveEmployee;
        const isRequested = takeLeave.state === 'requested';
        const isRequestedCancel = takeLeave.state === 'requested_cancel';
        const isApprove = takeLeave.state === 'approved';
        const isRejectedOrCancelled = takeLeave.state === 'rejected' || takeLeave.state === 'cancelled';

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={employee} showTime={false} />
                <Hr />
                <Content>
                    <View>
                        <TakeLeaveDetail
                            data={takeLeave}
                            userTakeLeave={this.props.mngEmTakeLeaveDataTypeByEmployee}
                        />
                        <Hr style={s.mv0} />
                        <View whiteBackground padder>
                            <CommonText
                                bold
                                text={Trans.tran('mng.take_leave_approval.detail.approvers')}
                            />
                            <Managers employeeId={employee.id} />
                        </View>
                        <View whiteBackground>
                            <View padderHorizontal withSpace>
                                <PhoneCallButton phoneNumber={employee.mobile_phone} />
                            </View>

                            {!isRejectedOrCancelled ? <Hr style={s.mv0} /> : null}

                            <View padder style={s.flx_row}>
                                {(isRequested || isRequestedCancel) ?
                                    <MngButtonSubmit
                                        onPress={() => {
                                            this.setState({
                                                rejectModalVisible: true
                                            })
                                        }}
                                        buttonLabel="general.button.rejected"
                                    /> : isApprove ?
                                        <MngButtonSubmit
                                            onPress={() => {
                                                this.setState({
                                                    rejectModalVisible: true
                                                })
                                            }}
                                            buttonLabel="general.button.rejected"
                                            fullWidth
                                            positionEnd
                                        /> : null
                                }
                                {(!isRejectedOrCancelled && !isApprove) ?
                                    <MngButtonSubmit
                                        onPress={() => {
                                            let stateAndTranslation = this._getAllApprovalTransition(takeLeave.state);

                                            if (isRequested) {
                                                stateAndTranslation.translationTitle = 'mng.take_leave_approval.alert_approve.title';
                                                stateAndTranslation.translationDescription = 'mng.take_leave_approval.alert_approve.descriptions';
                                            }

                                            Alert.alert(
                                                Trans.tran(stateAndTranslation.translationTitle),
                                                Trans.tran(stateAndTranslation.translationDescription),
                                                [
                                                    { text: Trans.tran('general.cancel') },
                                                    {
                                                        text: Trans.tran('general.confirm'),
                                                        onPress: () => {
                                                            this.props.mngEmTakeLeaveAllApproveTransition.submit({
                                                                id: takeLeave.id,
                                                                employeeId: employee.id,
                                                                transition: stateAndTranslation.state
                                                            })
                                                        }
                                                    }
                                                ]
                                            );
                                        }}
                                        buttonLabel={isApprove ? 'general.button.rejected' : 'general.button.approved'}
                                        positionEnd
                                    /> : null
                                }
                            </View>
                        </View>
                    </View>
                </Content>
                <MngModalRejectReason
                    isVisible={this.state.rejectModalVisible}
                    onConfirm={(values) => {
                        this.props.mngEmTakeLeaveAllRejectTransition.submit({
                            id: takeLeave.id,
                            employeeId: employee.id,
                            transition: this._getAllRejectTransition(takeLeave.state),
                            rejectedReason: values.rejectedReason
                        });

                        this.setState({
                            rejectModalVisible: false
                        })
                    }}
                    onClosePress={() => this.setState({rejectModalVisible: false})}
                />
            </Container>
        );
    }
}

MngEmTakeLeaveRequestShowScreen.navigationOptions = {
    headerTitle: <HeaderTitle text={'mng.take_leave.title'} />,
};

export default connect(
    (state) => ({
        currentActiveEmployee: mngCurrentActiveEmployee(state),
        mngEmTakeLeaveDataTypeByEmployee: mngEmTakeLeaveDataTypeByEmployee(state),
    }),
    (dispatch) => ({
        getMngEmTakeLeaveTypeDataByEmployee: bindActionCreators(getMngEmTakeLeaveTypeDataByEmployee, dispatch),
        mngEmTakeLeaveAllApproveTransition: bindActionCreators(mngEmTakeLeaveAllApproveTransition, dispatch),
        mngEmTakeLeaveAllRejectTransition: bindActionCreators(mngEmTakeLeaveAllRejectTransition, dispatch)
    })
)(MngEmTakeLeaveRequestShowScreen);
