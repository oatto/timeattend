import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class CommonPinMap extends React.PureComponent {
    render() {
        return (
            <MapView
                style={[styles.map, this.props.mapStyle]}
                provider={'google'}
                initialRegion={{
                    latitude: this.props.Latitude,
                    longitude: this.props.Longitude,
                    latitudeDelta: 0.0100,
                    longitudeDelta: 0.0100
                }}
            >
                <Marker
                    draggable
                    onDragEnd={this.props.OnDrag}
                    coordinate={{latitude: this.props.Latitude, longitude: this.props.Longitude}}
                    title={this.props.markTitle}
                    description={this.props.markDescription}
                />
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        height: 200,
        width: '100%'
    },
});

CommonPinMap.propTypes = {
    OnDrag: PropTypes.func,
    mapStyle: PropTypes.object,
    Latitude: PropTypes.number,
    Longitude: PropTypes.number,
    markTitle: PropTypes.string,
    markDescription: PropTypes.string
};

CommonPinMap.defaultProps = {
    OnDrag: null,
    mapStyle: {},
    Latitude: 0.0,
    Longitude: 0.0,
    markTitle: '',
    markDescription: ''
};

export default CommonPinMap;
