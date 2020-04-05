import React from 'react';
import {StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import themeVariables from '_theme';
import {View} from 'native-base';

export const CheckInIcons = (props) => {
    let iconSource = require('_public/ic_checkin_inactive_gray.png');

    if (props.active) {
        iconSource = require('_public/ic_checkin_active.png');

        if (props.state === 'requested') {
            iconSource = require('_public/ic_checkin_active_requested.png');
        } else if (props.state === 'rejected' || props.state === 'cancelled') {
            iconSource = require('_public/ic_checkin_active_rejected.png');
        }
    } else if (props.buttonFooter) {
        iconSource = require('_public/ic_checkin_white.png');
    }

    return (
        <View style={styles.iconContainer}>
            <Image
                resizeMode={'contain'}
                source={iconSource}
                style={props.notificationIcon ? styles.iconNotification : ""}
            />
        </View>
    )
};

CheckInIcons.propTypes = {
    active: PropTypes.bool,
    state: PropTypes.string,
    buttonFooter: PropTypes.bool,
    notificationIcon: PropTypes.bool
};

CheckInIcons.defaultProps = {
    active: false,
    state: undefined,
    buttonFooter: false,
    notificationIcon: false
};

const styles = StyleSheet.create({
    iconContainer: {
        width: 55,
        height: 55,
        marginTop: themeVariables.sp1/2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconNotification: {
        width: 42,
        height: 42,
    }
});
