/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';
import HeaderTitle from '_features/common/components/HeaderTitle';
import { recheckDeviceAccess, logout } from '../redux/actions';

class ProfileScreen extends React.PureComponent {
    render() {
        return (
            <Container style={[styles.bg]}>
                <Trans
                    t={'user.device_permission_check.waiting_permission_access'}
                    style={[s.tc, s.black]}
                />
                <View style={styles.viewBorderWidth}>
                    <TouchableOpacity
                        style={styles.touchableButton}
                        onPress={this.props.recheckDeviceAccess}
                    >
                        <Trans
                            t={'user.device_permission_check.try_again'}
                            style={[s.white, s.tc]}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={this.props.logout.submit}
                    style={s.mt3}
                >
                    <Trans
                        t={'logout.title'}
                        style={s.muted}
                    />
                </TouchableOpacity>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: themeVariables.sp3
    },
    viewBorderWidth: {
        width: '100%',
        alignItems: 'center',
        marginTop: themeVariables.sp3,
        padding: themeVariables.sp1,
        borderWidth: 3,
        borderColor: themeVariables.primary,
        borderRadius: 30,
    },
    touchableButton: {
        width: '100%',
        paddingVertical: themeVariables.sp2,
        paddingHorizontal: themeVariables.sp3,
        backgroundColor: themeVariables.primary,
        borderRadius: 30,
    }
});

ProfileScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

ProfileScreen.navigationOptions = ({
    headerTitle: <HeaderTitle text={'user.device_permission_check.title'} />,
    headerStyle: {
        paddingLeft: themeVariables.sp3
    }
});

export default connect(
    null,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        logout: bindActionCreators(logout, dispatch),
        recheckDeviceAccess: bindActionCreators(recheckDeviceAccess, dispatch)
    })
)(ProfileScreen);
