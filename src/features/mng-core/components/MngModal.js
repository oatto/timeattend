/* eslint-disable react/prop-types */
import React from 'react';
import { Button, View } from 'native-base';
import PropTypes from 'prop-types';
import { Alert, StyleSheet } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import Modal from 'react-native-modal';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import { CloseIcon } from '_features/common/components/icons/AppIcons';

class MngModal extends React.PureComponent {
    render() {
        return (
            <Modal
                animationType="fade"
                visible={this.props.isVisible}
                onBackdropPress={this.props.onClosePress}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
                style={styles.modalContainer}
                {...this.props.modalProps}
            >
                <View style={styles.modalPosition}>
                    <View style={styles.modalInner}>
                        <View padder>
                            {this.props.title && <CommonText
                                text={this.props.title}
                                bold
                                style={[s.tc]}
                            />}
                            <Button
                                iconRight
                                transparent
                                title={null}
                                onPress={this.props.onClosePress}
                                style={[styles.buttonClose, s.pt0]}
                            >
                                <CloseIcon
                                    size={themeVariables.fs4}
                                    color={themeVariables.gray}
                                />
                            </Button>
                        </View>
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        )
    }
}

MngModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClosePress: PropTypes.func.isRequired,
    modalProps: PropTypes.object,
    title: PropTypes.string
};

MngModal.defaultProps = {
    title: null,
    modalProps: {}
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: themeVariables.modalBackgroundColor,
        margin: 0,
    },
    modalPosition: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalInner: {
        width: "85%",
        backgroundColor: themeVariables.white,
        borderRadius: themeVariables.borderRadiusLarge * 2,
    },
    buttonClose: {
        position: 'absolute',
        right: themeVariables.sp2,
        top: themeVariables.sp2
    },
});

export default MngModal
