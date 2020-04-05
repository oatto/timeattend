import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, ViewPropTypes, StyleSheet } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import LinearGradient from 'react-native-linear-gradient';
import themeVariables from '_theme';

const CommonButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
            <LinearGradient
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}
                colors={[themeVariables.brandSecodary, themeVariables.brandPrimary]}
                style={[styles.button, props.style]}
            >
                <Text style={[styles.buttonText, s.f4]}>{props.text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        borderRadius: 22
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    }
});

CommonButton.propTypes = {
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    text: PropTypes.string
};

CommonButton.defaultProps = {
    onPress: () => {},
    style: {},
    text: 'Click Me!'
};

export default CommonButton;
