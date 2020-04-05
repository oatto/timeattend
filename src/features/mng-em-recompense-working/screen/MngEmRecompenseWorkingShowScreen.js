/* eslint-disable react/prop-types */
import React from 'react';
import { Alert } from 'react-native';
import { Container, Content, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import CommonText from "_features/common/components/CommonText";
import Hr from "_features/common/components/Hr";
import Managers from "_features/mng-core/containers/Managers";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import themeVariables from '_theme';
import MngButtonSubmit from "_features/mng-core/components/MngButtonSubmit";
import MngModalRejectReason from "_features/mng-core/components/MngModalRejectReason";
import RecompenseWorkingDetail from '_features/recompense-working/components/RecompenseWorkingDetail';
import HeaderMainDataUser from "_features/common/components/HeaderMainDataUser";
import PhoneCallButton from "_features/common/components/form/PhoneCallButton";
import { mngCurrentActiveEmployee } from "_features/mng-employee-management/redux/selectors";
import { mngEmRecompenseWorkingAllApproveTransition, mngEmRecompenseWorkingAllRejectTransition } from '../redux/actions';

class MngEmRecompenseWorkingShowScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rejectModalVisible: false
        };
    }

    _getAllApprovalTransition = (state) => {
        return themeVariables.getMngApproveTransitionFromState(state);
    };

    _getAllRejectTransition = (state) => {
        return themeVariables.getMngRejectTransitionFromState(state);
    };

    render() {
        const data = this.props.navigation.state.params;
        const employee = this.props.mngCurrentActiveEmployee;
        const isRequested = data.state === 'requested';
        const isRequestedCancel = data.state === 'requested_cancel';
        const isApprove = data.state === 'approved';
        const isRejectedOrCancelled = data.state === 'rejected' || data.state === 'cancelled';

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={employee} showTime={false} />
                <Hr />
                <Content>
                    <View padder>
                        <RecompenseWorkingDetail data={data} />
                    </View>

                    <Hr style={s.mv0} />
                    <View whiteBackground padder>
                        <CommonText
                            text={Trans.tran('mng.take_leave_approval.detail.approvers')}
                            bold
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
                                        let stateAndTranslation = this._getAllApprovalTransition(data.state);

                                        if (isRequested) {
                                            stateAndTranslation.translationTitle = 'mng.recompense_works.alert_approve.title';
                                            stateAndTranslation.translationDescription = 'mng.recompense_works.alert_approve.descriptions';
                                        }

                                        Alert.alert(
                                            Trans.tran(stateAndTranslation.translationTitle),
                                            Trans.tran(stateAndTranslation.translationDescription),
                                            [
                                                { text: Trans.tran('general.cancel') },
                                                {
                                                    text: Trans.tran('general.confirm'),
                                                    onPress: () => {
                                                        this.props.mngEmRecompenseWorkingAllApproveTransition.submit({
                                                            id: data.id,
                                                            employeeId: employee.id,
                                                            transition: stateAndTranslation.state
                                                        })
                                                    }
                                                }
                                            ]
                                        );
                                    }}
                                    buttonLabel={'general.button.approved'}
                                    positionEnd
                                /> : null
                            }
                        </View>
                    </View>
                </Content>
                <MngModalRejectReason
                    isVisible={this.state.rejectModalVisible}
                    onConfirm={(values) => {
                        this.props.mngEmRecompenseWorkingAllRejectTransition.submit({
                            id: data.id,
                            employeeId: employee.id,
                            transition: this._getAllRejectTransition(data.state),
                            rejectedReason: values.rejectedReason
                        });

                        this.setState({
                            rejectModalVisible: false
                        })
                    }}
                    onClosePress={() => this.setState({rejectModalVisible: false})}
                />
            </Container>
        )
    }
}

MngEmRecompenseWorkingShowScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'recompense_working.show_screen.detail'} />
});

export default connect(
    (state) => ({
        mngCurrentActiveEmployee: mngCurrentActiveEmployee(state)
    }),
    (dispatch) => ({
        mngEmRecompenseWorkingAllApproveTransition: bindActionCreators(mngEmRecompenseWorkingAllApproveTransition, dispatch),
        mngEmRecompenseWorkingAllRejectTransition: bindActionCreators(mngEmRecompenseWorkingAllRejectTransition, dispatch),
    })
)(MngEmRecompenseWorkingShowScreen);
