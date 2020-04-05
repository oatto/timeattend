/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';

const CreateCircleButton = (props) => {
    return (
        <TouchableOpacity style={[styles.defaultButton, props.style]} onPress={props.onPress}>
            <Icon type="FontAwesome" name={'plus'} style={styles.defaultIcon} />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    defaultButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#808184'
    },
    defaultIcon: {
        color: '#ffffff'
    }
});

CreateCircleButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object
};

CreateCircleButton.defaultProps = {
    style: {}
};

export default CreateCircleButton
