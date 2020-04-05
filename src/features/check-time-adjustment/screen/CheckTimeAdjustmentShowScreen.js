/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Content, View } from 'native-base';
import { Alert, StyleSheet } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import { CloseIcon } from '_features/common/components/icons/AppIcons';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Hr from '_features/common/components/Hr';
import { userProfile } from '_features/user/redux/selectors';
import { rejectedTimeAdjustment } from '../redux/actions';
import CheckTimeAdjustmentDetail from "../components/CheckTimeAdjustmentDetail";
import ButtonSubmit from "../../common/components/form/ButtonSubmit";
import Trans from "../../common/containers/Trans";

class CheckTimeAdjustmentShowScreen extends React.PureComponent {
    render() {
        const data = this.props.navigation.state.params;

        return (
            <Container iPhoneXSupport>
                <Content whiteBackground>
                    <CheckTimeAdjustmentDetail data={data} />
                    <Hr />
                </Content>
                {data.state === 'requested' ?
                    <View padder>
                        <ButtonSubmit
                            onPress={() => {
                                Alert.alert(
                                    Trans.tran('time_adjustment.alert.cancel_request'),
                                    Trans.tran('time_adjustment.alert.cancel_request_description'),
                                    [
                                        {
                                            text: Trans.tran('general.confirm'),
                                            onPress: () => this.props.rejectedTimeAdjustment.submit(data.id)
                                        },
                                        {text: Trans.tran('general.cancel')}
                                    ]
                                );
                            }}
                            icon={<CloseIcon size={themeVariables.fs5} style={s.mr1} />}
                            label='time_adjustment.show.cancel_list'
                            buttonStyle={styles.button}
                            gradientBackground={false}
                            positionBottom
                        />
                    </View>
                    : <View />
                }
            </Container>
        )
    }
}

CheckTimeAdjustmentShowScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'time_adjustment.show.title'} />,
    headerStyle: {
        elevation: 0,
        backgroundColor: themeVariables.primary
    }
});

const styles = StyleSheet.create({
    button: {
        backgroundColor: themeVariables.gray
    },
});

export default connect(
    (state) => ({
        userProfile: userProfile(state)
    }),
    (dispatch) => ({
        rejectedTimeAdjustment: bindActionCreators(rejectedTimeAdjustment, dispatch)
    })
)(CheckTimeAdjustmentShowScreen);
