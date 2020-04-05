/* eslint-disable react/prop-types */
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import { Container, Content, View, Card, CardItem } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import CommonLightBox from '_features/common/components/CommonLightBox';
import ref from 'react-native-core/utils/ref';
import MapView, { Marker, Circle } from 'react-native-maps';
import themeVariables from "_theme";
import Trans from '_features/common/containers/Trans';
import { SaveIcon, MapMarkerIcon } from '_features/common/components/icons/AppIcons';
import { CommonTextarea, CommonButtonTakeWithCropImage } from '_features/common/components/form/index';
import HeaderTitle from '_features/common/components/HeaderTitle';
import CommonText from '_features/common/components/CommonText';
import CurrentTime from '_features/common/components/CurrentTime';
import ButtonSubmit from "_features/common/components/form/ButtonSubmit";
import { createOutsideCheckIn, createOutsideCheckOut } from '_features/check-time-outside/redux/actions';
import { _userHasPermission, userProfile } from "_features/user/redux/selectors";
import { createCheckIn, createCheckOut } from '../redux/actions';

class CheckTimeScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            imageFile: ''
        }
    }

    componentDidMount() {
        this.props.getServerTime.request();
    }

    render() {
        const {deviceLatitude, deviceLongitude, place, checkType} = this.props.navigation.state.params;
        let formData = {
            checkLatitude: deviceLatitude,
            checkLongitude: deviceLongitude,
            place: place.id,
            note: null
        };

        const isCheckIn = checkType.typeValue === 'check-in';
        const isOutside = checkType.typeName === 'outside';
        const typePermission = isOutside ? 'requied_picture_check_time_outside' : 'requied_picture_check_time_daily';
        const image = ref(place._links, 'image');

        const latitude = place.latitude;
        const longitude = place.longitude;

        return (
            <Container iPhoneXSupport>
                <Content>
                    <View>
                        <MapView
                            style={styles.map}
                            provider={'google'}
                            initialRegion={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.0050,
                                longitudeDelta: 0.0050
                            }}
                        >
                            <Circle
                                center={{
                                    latitude: latitude,
                                    longitude: longitude,
                                }}
                                radius={place.area_range}
                                fillColor={'rgba(144,195,246,0.3)'}
                                strokeWidth={0}
                            />
                            <Marker
                                coordinate={{latitude: deviceLatitude, longitude: deviceLongitude}}
                                title={Trans.tran('location.your_location')}
                                image={require('_public/images/map/marker-human.png')}
                                zIndex={2}
                            />
                            <Marker
                                coordinate={{latitude: place.latitude, longitude: place.longitude}}
                                title={place.name}
                                image={require('_public/images/map/marker-build.png')}
                                zIndex={1}
                            />
                        </MapView>
                    </View>
                    <View padder>
                        <Card>
                            <CardItem padder>
                                <View style={styles.viewDateTime}>
                                    <CurrentTime format={`${Trans.tran('general.unit.before_date')}dddd LL`} />
                                    <CurrentTime
                                        format={'HH:mm:ss'}
                                        textProps={{
                                            bold: true,
                                            style: s.f2
                                        }}
                                    />
                                    <View style={styles.commentTextView}>
                                        <CommonTextarea
                                            style={styles.commentTextArea}
                                            placeholder={Trans.tran('check_time.form.placeholder.comment')}
                                            onChangeText={(value) => formData.note = value}
                                        />
                                    </View>
                                    {_userHasPermission(this.props.user, typePermission) ?
                                        <View style={[styles.imageRequiredView]}>
                                            <CommonText text={'รูปภาพหลักฐานการเข้างาน'} />
                                            { this.state.imageFile ?
                                                <View style={styles.imageView}>
                                                    <Image
                                                        source={{uri: this.state.imageFile}}
                                                        style={styles.image}
                                                        resizeMode={'contain'}
                                                    />
                                                </View> : null
                                            }
                                            <CommonButtonTakeWithCropImage
                                                input={{
                                                    onChange: (v) => {
                                                        this.setState({imageFile: v});
                                                    }
                                                }}
                                                onChange={(data) => this.setState({imageFile: data})}
                                                label={'check_time.form.add'}
                                                style={s.mt3}
                                            />
                                        </View> : null
                                    }
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                    <View padderHorizontal style={styles.viewTitle}>
                        <MapMarkerIcon />
                        <CommonText
                            bold
                            text={place.name}
                            style={[s.white, s.ml2, s.pv1, s.tc]}
                        />
                    </View>
                    {image &&
                        <CommonLightBox>
                            <Image
                                source={{uri: image.href}}
                                style={styles.imagePicture}
                                resizeMode={'contain'}
                            />
                        </CommonLightBox>
                    }
                </Content>
                <View withBackground padder>
                    <ButtonSubmit
                        onPress={() => {
                            if (_userHasPermission(this.props.user, typePermission)) {
                                if (isEmpty(this.state.imageFile)) {
                                    return alert(Trans.tran('check_time.form.validation.image'));
                                }

                                formData = {
                                    ...formData,
                                    picture: {
                                        file: this.state.imageFile
                                    }
                                }
                            }

                            switch (true) {
                                case !isCheckIn && isOutside :
                                    this.props.createCheckOutOutside.submit({formData: formData});
                                    break;
                                case !isCheckIn && !isOutside :
                                    this.props.createCheckOut.submit({formData: formData});
                                    break;
                                case isCheckIn && isOutside :
                                    this.props.createCheckInOutside.submit({formData: formData});
                                    break;
                                default :
                                    this.props.createCheckIn.submit({formData: formData});
                                    break;
                            }
                        }}
                        icon={<SaveIcon />}
                        label={'general.save'}
                        positionBottom
                    />
                </View>
            </Container>
        )
    }
}

CheckTimeScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

CheckTimeScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle
        text={navigation.state.params.checkType.typeValue === 'check-in' ?
            'check_time.check_in.title' :
            'check_time.check_out.title'
        }
    />
});

const styles = StyleSheet.create({
    viewDateTime: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center'
    },
    commentTextView: {
        width: '100%',
    },
    commentTextArea: {
        paddingTop: themeVariables.sp2,
    },
    imagePicture: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    map: {
        height: (themeVariables.deviceHeight) > 500 ? 250 : 200,
        width: '100%'
    },
    viewTitle: {
        backgroundColor: themeVariables.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    imageRequiredView: {
        width: '100%',
        marginTop: themeVariables.sp3,
    },
    imageCameraStyle: {
        width: themeVariables.isAndroid ? '40%' : 100,
        height: themeVariables.isAndroid ? 130 : 160,
        backgroundColor: themeVariables.grayLighter,
    },
    imageView: {
        width: '100%',
        height: 200,
        alignSelf: 'center'
    },
    image: {
        width: undefined,
        height: undefined,
        flex: 1
    },
});

export default connect(
    (state) => ({
        user: userProfile(state),
    }),
    (dispatch) => ({
        createCheckIn: bindActionCreators(createCheckIn, dispatch),
        createCheckInOutside: bindActionCreators(createOutsideCheckIn, dispatch),
        createCheckOut: bindActionCreators(createCheckOut, dispatch),
        createCheckOutOutside: bindActionCreators(createOutsideCheckOut, dispatch),
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(CheckTimeScreen);
