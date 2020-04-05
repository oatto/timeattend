import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import PropTypes from 'prop-types';
import themeVariable from '_theme';

const Hr = (props) => <View style={[styles.hr, props.style]} />

const styles = StyleSheet.create({
    hr: {
        backgroundColor: themeVariable.grayLighter,
        height: 1,
        width: '100%',
        marginVertical: 6
    }
});

Hr.propTypes = {
    style: View.propTypes.style,
};

Hr.defaultProps = {
    style: null
};

export default Hr;
