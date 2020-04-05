import React from 'react';
import PropTypes from 'prop-types';
import {Container, Button, Header, Left, Body, Right, Spinner, Icon} from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import Trans from '_features/common/containers/Trans';
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import { Modal, StyleSheet, Image, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
navigator.geolocation = require('@react-native-community/geolocation');
class MapLocationPickerModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
        onFinish: PropTypes.func.isRequired,
        initialRegion: MapView.propTypes.initialRegion
    };

    static defaultProps = {
        initialRegion: undefined
    };

    constructor(props) {
        super(props);
        this._initLocation = this._initLocation.bind(this);
        this._onRegionChange = this._onRegionChange.bind(this);

        this.state = {
            region: {
                latitude: 17.413351,
                longitude: 102.788538,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            },
            initialRegion: null
        }
    }

    componentDidMount() {
        this._initLocation();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            return;
        }

        this.setState({
            initialRegion: null
        })
    }

    _initLocation() {
        if (this.props.initialRegion) {
            this.setState({
                initialRegion: this.props.initialRegion
            });

            return;
        }

        navigator.geolocation.getCurrentPosition(({ coords }) => {
            this.setState({
                initialRegion: {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }
            });
        }, () => {
            this.setState({
                initialRegion: this.state.region
            });
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        });
    }

    _onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <Modal visible={this.props.visible} transparent={false} animationType='slide'>
                <Container>
                    <Header style={s.bg_primary}>
                        <Left>
                            <HeaderIconMenu
                                onPress={() => this.props.onCancel()}
                                icon={<Icon type={'MaterialCommunityIcons'} name={'chevron-left'} />}
                            />
                        </Left>
                        <Body>
                            <HeaderTitle text={'Choose map'} />
                        </Body>
                        <Right />
                    </Header>
                    {this.state.initialRegion && (
                        <View style={s.flx_i}>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                initialRegion={this.state.initialRegion}
                                onRegionChangeComplete={this._onRegionChange}
                                style={[s.flx_i, s.jcc, s.aic]}
                            >
                                <Image source={require('_public/images/pin.png')} style={styles.fakePin} />
                            </MapView>
                            <Button rounded style={styles.btn} onPress={() => this.props.onFinish(this.state.region)}>
                                <Trans t={'general.confirm'} />
                            </Button>
                        </View>
                    )}
                    {!this.state.initialRegion && <Spinner color='black' /> }
                </Container>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        left: 30,
        bottom: 30
    },
    fakePin: {
        marginTop: -55
    }
});

export default MapLocationPickerModal;
