import React from 'react';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import themeVariables from '_theme';
import CommonText from "../CommonText";

const CommonLabelFormGroup = (props) => {
    return (
        <View style={s.flx_row}>
            <CommonText text={props.label} color={props.labelColor} />
            {props.required && <CommonText text={'*'} style={styles.required} />}
        </View>
    )
};

const styles = StyleSheet.create({
    required: {
        color: themeVariables.primary,
        marginLeft: themeVariables.sp1
    }
});

CommonLabelFormGroup.propTypes = {
    label: PropTypes.string.isRequired,
    labelColor: PropTypes.string,
    required: PropTypes.bool,
};

CommonLabelFormGroup.defaultProps = {
    required: false,
    labelColor: themeVariables.textColor
};

export default CommonLabelFormGroup;
