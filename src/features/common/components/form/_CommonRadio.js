import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableWithoutFeedback, ViewPropTypes } from 'react-native';
import { Grid } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import CommonText from '_features/common/components/CommonText';

const CommonRadio = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress} style={props.style}>
            <Grid style={props.spaceBetweenRadio}>
                <View style={[s.aic, s.jcc, styles.radio, (props.disabled ? styles.radioDisable : ''), (props.selected ? s.b__primary : '')]} >
                    {props.selected ? <View style={[s.bg_primary, styles.innerRadio]} /> : <View />}
                </View>
                <CommonText
                    style={props.disabled ? styles.labelDisabled : null}
                    text={props.label}
                />
            </Grid>
        </TouchableWithoutFeedback>
    );
};

CommonRadio.propTypes = {
    selected: PropTypes.bool.isRequired,
    style: ViewPropTypes.style,
    spaceBetweenRadio: ViewPropTypes.style,
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

CommonRadio.defaultProps = {
    style: {},
    spaceBetweenRadio: {},
    disabled: false
};

const styles = StyleSheet.create({
    radio : {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 6,
        marginHorizontal: 10,
    },
    innerRadio: {
        height: 12,
        width: 12,
        borderRadius: 6
    },
    radioDisable: {
        borderColor: 'gray'
    },
    labelDisabled: {
        color: 'gray'
    }
});

export default CommonRadio;
