import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { ListItem, Left, Right, Icon, Body } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import {NotPublicMobileDeviceIcon, PublicMobileDeviceIcon} from "_features/common/components/icons/AppIcons";

const MngMobileDevicesList = (props) => {
    const mobileDevice = props.data;
    const mobileName = mobileDevice.name ? mobileDevice.name : `${mobileDevice.model} (${mobileDevice.platform})`;

    let icon = <NotPublicMobileDeviceIcon color={themeVariables.secondary} />;
    let iconStyle = {
        container: s.b__secondary,
    };

    if (mobileDevice.public_device === true) {
        icon = <PublicMobileDeviceIcon color={themeVariables.warning} />;
        iconStyle = {
            container: s.b__warning,
        };
    }

    return (
        <ListItem thumbnail noBorder onPress={props.onPress} style={styles.container}>
            <Left style={[styles.left, s.mv2, s.jcc]}>
                <View style={[styles.iconContainer, iconStyle.container]}>
                    {icon}
                </View>
            </Left>
            <Body>
                <CommonText
                    bold
                    text={mobileName}
                />
                {mobileDevice._employees_mobile_device.map((name) => {
                    return (
                        <CommonText
                            key={`${mobileDevice.id}_${name}`}
                            text={name}
                        />
                    )
                })}
            </Body>
            <Right style={styles.iconArrowContainer}>
                <Icon active name="arrow-forward" />
            </Right>
        </ListItem>
    )
};

MngMobileDevicesList.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func
};

MngMobileDevicesList.defaultProps = {
    onPress: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    left: {
        flexBasis: 85,
        paddingHorizontal: themeVariables.sp2,
        flexGrow: 0
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    iconArrowContainer: {
        borderBottomWidth: themeVariables.sp0
    },
});

export default MngMobileDevicesList;
