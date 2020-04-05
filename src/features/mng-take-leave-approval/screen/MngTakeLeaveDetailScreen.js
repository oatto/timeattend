/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {Container, Content, Spinner, View} from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import { connect } from "react-redux";
import themeVariables from '_theme';
import Trans from "_features/common/containers/Trans";
import CommonText from '_features/common/components/CommonText';
import Hr from '_features/common/components/Hr';
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderMainDataUser from '_features/common/components/HeaderMainDataUser';
import MngModalRejectReason from "_features/mng-core/components/MngModalRejectReason";
import Managers from "_features/mng-core/containers/Managers";
import TakeLeaveDetail from "_features/take-leave/components/TakeLeaveDetail";
import MngButtonSubmit from "_features/mng-core/components/MngButtonSubmit";
import PhoneCallButton from "_features/common/components/form/PhoneCallButton";
import { fetchMngTakeLeaveDetailWithData, mngTakeLeaveAllApproveTransition, mngTakeLeaveAllRejectTransition } from '../redux/actions';
import { mngIsTakeLeaveDetailLoading, mngEmployeeTakeLeave } from '../redux/selectors';

class MngTakeLeaveDetailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rejectModalVisible: false
        }
    }

    componentDidMount() {
        this.props.fetchMngTakeLeaveDetailWithData(this.props.navigation.state.params);
    }

    _getAllApprovalTransition = (state) => {
        return themeVariables.getMngApproveTransitionFromState(state);
    };

    _getAllRejectTransition = (state) => {
        return themeVariables.getMngRejectTransitionFromState(state);
    };

    render() {
        const data = this.props.navigation.state.params;
        const isRequested = data.state === 'requested';
        const isRequestedCancel = data.state === 'requested_cancel';
        const isApprove = data.state === 'approved';
        const isRejectedOrCancelled = data.state === 'rejected' || data.state === 'cancelled';

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={data.employee} showTime={false} />
                <Hr />
                <Content>
                    {this.props.isLoading
                        ? <Spinner color={themeVariables.brandPrimary} />
                        :
                        (
                            <View>
                                <TakeLeaveDetail
                                    data={data}
                                    userTakeLeave={this.props.employeeTakeLeaveData[data.employee.id]}
                                />
                                <Hr style={s.mv0} />
                                <View whiteBackground padder>
                                    <CommonText
                                        text={Trans.tran('mng.take_leave_approval.detail.approvers')}
                                        bold
                                    />
                                    <Managers employeeId={data.employee.id} />
                                </View>
                                <View whiteBackground>
                                    <View padderHorizontal withSpace>
                                        <PhoneCallButton phoneNumber={data.employee.mobile_phone} />
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
                                            /> :
                                            isApprove ?
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
                                                                    this.props.mngTakeLeaveAllApproveTransition.submit({
                                                                        id: data.id,
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
                            </View>
                        )
                    }
                </Content>
                <MngModalRejectReason
                    isVisible={this.state.rejectModalVisible}
                    onConfirm={(values) => {
                        this.props.mngTakeLeaveAllRejectTransition.submit({
                            id: data.id,
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

MngTakeLeaveDetailScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

MngTakeLeaveDetailScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'take_leave_request.take_leave_detail.title'} />,
});

export default connect(
    (state) => ({
        employeeTakeLeaveData: mngEmployeeTakeLeave(state),
        isLoading: mngIsTakeLeaveDetailLoading(state)
    }),
    (dispatch) => ({
        fetchMngTakeLeaveDetailWithData: bindActionCreators(fetchMngTakeLeaveDetailWithData, dispatch),
        mngTakeLeaveAllApproveTransition: bindActionCreators(mngTakeLeaveAllApproveTransition, dispatch),
        mngTakeLeaveAllRejectTransition: bindActionCreators(mngTakeLeaveAllRejectTransition, dispatch),
    })
)(MngTakeLeaveDetailScreen);
