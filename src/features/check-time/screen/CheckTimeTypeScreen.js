/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button, Container, Spinner } from 'native-base';
import { NavigationActions } from 'react-navigation';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import IconEntypo from 'react-native-vector-icons/dist/Entypo';
import { styles as s } from 'react-native-style-tachyons';
import ref from 'react-native-core/utils/ref';
import isUndefined from 'lodash/isUndefined';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';
import HeaderTitle from '_features/common/components/HeaderTitle';
import { getCurrentLocation, serverTimeRequestAction } from '_features/common/redux/actions';
import { isReceivedLocation, isReceiveFailedLocation, isReceivingLocation, getCurrentLocation as getCurrentLocationSelector } from '_features/common/redux/selectors';
import { userHasPermission } from '_features/user/redux/selectors';
import { CHECK_TIME_LOCATION_LIST, CHECK_TIME_VIA_QR } from '../router';
import NoResult from "../../common/components/NoResult";

class CheckTimeTypeScreen extends React.PureComponent {
    componentDidMount() {
        this.props.getCurrentLocation.request({
            mode: 'get'
        });
    }

    render() {
        const {typeName, typeValue} = this.props.navigation.state.params;

        if (this.props.isReceivingLocation) {
            return <Spinner color={themeVariables.brandPrimary} />;
        }

        // FIXME: If user visit this screen more than 2 times, sometime when system getting current location, it's failure.
        const hasOldLocation = !isUndefined(ref(this.props, 'currentLocation.coords.latitude')) && !isUndefined(ref(this.props, 'currentLocation.coords.latitude'));

        if (this.props.isReceiveFailedLocation && !hasOldLocation) {
            return <NoResult text='location.service_enabled' />
        }

        return (
            <Container iPhoneXSupport style={styles.container}>
                <View style={styles.containerView}>
                    {this.props.canCheckedWithQr ?
                        <View style={styles.containerButton}>
                            <Button
                                style={styles.button}
                                title={null}
                                onPress={() => {
                                    this.props.navigation.navigate({
                                        routeName: CHECK_TIME_VIA_QR,
                                        params: {
                                            typeName,
                                            typeValue,
                                            coordinate: {
                                                latitude: this.props.currentLocation.coords.latitude,
                                                longitude: this.props.currentLocation.coords.longitude,
                                            }
                                        }
                                    })
                                }}
                            >
                                <IconFontAwesome
                                    size={80}
                                    color={themeVariables.white}
                                    name={'qrcode'}
                                />
                            </Button>
                            <Trans
                                bold
                                t={'check_time.type.by_qr_code'}
                                style={styles.title}
                            />
                        </View> : null
                    }
                    {this.props.canCheckedWithLocation ?
                        <View style={[styles.containerButton, s.mt5]}>
                            <Button
                                style={styles.button}
                                title={null}
                                onPress={() => {
                                    this.props.navigation.navigate({
                                        routeName: CHECK_TIME_LOCATION_LIST,
                                        params: {
                                            typeName,
                                            typeValue,
                                        }
                                    })
                                }}
                            >
                                <IconEntypo
                                    size={80}
                                    color={themeVariables.white}
                                    name={'location-pin'}
                                />
                            </Button>
                            <Trans
                                bold
                                t={'check_time.type.by_location'}
                                style={styles.title}
                            />
                        </View> : null
                    }
                    {!this.props.canCheckedWithQr && !this.props.canCheckedWithLocation
                        ? <View style={s.ph4}><NoResult text={'check_time.type.no_result'} /></View>
                        : null
                    }
                </View>
            </Container>
        )
    }
}

CheckTimeTypeScreen.navigationOptions = ({
    headerTitle: <HeaderTitle text={'check_time.type.title'} />
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    containerButton: {
        alignItems: 'center'
    },
    title: {
        paddingTop: themeVariables.sp3,
        color: themeVariables.primary
    },
    button: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: themeVariables.primary,
        justifyContent: 'center',
    }
});

export default connect(
    (state) => ({
        isReceivedLocation: isReceivedLocation(state),
        isReceivingLocation: isReceivingLocation(state),
        isReceiveFailedLocation: isReceiveFailedLocation(state),
        currentLocation: getCurrentLocationSelector(state),
        canCheckedWithQr: userHasPermission(state, 'qr_location'),
        canCheckedWithLocation: userHasPermission(state, 'coordinate_location'),
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        getServerTime: bindActionCreators(serverTimeRequestAction, dispatch),
        getCurrentLocation: bindActionCreators(getCurrentLocation, dispatch)
    })
)(CheckTimeTypeScreen);
