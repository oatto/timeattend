import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { Textarea } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';

const CommonTextarea = (props) => {
    const { input, ...inputProps } = props;

    return (
        <View style={styles.container}>
            <Textarea
                {...inputProps}
                style={props.style}
                onChangeText={props.onChangeText ? props.onChangeText : input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                placeholder={(props.placeholder) ? `${props.placeholder}${props.required ? ' *' : ''}` : undefined}
                placeholderTextColor={props.placeholderTextColor}
                rowSpan={props.rowSpan}
                value={input.value}
            />
        </View>
    );
};

CommonTextarea.propTypes = {
    required: PropTypes.bool,
    input: PropTypes.object,
    placeholder: PropTypes.string,
    style: ViewPropTypes.style,
    viewIconStyle: ViewPropTypes.style,
    placeholderTextColor: PropTypes.string,
    onChangeText: PropTypes.func,
    rowSpan: PropTypes.number
};

CommonTextarea.defaultProps = {
    required: false,
    input: {},
    placeholder: undefined,
    style: {},
    viewIconStyle: {},
    placeholderTextColor: themeVariables.inputColorPlaceholder,
    onChangeText: null,
    rowSpan: 2
};

const styles = StyleSheet.create({});

export default CommonTextarea;
