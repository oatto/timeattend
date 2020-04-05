import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Footer } from "native-base";
import { styles as s } from "react-native-style-tachyons";
import Trans from "_features/common/containers/Trans";
import themeVariable from "_theme";
import GradientBackground from "./GradientBackground";

const ButtonFixedFooter = (rootProps) => {
    const renderButton = (props, isSingle) => {
        const isGradientBackground = props.gradientBackground === true;

        return (
            isGradientBackground
                ?
                    <GradientBackground
                        element={
                            <Button
                                title={null}
                                {...props.btnProps}
                                style={[styles.button, props.style, isSingle ? styles.buttonSingle : '', isGradientBackground ? styles.buttonTrans : '' ]}
                            >
                                {props.icon}
                                <Trans t={props.label} bold style={[s.white, s.f5, s.pt2]} />
                            </Button>
                        }
                    />
                :
                    <Button
                        title={null}
                        {...props.btnProps}
                        style={[styles.button, props.style, isSingle ? styles.buttonSingle : '', !isGradientBackground ? styles.buttonBorder : '']}
                    >
                        {props.icon}
                        <Trans t={props.label} bold style={[s.white, s.f5, s.pt2]} />
                    </Button>
        )
    };

    return (
        <Footer style={[styles.footer, rootProps.containerStyle]}>
            {renderButton(rootProps.leftBtn, null === rootProps.rightBtn)}
            {rootProps.rightBtn && renderButton(rootProps.rightBtn, null === rootProps.rightBtn)}
        </Footer>
    )
};

ButtonFixedFooter.propTypes = {
    containerStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
    leftBtn: PropTypes.shape({
        btnProps: PropTypes.object,
        icon: PropTypes.element,
        label: PropTypes.string,
    }).isRequired,
    rightBtn: PropTypes.shape({
        btnProps: PropTypes.object,
        icon: PropTypes.element,
        label: PropTypes.string,
        gradientBackground: PropTypes.bool
    }),
};

ButtonFixedFooter.defaultProps = {
    containerStyle: {},
    rightBtn: null
};

const styles = StyleSheet.create({
    footer: {
        height: themeVariable.footerHeight,
        backgroundColor: themeVariable.white,
        justifyContent: 'space-between',
    },
    button: {
        width: '49.8%',
        height: themeVariable.footerHeight,
        backgroundColor: themeVariable.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 0,
    },
    buttonSingle: {
        width: '100%',
    },
    buttonTrans: {
        backgroundColor: themeVariable.transparent,
        alignSelf: 'center',
    },
    buttonBorder: {
        borderRightWidth: themeVariable.borderWidth,
        borderRightColor: themeVariable.white
    }
});

export default ButtonFixedFooter;
