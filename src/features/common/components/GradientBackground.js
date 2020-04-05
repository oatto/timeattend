import React from 'react';
import { styles as s } from 'react-native-style-tachyons';
import LinearGradient from 'react-native-linear-gradient';
import themeVariables from '_theme';

const GradientBackground = (props) => {
    return (
        <LinearGradient
            colors={themeVariables.getGradientColor()}
            start={{x: 0.2, y: 0}}
            end={{x: 0.9, y: 0}}
            {...props}
            style={themeVariables.combineStyles(s.flx_i, props.style)}
        >
            {props.children}
        </LinearGradient>
    )
};

export default GradientBackground;
