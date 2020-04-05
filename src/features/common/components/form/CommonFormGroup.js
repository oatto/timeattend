import React from 'react';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import { StyleSheet, ViewPropTypes } from 'react-native';
import { View } from 'native-base';
import themeVariables from '_theme';

const CommonFormGroup = (props) => {
    let LabelComponent;

    if (props.label) {
        LabelComponent = React.cloneElement(props.label, {
            style: themeVariables.combineStyles(styles.labelElement, props.label.props.style)
        });
    }

    return (
        <View style={themeVariables.combineStyles(styles.containerStyle, props.style)}>
            {LabelComponent && (
                <View style={[props.isLabelText ? styles.labelTextPosition : undefined]}>
                    {LabelComponent}
                </View>
            )}
            {props.field}
        </View>
    )
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 0,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: themeVariables.inputMarginBottom
    },
    labelElement: {
        width: 20,
        height: 20,
        fontSize: themeVariables.fs6,
        color: themeVariables.primary
    },
    labelTextPosition: {
        marginTop: -themeVariables.sp1
    }
});

CommonFormGroup.propTypes = {
    label: PropTypes.element,
    field: PropTypes.element.isRequired,
    style: ViewPropTypes.style,
    isLabelText: PropTypes.bool
};

CommonFormGroup.defaultProps = {
    label: undefined,
    isLabelText: false,
    style: {}
};

export default CommonFormGroup;
