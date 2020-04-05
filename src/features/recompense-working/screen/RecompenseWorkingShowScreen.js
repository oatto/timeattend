/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { Container, Content, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import { CloseIcon } from '_features/common/components/icons/AppIcons';
import HeaderTitle from '_features/common/components/HeaderTitle';
import { recompenseWorkingAllCancelTransition } from '_features/recompense-working/redux/actions';
import RecompenseWorkingDetail from "../components/RecompenseWorkingDetail";
import ButtonSubmit from "../../common/components/form/ButtonSubmit";
import Trans from "../../common/containers/Trans";

class RecompenseWorkingShowScreen extends React.PureComponent {
    _getTransition = (state) => {
        return themeVariables.getTransitionForState(state);
    };

    render() {
        const data = this.props.navigation.state.params;

        return (
            <Container iPhoneXSupport>
                <Content whiteBackground>
                    <View padder>
                        <RecompenseWorkingDetail
                            data={data}
                        />
                    </View>
                </Content>

                {(data.state === 'requested' || data.state === 'approved' || data.state === 'requested_cancel') ?
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
                                            onPress: () => this.props.recompenseWorkingAllCancelTransition.submit({
                                                id: data.id,
                                                transition: stateAndTranslation.state
                                            })
                                        },
                                        {text: Trans.tran('general.cancel')}
                                    ]
                                );
                            }}
                            label={'time_adjustment.show.cancel_list'}
                            icon={<CloseIcon />}
                            buttonStyle={s.bg_gray}
                            positionBottom
                        />
                    </View> : null
                }
            </Container>
        )
    }
}

RecompenseWorkingShowScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'recompense_working.work_show_screen.change_the_date_of_work'} />,
    headerStyle: {
        elevation: 0,
        backgroundColor: themeVariables.primary
    }
});

export default connect(
    null,
    (dispatch) => ({
        recompenseWorkingAllCancelTransition: bindActionCreators(recompenseWorkingAllCancelTransition, dispatch)
    })
)(RecompenseWorkingShowScreen);
