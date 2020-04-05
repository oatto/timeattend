/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { styles as s } from 'react-native-style-tachyons';
import { getLocaleCode} from 'react-native-core/features/common/redux/selectors';
import { StyleSheet, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Container, Button, View } from 'native-base';
import Trans from "_features/common/containers/Trans";
import CommonText from '_features/common/components/CommonText';
import GradientBackground from "_features/common/components/GradientBackground";
import { QRIcon } from "_features/common/components/icons/AppIcons";
import themeVariable from '_theme';
import { login} from '../redux/actions';
import LoginForm, {validate } from '../forms/LoginForm';
import { lastUsername, isAnon } from '../redux/selectors';
import { LOGIN_QR } from '../router';

class LoginScreen extends React.PureComponent {
    render() {
        if (!this.props.isAnon) {
            return <View />;
        }

        return (
            <Container>
                <GradientBackground
                    start={{x: 0, y: 0.3}}
                    end={{x: 0.1, y: 0}}
                >
                    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                        <View padder style={styles.mainContainer}>
                            <View style={styles.logoSection}>
                                <Image source={require('_public/images/app-logo-white.png')} />
                            </View>
                            <KeyboardAvoidingView behavior={themeVariable.keyboardBehavior} keyboardVerticalOffset={themeVariable.keyboardVerticalOffset}>
                                <LoginForm
                                    initialValues={{username: this.props.lastUsername}}
                                    onSubmit={(values) => {
                                        if (validate(values)) {
                                            this.props.login.submit({formData: values});
                                        }
                                    }}
                                />
                            </KeyboardAvoidingView>
                            <View>
                                <View padderVertical style={styles.lineDivideContainer}>
                                    <View style={styles.lineDivide} />
                                    <Trans
                                        t={'user.login.or'}
                                        style={styles.lineDivideText}
                                    />
                                    <View style={styles.lineDivide} />
                                </View>
                                <View style={styles.btnQrContainer}>
                                    <Button
                                        full
                                        rounded
                                        transparent
                                        style={styles.btnQrInner}
                                        onPress={() => this.props.navigationActions.navigate({routeName: LOGIN_QR})}
                                    >
                                        <QRIcon size={themeVariable.fs4} color={themeVariable.textColor} />
                                        <CommonText
                                            bold
                                            text={Trans.tran('user.login.qr')}
                                            style={[styles.btnQrText]}
                                        />
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </GradientBackground>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        marginBottom: themeVariable.sp4/1.4,
        flex: 1
    },
    logoSection: {
        flexGrow: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    logo: {
        alignSelf: 'center'
    },
    lineDivideContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    lineDivide: {
        height: 2,
        flexGrow: 1,
        alignSelf: 'center',
        backgroundColor: themeVariable.white,
    },
    lineDivideText: {
        backgroundColor: themeVariable.transparent,
        padding: themeVariable.sp2,
        color: themeVariable.white,
        fontSize: themeVariable.fs6
    },
    btnQrContainer: {
        borderRadius: themeVariable.borderRadiusLarge,
        backgroundColor: themeVariable.white,
    },
    btnQrInner: {
        paddingTop: themeVariable.sp1,
        paddingBottom: themeVariable.sp1,
        alignSelf: 'center',
    },
    btnQrText: {
        lineHeight: themeVariable.isAndroid ? themeVariable.inputHeightBase : 0,
        color: themeVariable.black
    }
});

export default connect(
    (state) => ({
        locale: getLocaleCode(state),
        lastUsername: lastUsername(state),
        isAnon: isAnon(state),
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        login: bindActionCreators(login, dispatch),
    })
)(LoginScreen);
