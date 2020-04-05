/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { Alert, StyleSheet } from 'react-native';
import { Container, View } from 'native-base';
import themeVariables from '_theme';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import HeaderTitle from '_features/common/components/HeaderTitle';
import { userProfile } from '../redux/selectors';
import { regenerateEmployeeIdentifierToken } from "../redux/actions";
import Trans from "../../common/containers/Trans";
import { RefreshIcon } from "../../common/components/icons/AppIcons";
import ButtonSubmit from "../../common/components/form/ButtonSubmit";

class QrProfileScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onPress = this._onPress.bind(this);
    }

    _onPress() {
        Alert.alert(
            Trans.tran('user.profile.qr.regenerate'),
            Trans.tran('user.profile.qr.regenerate_hint'),
            [
                {
                    text: Trans.tran('general.confirm'),
                    onPress: () => this.props.regenerateEmployeeIdentifierToken.submit()
                },
                {text: Trans.tran('general.cancel')}
            ]
        );
    }

    render() {
        const {identifier_token} = this.props.employeeProfile;

        return (
            <Container style={styles.container}>
                <View style={styles.inner}>
                    <View style={styles.borderOutQrCode}>
                        <QRCode
                            value={identifier_token}
                            size={200}
                        />
                    </View>

                    <View style={{flexDirection: 'row', marginTop: themeVariables.sp3}}>
                        <ButtonSubmit
                            icon={<RefreshIcon />}
                            onPress={this._onPress}
                            label={'user.profile.qr.regenerate'}
                        />
                    </View>
                </View>
            </Container>
        )
    }
}

QrProfileScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

QrProfileScreen.navigationOptions = {
    headerTitle: <HeaderTitle text={'user.login.form.qr_code_profile'} />
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: themeVariables.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inner: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        width: 200 + (themeVariables.sp3 * 2) + (themeVariables.sp1 * 2)
    },
    borderOutQrCode: {
        borderWidth: themeVariables.sp1,
        padding: themeVariables.sp3,
        borderColor: themeVariables.primary
    }
});

export default connect(
    (state) => {
        return {
            employeeProfile: userProfile(state),
        };
    },
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        regenerateEmployeeIdentifierToken: bindActionCreators(regenerateEmployeeIdentifierToken, dispatch)
    })
)(QrProfileScreen);
