import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import { Label } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';


const CommonLabel = (props) => {
    return (
        <Label style={[s.mb2, (props.required) ? s.red : null, props.style]}>
            {`${props.label}${props.required ? ' *' : ''}`}
        </Label>
    );
};

CommonLabel.propTypes = {
    required: PropTypes.bool,
    style: ViewPropTypes.style,
    label: PropTypes.string.isRequired
};

CommonLabel.defaultProps = {
    style: {},
    required: false
};

export default CommonLabel;
