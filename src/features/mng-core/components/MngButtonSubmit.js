import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';
import CommonText from '_features/common/components/CommonText';
import ButtonSubmit from "_features/common/components/form/ButtonSubmit";

const MngButtonSubmit = (props) => {
    return (
        props.fullWidth ?
            <ButtonSubmit
                gradientBackground
                onPress={props.onPress}
                label={props.buttonLabel}
            /> :
            <View style={[styles.buttonContainer]}>
                <Button
                    primary
                    title={null}
                    onPress={props.onPress}
                    style={[styles.buttonSubmit, props.positionEnd ? s.asfe : s.asfs]}
                >
                    <CommonText
                        text={Trans.tran(props.buttonLabel)}
                        color={themeVariables.white}
                        style={styles.label}
                    />
                </Button>
            </View>
    )
};

MngButtonSubmit.propTypes = {
    onPress: PropTypes.func,
    positionEnd: PropTypes.bool,
    fullWidth: PropTypes.bool,
    buttonLabel: PropTypes.string.isRequired
};

MngButtonSubmit.defaultProps = {
    onPress: null,
    positionEnd: false,
    fullWidth: false
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: '50%'
    },
    buttonSubmit: {
        width: '80%',
        justifyContent: 'center'
    },
    label: {
        lineHeight: themeVariables.isAndroid ? undefined : themeVariables.sp0,
    }
});

export default MngButtonSubmit;
