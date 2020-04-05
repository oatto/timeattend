/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Numeral from "numeral";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Thumbnail, View} from 'native-base';
import ref from 'react-native-core/utils/ref';
import {styles as s} from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import Trans from '_features/common/containers/Trans';

const ItemListLocation = (props) => {
    const placeImage = ref(props.location, '_links');
    const range = props.location._distance;
    const rangeNumber = range < 1000 ? range : range / 1000;
    const rangeUnit = range < 1000 ? 'general.unit.meter' : 'general.unit.kilometer';
    const inRange = range <= props.location.area_range;

    return (
        <TouchableOpacity
            disabled={!inRange}
            onPress={props.onPress}
            style={[s.flx_i, styles.container]}
        >
            <View style={s.flx_row}>
                <View padderHorizontal>
                    <Thumbnail
                        source={
                            placeImage
                                ? {uri: placeImage.image.href}
                                : require('_public/images/no-image.png')
                        }
                    />
                </View>
                <View style={[s.flx_i]}>
                    <CommonText
                        text={props.location.name}
                        style={[inRange ?  s.textColor : s.muted]}
                    />
                    <CommonText
                        text={`${Numeral(rangeNumber).format('0,0')} ${Trans.tran(rangeUnit)}`}
                        style={[s.f6, s.tr, s.success, s.mr2]}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
};

ItemListLocation.propTypes = {
    location: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
    }
});

export default ItemListLocation;
