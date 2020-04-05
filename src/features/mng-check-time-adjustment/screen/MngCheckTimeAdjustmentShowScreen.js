/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Content, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CheckTimeAdjustmentDetail from "_features/check-time-adjustment/components/CheckTimeAdjustmentDetail";
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import HeaderMainDataUser from "_features/common/components/HeaderMainDataUser";
import CommonText from "_features/common/components/CommonText";
import Hr from "_features/common/components/Hr";
import Managers from "_features/mng-core/containers/Managers";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import MngButtonSubmit from "_features/mng-core/components/MngButtonSubmit";
import PhoneCallButton from "_features/common/components/form/PhoneCallButton";
import MngModalRejectReason from "_features/mng-core/components/MngModalRejectReason";
import { mngApproveCheckTimeAdjustment, mngRejectCheckTimeAdjustment } from "../redux/actions";

class CheckTimeAdjustmentShowScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rejectModalVisible: false
        };
    }

    render() {
        const data = this.props.navigation.state.params;

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={data.employee} showTime={false} />
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
                        <Managers employeeId={data.employee.id} />
                    </View>
                    {data.state === 'requested' ?
                        <View whiteBackground>
                            <View padderHorizontal withSpace>
                                <PhoneCallButton phoneNumber={data.employee.mobile_phone} />
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
                                                    onPress: () => {this.props.mngApproveCheckTimeAdjustment.submit({id: data.id})}
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
                        this.props.mngRejectCheckTimeAdjustment.submit({
                            id: data.id,
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

CheckTimeAdjustmentShowScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'time_adjustment.show.title'} />
});

const styles = StyleSheet.create({
    labelElement: {
        marginLeft: themeVariables.sp0
    }
});

export default connect(
    null,
    (dispatch) => ({
        mngApproveCheckTimeAdjustment: bindActionCreators(mngApproveCheckTimeAdjustment, dispatch),
        mngRejectCheckTimeAdjustment: bindActionCreators(mngRejectCheckTimeAdjustment, dispatch),
    })
)(CheckTimeAdjustmentShowScreen);
