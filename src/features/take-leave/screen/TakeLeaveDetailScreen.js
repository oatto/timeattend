/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, View } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import themeVariables from '_theme';
import { CloseIcon } from '_features/common/components/icons/AppIcons';
import HeaderTitle from '_features/common/components/HeaderTitle';
import { userProfile } from "_features/user/redux/selectors";
import ButtonSubmit from "_features/common/components/form/ButtonSubmit";
import { takeLeaveAllCancelTransition } from "../redux/actions";
import TakeLeaveDetail from "../components/TakeLeaveDetail";
import Trans from "../../common/containers/Trans";

class TakeLeaveDetailScreen extends Component {
    _getTransition = (state) => {
        return themeVariables.getTransitionForState(state);
    };

    render() {
        const data = this.props.navigation.state.params;

        return (
            <Container iPhoneXSupport>
                <Content whiteBackground>
                    <TakeLeaveDetail data={data} />
                </Content>

                {(data.state === 'requested' || data.state === 'approved' || data.state === 'requested_cancel')?
                    <View padder>
                        <ButtonSubmit
                            onPress={() => {
                                const stateAndTranslation = this._getTransition(data.state);

                                Alert.alert(
                                    Trans.tran(stateAndTranslation.translationTitle),
                                    Trans.tran(stateAndTranslation.translationDescription),
                                    [
                                        {
                                            text: Trans.tran('general.confirm'),
                                            onPress: () => this.props.takeLeaveAllCancelTransition.submit({
                                                id: data.id,
                                                transition: stateAndTranslation.state
                                            })
                                        },
                                        {text: Trans.tran('general.cancel')}
                                    ]
                                );
                            }}
                            icon={<CloseIcon />}
                            label={'take_leave_request.take_leave_detail.form.btn_cancel'}
                            buttonStyle={styles.button}
                            gradientBackground={false}
                            positionBottom
                        />
                    </View> : <View />
                }
            </Container>
        )
    }
}

TakeLeaveDetailScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

TakeLeaveDetailScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'take_leave_request.take_leave_detail.title'} />,
});

const styles = StyleSheet.create({
    button: {
        backgroundColor: themeVariables.gray,
    },
});

export default connect(
    (state) => ({
        user: userProfile(state),
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        takeLeaveAllCancelTransition: bindActionCreators(takeLeaveAllCancelTransition, dispatch)
    })
)(TakeLeaveDetailScreen);
