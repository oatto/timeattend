import React from 'react';
import {Button} from "native-base";
import {View, StyleSheet} from "react-native";
import {styles as s} from "react-native-style-tachyons";
import PropTypes from "prop-types";
import themeVariables from '_theme';
import MngModalMobileDevice from "../../components/MngModalMobileDevice";
import MngModal from "../../components/MngModal";
import Trans from "../../../common/containers/Trans";
import MngMobileDeviceDetail from "../../components/MngMobileDeviceDetail";
import Hr from "../../../common/components/Hr";
import CommonText from "../../../common/components/CommonText";

export default function withMobileDeviceTab(WrappedComponent) {
    return class extends React.Component {
        static propTypes = {
            mngPublicMobileDevice: PropTypes.object.isRequired,
        };

        constructor(props) {
            super(props);

            this.state = {
                modalVisible: false,
                modalMobileDeviceVisible: false,
                modalMobileDeviceActionsVisible: false,
                activeData: {},
            };
        }

        render() {
            return (
                <View style={{flex: 1}}>
                    <WrappedComponent {...this.props} setWrapperState={(state) => this.setState(state)} />

                    <MngModalMobileDevice
                        isVisible={this.state.modalMobileDeviceVisible}
                        onConfirm={(values) => {
                            this.props.mngPublicMobileDevice.submit({
                                id: this.state.activeData.id,
                                name: values.name,
                                publicDevice: true
                            });

                            this.setState({
                                modalMobileDeviceVisible: false,
                                activeData: {}
                            })
                        }}
                        modalProps={{
                            animationType: 'none'
                        }}
                        defaultName={this.state.activeData.name}
                        onClosePress={() => this.setState({modalMobileDeviceVisible: false})}
                    />
                    <MngModal
                        isVisible={this.state.modalVisible}
                        title={this.state.activeData.public_device ? Trans.tran('mng.core.mobile_device.modal.title_public') : Trans.tran('mng.core.mobile_device.modal.title')}
                        onClosePress={() => this.setState({modalVisible: false})}
                        modalProps={{
                            animationType: 'none'
                        }}
                    >
                        {this.state.activeData.model && (
                            <View>
                                <View style={[s.ph3, s.pb3]}>
                                    <MngMobileDeviceDetail
                                        data={this.state.activeData}
                                    />
                                </View>
                                <Hr style={s.mv0} />
                                <View style={s.flx_row}>
                                    <Button
                                        title={null}
                                        actionModalHalf
                                        style={styles.buttonBorder}
                                        onPress={() => {
                                            this.setState({
                                                modalVisible: false,
                                            });
                                        }}
                                    >
                                        <CommonText text={Trans.tran('general.cancel')} />
                                    </Button>
                                    <Button
                                        title={null}
                                        actionModalHalf
                                        onPress={() => {
                                            if (this.state.activeData.public_device) {
                                                this.props.mngPublicMobileDevice.submit({
                                                    id: this.state.activeData.id,
                                                    name: this.state.activeData.name,
                                                    publicDevice: false
                                                });

                                                this.setState({
                                                    modalMobileDeviceVisible: false,
                                                    modalVisible: false,
                                                    activeData: {}
                                                });

                                                return;
                                            }

                                            this.setState({
                                                modalVisible: false,
                                                modalMobileDeviceVisible: true,
                                            });
                                        }}
                                    >
                                        <CommonText
                                            text={this.state.activeData.public_device
                                                ? Trans.tran('mng.core.mobile_device.button.make_public')
                                                : Trans.tran('mng.core.mobile_device.button.delete_public')}
                                        />
                                    </Button>
                                </View>
                            </View>
                        )}
                    </MngModal>
                    <MngModal
                        isVisible={this.state.modalMobileDeviceActionsVisible}
                        title={Trans.tran('mng.core.mobile_device.modal_actions.title')}
                        onClosePress={() => this.setState({modalMobileDeviceActionsVisible: false})}
                        modalProps={{
                            animationType: 'none'
                        }}
                    >
                        <View>
                            <Hr style={s.mv0} />
                            <View style={s.flx_row}>
                                <Button
                                    title={null}
                                    actionModalHalf
                                    style={styles.buttonBorder}
                                    onPress={() => {
                                        this.setState({
                                            modalMobileDeviceActionsVisible: false,
                                            modalVisible: false,
                                            modalMobileDeviceVisible: true,
                                        });
                                    }}
                                >
                                    <CommonText text={Trans.tran('mng.core.mobile_device.modal_actions.button.edit_name')} />
                                </Button>
                                <Button
                                    title={null}
                                    actionModalHalf
                                    onPress={() => {
                                        this.setState({
                                            modalMobileDeviceActionsVisible: false,
                                            modalVisible: true,
                                            modalMobileDeviceVisible: false,
                                        });
                                    }}
                                >
                                    <CommonText text={Trans.tran('mng.core.mobile_device.modal_actions.button.delete_public')} />
                                </Button>
                            </View>
                        </View>
                    </MngModal>
                </View>
            );
        }
    };
}

const styles = StyleSheet.create({
    buttonBorder: {
        borderRightWidth: themeVariables.borderWidth,
        borderColor: themeVariables.grayLighter,
    },
});
