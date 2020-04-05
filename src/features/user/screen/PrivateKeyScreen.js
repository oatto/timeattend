/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet, Alert } from 'react-native';
import { Container } from 'native-base';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { styles as s } from 'react-native-style-tachyons';
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import CommonText from "_features/common/components/CommonText";
import Trans from "_features/common/containers/Trans";
import { DASHBOARD } from "_features/common/router";
import VirtualKeyboard from '../components/VirtualKeyboard';
import { setUserPrivateKey, removeCheckedCurrentPrivateKey, checkedUserCurrentPrivateKey } from '../redux/actions';
import { userProfile } from '../redux/selectors';

class PrivateKeyScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passCode: [],
            oldPassCode: [],
            isConfirm: false,
            title: Trans.tran('user.setting_private_key.input_private_key')
        };
    }

    componentDidUpdate() {
        if (!!this.state.passCode[5]) {
            this._onFinishCheckingCode.call(this);
            // make sure no infinity loop
            this.setState({
                passCode: []
            });
        }
    }

    _checkText = (val) => {
        if (val !== 'back') {
            const addPass = [...this.state.passCode];
            addPass.push(val);
            this.setState({
                passCode: addPass
            });
        } else {
            const copyArr = [...this.state.passCode];
            copyArr.pop();
            this.setState({
                passCode: copyArr
            });
        }
    };

    _onFinishCheckingCode = () => {
        const navigationProps = this.props.navigation.state.params;

        const checkPassKeyArray = this.state.passCode;
        const checkPassKey = checkPassKeyArray.join("");

        if (navigationProps.fromPage === 'setting') {
            // first time create private password
            if (!navigationProps.firstSetting) {
                this.props.removePrivateKey.submit({currentPassword: checkPassKey});
                this.setState({passCode: []});

                return;
            }

            // is confirm submit
            if (this.state.isConfirm) {
                if (this.state.passCode.join("") === this.state.oldPassCode.join("")) {
                    Alert.alert(
                        Trans.tran('general.success'),
                        Trans.tran('user.setting_private_key.form_alert.complete_private_key'),
                        [{
                            text: Trans.tran('general.accept'),
                            onPress: () => {
                                this.setState({
                                    isConfirm: false,
                                    oldPassCode: [],
                                    passCode: [],
                                });
                                this.props.setPrivateKey.submit({
                                    plainPassword: checkPassKey
                                });
                            }
                        }]
                    );

                    return;
                }

                Alert.alert(
                    Trans.tran('user.setting_private_key.form_alert.private_key_not_match'),
                    Trans.tran('user.setting_private_key.form_alert.please_input_new_private_key'),
                    [{
                        text: Trans.tran('general.accept'),
                        onPress: () => {
                            this.setState({
                                oldPassCode: [],
                                isConfirm: false,
                                passCode: [],
                                title: Trans.tran('user.setting_private_key.form_alert.please_input_new_private_key')
                            })
                        }
                    }]
                );

                return;
            }

            // set new password
            Alert.alert(
                Trans.tran('user.setting_private_key.form_alert.confirm_private_key'),
                Trans.tran('user.setting_private_key.form_alert.please_input_private_key_again'),
                [{
                    text: 'ตกลง',
                    onPress: () => {
                        this.setState({
                            oldPassCode: checkPassKeyArray,
                            isConfirm: true,
                            passCode: [],
                            title: Trans.tran('user.setting_private_key.form_alert.please_input_private_key_again'),
                        });
                    }
                }]
            );

            return;
        }

        // on login private password
        this.props.checkedCurrentPrivateKey.submit({currentPassword: checkPassKey});
        this.setState({passCode: []});
    };

    _privateKeyBlock = () => {
        let views = [];

        for (let i = 0; i < 6; i++) {
            views.push(
                <View key={i} style={styles.borderView}>
                    <View style={[styles.checkView, {backgroundColor: this.state.passCode[i] ? 'black' : 'white'}]} />
                </View>
            )
        }

        return views;
    };

    render() {
        const textDisabled = !!this.state.passCode[5];
        return (
            <Container style={styles.container}>
                <CommonText text={this.state.title} size={40} weight={'bold'} style={s.tc} />
                <View style={styles.borderWrapper}>
                    {this._privateKeyBlock()}
                </View>
                <View style={styles.viewKeyboard}>
                    <VirtualKeyboard
                        pressMode={'string'}
                        decimal={false}
                        onPress={(val) => this._checkText(val)}
                        disableds={textDisabled}
                    />
                </View>
            </Container>
        )
    }
}

PrivateKeyScreen.navigationOptions = ({navigation}) => {
    let pageFrom = navigation.state.params.fromPage;

    if (pageFrom === 'init') {
        return {
            headerTitle: <HeaderTitle text={'user.setting_private_key.login_private_key'} />,
            headerLeft: null,
        }
    } else {
        return {
            headerTitle: <HeaderTitle text={'user.setting_private_key.title'} />
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    },
    borderWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: 280,
        height: 60,
        marginTop: 30,
        borderWidth: 2,
        borderRadius: 50
    },
    borderView: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: 'black',
        marginRight: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkView: {
        width: 20,
        height: 20,
        borderRadius: 50
    },
    viewKeyboard: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: '10%',
        marginTop: 40,
        borderTopWidth: 1
    }
});

export default connect(
    (state) => ({
        userProfile: userProfile(state)
    }),
    (dispatch) => ({
        setPrivateKey: bindActionCreators(setUserPrivateKey, dispatch),
        checkedCurrentPrivateKey: bindActionCreators(checkedUserCurrentPrivateKey, dispatch),
        removePrivateKey: bindActionCreators(removeCheckedCurrentPrivateKey, dispatch),
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(PrivateKeyScreen)
