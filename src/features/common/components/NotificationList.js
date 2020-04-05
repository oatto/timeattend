import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, View, Card, CardItem } from 'native-base';
import Trans from '_features/common/containers/Trans';
import PropTypes from 'prop-types';
import moment from '_utils/moment';
import {
    NOTIFICATION_TAKE_LEAVE_TYPE,
    NOTIFICATION_TIME_ADJUSTMENT_TYPE,
    NOTIFICATION_RECOMPENSE_WORK_TYPE,
    NOTIFICATION_DIRECT_MESSAGE_TYPE,
    NOTIFICATION_CHECK_TIME_TYPE,
    NOTIFICATION_MOBILE_ACCESS_TYPE
} from '_features/common/redux/constants'
import { styles as s } from 'react-native-style-tachyons';
import { CheckInIcons } from "_features/common/components/icons/CheckInIcons";
import { CheckOutIcons } from "_features/common/components/icons/CheckOutIcons";
import CommonText from '_features/common/components/CommonText';
import { TakeLeaveIcon, TimeAdjustmentIcon, CalendarIcon, InboxIcon, PublicMobileDeviceIcon } from '_features/common/components/icons/AppIcons';
import themeVariables from '_theme';

const NotificationList = (props) => {

    let icon;
    const defaultProps = {
        color: themeVariables.white,
        size: themeVariables.ifs3
    };

    if (NOTIFICATION_TAKE_LEAVE_TYPE === props.data.origin_topic) {
        icon = <TakeLeaveIcon {...defaultProps} />
    } else if (NOTIFICATION_TIME_ADJUSTMENT_TYPE === props.data.origin_topic) {
        icon = <TimeAdjustmentIcon {...defaultProps} />
    } else if (NOTIFICATION_RECOMPENSE_WORK_TYPE === props.data.origin_topic) {
        icon = <CalendarIcon {...defaultProps} />
    } else if (NOTIFICATION_DIRECT_MESSAGE_TYPE === props.data.origin_topic) {
        icon = <InboxIcon {...defaultProps} />
    } else if (NOTIFICATION_CHECK_TIME_TYPE === props.data.origin_topic) {
        icon = <CheckInIcons buttonFooter notificationIcon />
        if (props.data.origin_type === 'check_out') {
            icon = <CheckOutIcons buttonFooter notificationIcon />
        }
    } else if (NOTIFICATION_MOBILE_ACCESS_TYPE === props.data.origin_topic) {
        icon = <PublicMobileDeviceIcon {...defaultProps} />
    }

    return (
        <Card withSpace widthForAndriod>
            <CardItem padder button onPress={props.onPress}>
                <Body style={styles.bodyContainer}>
                    <View style={styles.iconContainer}>
                        {icon}
                    </View>
                    <View style={[s.ml2, s.flx_column]}>
                        <CommonText bold text={props.data.title} />
                        <CommonText bold text={Trans.tran(`general.notification_center.action_at`) + moment(props.data.created_at).format('LL')} />
                    </View>
                </Body>
            </CardItem>
        </Card>
    );
};

NotificationList.propTypes = {
    onPress: PropTypes.func,
    data: PropTypes.object.isRequired,
};

NotificationList.defaultProps = {
    onPress: () => {},
};

const styles = StyleSheet.create({
    bodyContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingRight: themeVariables.sp4
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: themeVariables.primary,
    }
});

export default NotificationList;
