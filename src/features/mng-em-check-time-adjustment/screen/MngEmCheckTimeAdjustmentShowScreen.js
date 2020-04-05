/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Content, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CheckTimeAdjustmentDetail from "_features/check-time-adjustment/components/CheckTimeAdjustmentDetail";
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import CommonText from "_features/common/components/CommonText";
import Hr from "_features/common/components/Hr";
import Managers from "_features/mng-core/containers/Managers";
import PhoneCallButton from '_features/common/components/form/PhoneCallButton';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import MngButtonSubmit from "_features/mng-core/components/MngButtonSubmit";
import MngModalRejectReason from "_features/mng-core/components/MngModalRejectReason";
import HeaderMainDataUser from "_features/common/components/HeaderMainDataUser";
import { mngCurrentActiveEmployee } from "_features/mng-employee-management/redux/selectors";
import { mngEmCheckTimeAdjustmentApproved, mngEmCheckTimeAdjustmentRejected } from '../redux/actions';

class MngEmCheckTimeAdjustmentShowScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rejectModalVisible: false
        };
    }

    render() {
        const data = this.props.navigation.state.params;
        const employee = this.props.mngCurrentActiveEmployee;

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={employee} showTime={false} />
                <Hr />
                <Content>
                    <CheckTimeAdjustmentDetail
                        data={data}
                        labelElement={styles.labelElement}
                    />
                    <Hr style={s.mv0} />
                    <View whiteBackground padder>
                        <CommonText
                            text={Trans.tran('mng.take_leave_approval.detail.approvers')}
                            bold
                        />
                        <Managers employeeId={employee.id} />
                    </View>
                    {data.state === 'requested' ?
                        <View whiteBackground>
                            <View padderHorizontal withSpace>
                                <PhoneCallButton phoneNumber={employee.mobile_phone} />
                            </View>
                            <Hr style={s.mv0} />
                            <View padder style={s.flx_row}>
                                <MngButtonSubmit
                                    onPress={() => {
                                        this.setState({
                                            rejectModalVisible: true
                                        })
                                    }}
                                    buttonLabel="general.button.rejected"
                                />
                                <MngButtonSubmit
                                    onPress={() => {
                                        Alert.alert(
                                            Trans.tran('mng.check_time_adjustment.alert_approve.title'),
                                            Trans.tran('mng.check_time_adjustment.alert_approve.descriptions'),
                                            [
                                                {text: Trans.tran('general.cancel')},
                                                {
                                                    text: Trans.tran('general.confirm'),
                                                    onPress: () => {this.props.mngEmCheckTimeAdjustmentApproved.submit({
                                                        id: data.id,
                                                        employeeId: employee.id
                                                    })}
                                                }
                                            ]
                                        );
                                    }}
                                    buttonLabel="general.button.approved"
                                    positionEnd
                                />
                            </View>
                        </View> : <View />
                    }
                </Content>
                <MngModalRejectReason
                    isVisible={this.state.rejectModalVisible}
                    onConfirm={(values) => {
                        this.props.mngEmCheckTimeAdjustmentRejected.submit({
                            id: data.id,
                            employeeId: employee.id,
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

MngEmCheckTimeAdjustmentShowScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'time_adjustment.show.title'} />
});

const styles = StyleSheet.create({
    labelElement: {
        marginLeft: themeVariables.sp0
    }
});

export default connect(
    (state) => ({
        mngCurrentActiveEmployee: mngCurrentActiveEmployee(state)
    }),
    (dispatch) => ({
        mngEmCheckTimeAdjustmentApproved: bindActionCreators(mngEmCheckTimeAdjustmentApproved, dispatch),
        mngEmCheckTimeAdjustmentRejected: bindActionCreators(mngEmCheckTimeAdjustmentRejected, dispatch)
    })
)(MngEmCheckTimeAdjustmentShowScreen);
