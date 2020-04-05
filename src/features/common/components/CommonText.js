import React from 'react';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import themeVariable from '_theme';

const CommonText = (props) => {
    const textProps =  omit(props, ['color', 'size']);

    let textStyle = [
        {
            fontSize: props.size,
            color: props.color
        },
    ];

    return (
        <Text
            {...textProps}
            style={themeVariable.combineStyles(textStyle, props.style)}
        >
            {props.text}
        </Text>
    )
};

CommonText.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    style: Text.propTypes.style,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

CommonText.defaultProps = {
    size: themeVariable.fontCustomSizeBase,
    color: themeVariable.textColor,
    text: '',
    style: null
};

export default CommonText;
