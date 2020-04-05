import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import Trans from "_features/common/containers/Trans";
import CommonText from '_features/common/components/CommonText';
import { ClockIcon, MapMarkerIcon } from '_features/common/components/icons/AppIcons';

const ShowCheckTime = (props) => {
    return (
        <View padder style={styles.viewItem}>
            <View fill style={[s.flx_row, styles.sectionCompany]}>
                <View style={s.mt1}>
                    <MapMarkerIcon color={themeVariables.textColor} />
                </View>
                <View padderHorizontal>
                    <CommonText text={props.place} />
                </View>
            </View>
            <View padderHorizontal style={[s.flx_warp, styles.sectionCheckTime]}>
                <Trans t={props.type} style={s.tc} />
                <View style={[s.flx_row, s.aic, s.jcsb, s.ph1]}>
                    <ClockIcon color={themeVariables.textColor} />
                    <CommonText text={props.time} />
                </View>
            </View>
        </View>
    )
};

ShowCheckTime.propTypes = {
    place: PropTypes.string,
    type: PropTypes.string,
    time: PropTypes.string
};

ShowCheckTime.defaultProps = {
    place: "",
    type: "",
    time: "--:--"
};

const styles = StyleSheet.create({
    viewItem: {
        display: 'flex',
        flexDirection: 'row',
    },
    sectionCompany: {
        width: '70%'
    },
    sectionCheckTime: {
        width: '30%'
    }
});

export default ShowCheckTime;
