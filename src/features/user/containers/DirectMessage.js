/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Container } from "native-base";
import Modal from 'react-native-modal';
import { bindActionCreators } from 'redux';
import { Alert, View, StyleSheet } from 'react-native';
import ref from 'react-native-core/utils/ref';
import { styles as s } from "react-native-style-tachyons";
import Trans from "_features/common/containers/Trans";
import Hr from "_features/common/components/Hr";
import CommonText from "_features/common/components/CommonText";
import { CloseIcon } from "_features/common/components/icons/AppIcons";
import { directMessageCloseRequest } from '../redux/actions';
import { isDirectMessageVisible, directMessageNotification } from '../redux/selectors';
import themeVariables from "../../../../native-base-theme/variables/platform";

class DirectMessage extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onClosePress = this._onClosePress.bind(this);
    }

    _onClosePress() {
        Alert.alert(Trans.tran('direct_message.close'), null, [
            {text: Trans.tran('general.cancel')},
            {text: Trans.tran('general.close'), onPress: () => this.props.closeModal()},
        ])
    }

    render() {
        const { isVisible, notification } = this.props;
        const messages = ref(notification, 'payload.body');

        return (
            <Container style={{position: 'absolute', display: isVisible ? 'flex' : 'none'}}>
                <Modal
                    animationType="fade"
                    visible={isVisible}
                    onBackdropPress={this._onClosePress}
                    style={styles.modalContainer}
                    {...this.props.modalProps}
                >
                    <View style={styles.modalPosition}>
                        <View style={styles.modalInner}>
                            <View padder>
                                <CommonText
                                    text={Trans.tran('general.notice')}
                                    bold
                                    style={[s.tc, s.f6, s.mv2]}
                                />
                                <Hr />
                                <CommonText
                                    text={messages}
                                    style={[s.tc, s.f6, s.ma2]}
                                />
                                <Button
                                    iconRight
                                    transparent
                                    title={null}
                                    onPress={this._onClosePress}
                                    style={[styles.buttonClose, s.pt0]}
                                >
                                    <CloseIcon
                                        size={themeVariables.fs4}
                                        color={themeVariables.gray}
                                    />
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Container>
        )
    }
}

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
        right: 15,
        top: 5
    },
});

export default connect(
    (state) => ({
        isVisible: isDirectMessageVisible(state),
        notification: directMessageNotification(state)
    }),
    (dispatch) => ({
        closeModal: bindActionCreators(directMessageCloseRequest, dispatch)
    })
)(DirectMessage);
