import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import Trans from '_features/common/containers/Trans';
import { CommentIcon, ClockIcon, MapMarkerIcon, QRIcon } from '_features/common/components/icons/AppIcons';
import CommonText from '_features/common/components/CommonText';
import themeVariables from '_theme';
import { CheckInIcons } from "_features/common/components/icons/CheckInIcons";
import { CheckOutIcons } from "_features/common/components/icons/CheckOutIcons";
import { CHECK_TIME_PLACE_TYPE_QR } from "_features/check-time/redux/constants";

const CheckInDetail = (props) => {
    let checkInDetailStyle = themeVariables.gray;
    let isActive = false;
    const isCheckIn = props.type === 'check_in';

    if (props.time) {
        checkInDetailStyle = themeVariables.textColor;
        isActive = true;
    }

    return (
        <View padder style={themeVariables.combineStyles(styles.listDetail, props.withBorderDivide ? styles.borderDivide : '')}>
            {isCheckIn ?
                <CheckInIcons active={isActive} state={props.state} />
                :
                <CheckOutIcons active={isActive} state={props.state} />
            }
            <View padderHorizontal style={s.flx_i}>
                <View style={s.flx_row}>
                    <View style={styles.smallIconView}>
                        <ClockIcon color={props.time ? themeVariables.iconActiveColor : themeVariables.gray} />
                    </View>
                    <CommonText
                        color={checkInDetailStyle}
                        text={props.time ? props.time : '--:--'}
                    />
                </View>
                <View style={s.flx_row}>
                    <View style={styles.smallIconView}>
                        {props.placeType === CHECK_TIME_PLACE_TYPE_QR
                            ?
                            <QRIcon color={props.place ? themeVariables.iconActiveColor : themeVariables.gray} />
                            :
                            <MapMarkerIcon color={props.place ? themeVariables.iconActiveColor : themeVariables.gray} />
                        }
                    </View>
                    <View style={s.flx_i}>
                        <CommonText
                            color={checkInDetailStyle}
                            text={props.place ? props.place : Trans.tran('check_time.not_check_time')}
                        />
                    </View>
                </View>
                {props.note ?
                    <View style={[s.flx_row]}>
                        <View style={styles.smallIconView}>
                            <CommentIcon color={props.place ? themeVariables.iconActiveColor : themeVariables.gray} />
                        </View>
                        <View style={s.flx_i}>
                            <CommonText
                                color={checkInDetailStyle}
                                text={props.note}
                            />
                        </View>
                    </View>
                    : null
                }
            </View>
        </View>
    )
};

CheckInDetail.propTypes = {
    time: PropTypes.string,
    type: PropTypes.oneOf(['check_in', 'check_out']).isRequired,
    place: PropTypes.string,
    note: PropTypes.string,
    checkInLate: PropTypes.bool,
    checkOutEarly: PropTypes.bool,
    withBorderDivide: PropTypes.bool,
    state: PropTypes.string,
    placeType: PropTypes.string
};

CheckInDetail.defaultProps = {
    time: undefined,
    place: undefined,
    note: undefined,
    checkInLate: undefined,
    checkOutEarly: undefined,
    withBorderDivide: false,
    state: undefined,
    placeType: undefined
};

const styles = StyleSheet.create({
    listDetail: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: themeVariables.white,
    },
    borderDivide: {
        borderBottomColor: themeVariables.gray,
        borderBottomWidth: themeVariables.borderWidth
    },
    smallIconView: {
        width: 30,
        marginVertical: themeVariables.sp1,
        marginRight: themeVariables.sp1,
        alignItems: 'center'
    }
});

export default CheckInDetail;
