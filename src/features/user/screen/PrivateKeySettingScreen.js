/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Alert, View } from 'react-native';
import { Container, Right, Switch } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import { userProfile } from '../redux/selectors';
import { PRIVATE_KEY } from '../router';

class PrivateKeySettingScreen extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    setPrivateKey = (value) => {
        this.props.navigation.navigate({
            routeName: PRIVATE_KEY,
            params: {
                firstSetting: value,
                fromPage: 'setting'
            }
        })
    };

    render() {
        return (
            <Container>
                <View style={s.pa3}>
                    <Trans
                        style={s.ml4}
                        t={'user.setting_private_key.manage_title'}
                        weight={'bold'}
                    />
                    <View style={s.flx_row}>
                        <Trans
                            style={s.ml4}
                            t={'user.setting_private_key.used'}
                        />
                        <Right style={s.mr4}>
                            <Switch
                                value={this.props.userProfile.is_private_password_required}
                                onValueChange={this.setPrivateKey}
                            />
                        </Right>
                    </View>
                </View>
            </Container>
        )
    }
}

PrivateKeySettingScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'user.setting_private_key.title'} />
});

export default connect(
    (state) => ({
        userProfile: userProfile(state)
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(PrivateKeySettingScreen)