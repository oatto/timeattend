/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, View, Card, CardItem, Body } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { styles as s } from 'react-native-style-tachyons';
import Trans from "_features/common/containers/Trans";
import CommonLightBox from '_features/common/components/CommonLightBox';
import ref from 'react-native-core/utils/ref';
import CommonText from '_features/common/components/CommonText';
import { NavigateToLocationIcon, MapMarkerIcon, ShareIcon, UserIcon } from '_features/common/components/icons/AppIcons';
import HeaderTitle from '_features/common/components/HeaderTitle';
import ColumnWithIconList from '_features/common/components/ColumnWithIconList';
import getDirections from 'react-native-google-maps-directions';
import themeVariables from '_theme';
import ButtonSubmit from "_features/common/components/form/ButtonSubmit";

class LocationShowScreen extends React.PureComponent {
    NavigateToMap = (lat, lng) => {
        const data = {
            destination: {
                latitude: lat,
                longitude: lng
            }
        };

        getDirections(data);
    };

    render () {
        const { data } = this.props.navigation.state.params;
        let locationImage = ref(data, '_links.image.href');
        if (data.type === 'qr') {
            locationImage = data._qr_code_path;
        }
        return (
            <Container iPhoneXSupport withBackground>
                <Content>
                    <CommonLightBox>
                        <Image
                            style={styles.image}
                            resizeMode={'contain'}
                            source={
                                locationImage
                                    ? { uri: locationImage }
                                    : require('_public/images/no-image.png')

                            }
                        />
                    </CommonLightBox>
                    <View padder>
                        <Card withSpace>
                            <CardItem>
                                <Body>
                                    <View style={styles.detailContainer}>
                                        <View fill style={[styles.titleImage, s.pv1]}>
                                            <CommonText bold text={data.name} color={themeVariables.white} />
                                        </View>
                                        <View padderVertical>
                                            <ColumnWithIconList
                                                icon={<ShareIcon color={themeVariables.primary} />}
                                                data={`${Trans.tran('location_show.was_used')} ${data.check_total} ${Trans.tran('location_show.count')}`}
                                            />
                                            <ColumnWithIconList
                                                icon={<MapMarkerIcon color={themeVariables.primary} />}
                                                data={`${data.latitude}, ${data.longitude}`}
                                            />
                                            {ref(data, 'created_by.full_name') && (
                                                <ColumnWithIconList
                                                    icon={<UserIcon color={themeVariables.primary} />}
                                                    data={data.created_by.full_name}
                                                />
                                            )}
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
                <View withBackground padder>
                    <ButtonSubmit
                        onPress={() => this.NavigateToMap(data.latitude, data.longitude)}
                        icon={<NavigateToLocationIcon />}
                        label={'location_show.button_navigate'}
                        positionBottom
                    />
                </View>
            </Container>
        )
    }
}

LocationShowScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'location_show.title'} />,
});

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%'
    },
    titleImage: {
        backgroundColor: themeVariables.primary,
        alignItems: 'center',
        borderTopLeftRadius: themeVariables.borderRadiusLarge/2,
        borderTopRightRadius: themeVariables.borderRadiusLarge/2
    },
    detailContainer: {
        width: '100%'
    }
});

export default connect(
    null,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(LocationShowScreen);
