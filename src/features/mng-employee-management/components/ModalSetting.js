/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Modal from 'react-native-modal';
import { bindActionCreators } from "redux";
import { Switch, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Trans from '_features/common/containers/Trans';
import ref from 'react-native-core/utils/ref';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import { SettingIcon } from '_features/common/components/icons/AppIcons';
import { mngEmployeePushNotificationSetting } from "_features/mng-employee-management/redux/selectors";
import { mngUpdateEmployeePushNotificationSetting, mngGetEmployeePushNotificationSetting } from "_features/mng-employee-management/redux/actions";

class ModalSetting extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            settingModalVisible: false
        };

        this._onPressSetting = this._onPressSetting.bind(this);
        this._onToggleSwitch = this._onToggleSwitch.bind(this);
    }

    componentDidMount() {
        this.props.mngGetEmployeePushNotificationSetting.request({ employeeId: this.props.employeeId });
    }

    _onPressSetting() {
        this.setState({
            settingModalVisible: !this.state.settingModalVisible,
            isSwitchOn: ref(this.props.mngEmployeePushNotificationSetting, 'checked_notify')
        });
    }

    _onToggleSwitch(value) {
        this.props.mngUpdateEmployeePushNotificationSetting.submit({
            employeeId: this.props.employeeId,
            checkedNotify: value,
        });

        this.setState({
            isSwitchOn: value
        })
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this._onPressSetting} style={styles.settingIcon}>
                    <SettingIcon size={themeVariables.ifs4} />
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    visible={this.state.settingModalVisible}
                    onBackdropPress={this._onPressSetting}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalPosition}>
                        <View style={styles.modalInner}>
                            <View padder>
                                <CommonText bold text={Trans.tran('mng.employee_management.modal.setting')} />
                                <View row style={s.mt2}>
                                    <Switch
                                        value={this.state.isSwitchOn}
                                        onValueChange={(value) => {this._onToggleSwitch(value)}}
                                    />
                                    <View padderHorizontal>
                                        <CommonText text={Trans.tran('mng.employee_management.modal.notify_check_time')} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

ModalSetting.propTypes = {
    employeeId: PropTypes.number.isRequired,
    modalProps: PropTypes.object,
    employeeNotificationSetting: PropTypes.object,
    title: PropTypes.string
};

ModalSetting.defaultProps = {
    title: null,
    modalProps: {},
    employeeNotificationSetting: {},
};

const styles = StyleSheet.create({
    settingIcon: {
        width: 35,
    },
    modalContainer: {
        backgroundColor: themeVariables.modalBackgroundColor,
        margin: 0,
    },
    modalPosition: {
        position: 'absolute',
        top: 70,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    modalInner: {
        width: "90%",
        backgroundColor: themeVariables.white,
        borderRadius: themeVariables.borderRadiusLarge * 2,
    },
    buttonClose: {
        position: 'absolute',
        right: themeVariables.sp2,
        top: themeVariables.sp2
    },
});

export default connect(
    (state) => ({
        mngEmployeePushNotificationSetting: mngEmployeePushNotificationSetting(state),
    }),
    (dispatch) => ({
        mngGetEmployeePushNotificationSetting: bindActionCreators(mngGetEmployeePushNotificationSetting, dispatch),
        mngUpdateEmployeePushNotificationSetting: bindActionCreators(mngUpdateEmployeePushNotificationSetting, dispatch),
    })
)(ModalSetting);
