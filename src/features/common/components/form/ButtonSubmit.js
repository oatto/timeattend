import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, StyleSheet, View } from 'react-native';
import { Button } from "native-base";
import Trans from "_features/common/containers/Trans";
import themeVariables from '_theme';
import GradientBackground from "../GradientBackground";

const ButtonSubmit = (props) => {
    const isGradientBackground = props.gradientBackground === true;

    return (
        isGradientBackground
            ?
            <GradientBackground style={[props.borderRadius ? styles.gradientContainer : '', props.positionBottom ? styles.buttonPosition : '']}>
                <Button
                    title={null}
                    style={themeVariables.combineStyles(styles.button, props.buttonStyle)}
                    onPress={props.onPress}
                >
                    {props.icon}
                    <Trans t={props.label} replace={props.labelReplace} bold style={[styles.label, props.labelStyle]} />
                </Button>
            </GradientBackground>
            :
            <Button
                title={null}
                style={themeVariables.combineStyles(styles.button, props.buttonStyle, props.positionBottom ? styles.buttonPosition : undefined)}
                onPress={props.onPress}
            >
                {props.icon}
                <Trans t={props.label} bold style={themeVariables.combineStyles(styles.label, props.labelStyle)} />
            </Button>
    )
};

const styles = StyleSheet.create({
    label: {
        color: themeVariables.white,
        justifyContent: 'center',
        lineHeight: themeVariables.isAndroid ? undefined : themeVariables.sp0,
        marginTop: themeVariables.sp1/2
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: themeVariables.transparent,
        paddingTop: themeVariables.sp0,
        paddingBottom: themeVariables.sp0
    },
    gradientContainer: {
        borderRadius: themeVariables.borderRadiusBase
    },
    buttonPosition: {
        flex: 0,
        width: '100%',
        alignSelf: 'center'
    }
});

ButtonSubmit.propTypes = {
    onPress: PropTypes.func,
    buttonStyle: ViewPropTypes.style,
    label: PropTypes.string,
    labelReplace: PropTypes.object,
    icon: PropTypes.element,
    labelStyle: ViewPropTypes.style,
    gradientBackground: PropTypes.bool,
    positionBottom: PropTypes.bool,
    borderRadius: PropTypes.bool
};

ButtonSubmit.defaultProps = {
    onPress: () => {},
    buttonStyle: {},
    label: 'general.accept',
    labelReplace: {},
    icon: null,
    labelStyle: {},
    gradientBackground: true,
    positionBottom: false,
    borderRadius: true
};

export default ButtonSubmit;
