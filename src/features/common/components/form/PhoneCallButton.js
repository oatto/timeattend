import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button } from "native-base";
import themeVariables from '_theme';
import { phonecall } from 'react-native-core/utils/communication';
import { PhoneIcon } from "../icons/AppIcons";
import Trans from "../../containers/Trans";

const PhoneCallButton = (props) => {
    return (
        <Button
            phoneButton
            title={null}
            style={styles.button}
            onPress={() => {phonecall(props.phoneNumber)}}
        >
            <PhoneIcon color={themeVariables.success} size={themeVariables.ifs5} />
            <Trans t={'general.call'} style={styles.label} />
        </Button>
    )
};

const styles = StyleSheet.create({
    label: {
        color: themeVariables.success,
        justifyContent: 'center',
        lineHeight: themeVariables.isAndroid ? undefined : themeVariables.sp0,
        marginTop: themeVariables.sp1/2
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: themeVariables.transparent,
        paddingTop: themeVariables.sp0,
        paddingBottom: themeVariables.sp0,
        borderRadius: themeVariables.borderRadiusLarge,
        borderWidth: themeVariables.borderWidth,
        borderColor: themeVariables.gray,
        alignItems: 'center'
    }
});

PhoneCallButton.propTypes = {
    phoneNumber: PropTypes.string.isRequired,
};

export default PhoneCallButton;
