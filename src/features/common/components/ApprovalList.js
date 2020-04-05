import React from 'react';
import { StyleSheet, Image } from 'react-native';
import {Icon, Right, Left, Body, View, Card, CardItem, Thumbnail} from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import CommonText from '_features/common/components/CommonText';
import { NewReleasesIcon } from '_features/common/components/icons/AppIcons';
import PropTypes from 'prop-types';
import themeVariables from '_theme';

const ApprovalList = (props) => {
    let icon = require('_public/ic_approval_cancelled.png');
    if (props.state === 'requested' || props.state === 'requested_cancel') {
        icon = require('_public/ic_approval_requested.png');
    } else if (props.state === 'approved') {
        icon = require('_public/ic_approval_approved.png');
    } else if (props.state === 'rejected') {
        icon = require('_public/ic_approval_rejected.png');
    }

    return (
        <Card withSpace widthForAndriod>
            {props.header && (
                <CardItem header padder button onPress={props.onPress}>
                    {props.header}
                    {props.dataChangeLatest &&
                    <View style={s.ml1}>
                        <NewReleasesIcon size={themeVariables.ifs4} />
                    </View>}
                </CardItem>
            )}
            <CardItem padder button onPress={props.onPress}>
                <Left style={styles.left}>
                    <View style={[styles.iconContainer]}>
                        <Thumbnail source={icon} style={styles.icon} />
                    </View>
                </Left>
                <Body>{props.detail}</Body>
                <Right>
                    <Icon name="arrow-forward" color={themeVariables.textColor} />
                </Right>
            </CardItem>
        </Card>
    );
};

const styles = StyleSheet.create({
    left: {
        flexBasis: 80,
        flexGrow: 0,
        alignSelf: 'flex-start' // icon vertical
    },
    iconContainer: {
        paddingTop: themeVariables.sp1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {}
});

ApprovalList.propTypes = {
    detail: PropTypes.element.isRequired,
    header: PropTypes.element,
    onPress: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired,
    dataChangeLatest: PropTypes.bool
};

ApprovalList.defaultProps = {
    header: undefined,
    dataChangeLatest: false
};

export default ApprovalList;
