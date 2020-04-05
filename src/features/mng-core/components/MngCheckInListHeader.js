import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import {styles as s} from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import Hr from '_features/common/components/Hr';
import { CardAngleRightIcon } from '_features/common/components/icons/AppIcons';

const CheckInListHeader = (props) => {
    return (
        <View padder style={[styles.header, s.aic]}>
            <View fill style={s.flx_warp}>
                {props.employeeName ? (
                    <View>
                        <CommonText
                            bold
                            text={props.employeeName}
                            color={themeVariables.white}
                        />
                        <Hr />
                    </View> ) : null
                }
                <View style={[s.flx_row, s.jcsb]}>
                    {props.date && (
                        <CommonText
                            bold
                            text={props.date}
                            color={themeVariables.white}
                        />
                    )}
                    <View style={s.flx_row}>
                        <CommonText
                            bold
                            text={props.dateSuffix}
                            color={themeVariables.white}
                        />
                        {props.isClickable &&
                        <CardAngleRightIcon color={themeVariables.white} style={styles.arrowIcon} />}
                    </View>
                </View>
            </View>
        </View>
    )
};

CheckInListHeader.propTypes = {
    date: PropTypes.string,
    dateSuffix: PropTypes.string.isRequired,
    workTypeIcon: PropTypes.element,
    isClickable: PropTypes.bool.isRequired,
    employeeName: PropTypes.string,
};

CheckInListHeader.defaultProps = {
    workTypeIcon: undefined,
    date: "",
    employeeName: ""
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: themeVariables.cardHeaderBgColor
    },
    arrowIcon: {
        marginLeft: themeVariables.sp1,
        alignSelf: 'center'
    },
});

export default CheckInListHeader;
