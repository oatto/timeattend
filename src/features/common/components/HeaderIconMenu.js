import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ViewPropTypes } from 'react-native';
import { Button } from 'native-base';
import themeVariables from '_theme';
import { MenuIcon } from './icons/AppIcons';

const HeaderIconMenu = (props) => {
    return (
        <Button
            transparent
            light
            style={[styles.button, props.style]}
            onPress={props.onPress}
        >
            {props.icon}
        </Button>
    )
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        marginTop: themeVariables.isAndroid ? themeVariables.sp2 : 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        top: themeVariables.isAndroid ? 0 : themeVariables.sp2/1.4,
        paddingHorizontal: themeVariables.sp1
    }
});

HeaderIconMenu.propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.element,
    style: ViewPropTypes.style
};

HeaderIconMenu.defaultProps = {
    icon:  <MenuIcon headerMenuIcon />,
    style:  {},
};

export default HeaderIconMenu;
