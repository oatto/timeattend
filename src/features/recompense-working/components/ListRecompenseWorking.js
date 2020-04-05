import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import moment from '_utils/moment';
import Trans from '_features/common/containers/Trans';
import { CalendarIcon, NewReleasesIcon } from '_features/common/components/icons/AppIcons';
import CommonText from '_features/common/components/CommonText';

const listRecompenseWorking = (props) => {
    const data = props.item;

    return (
        <View>
            <View style={s.flx_row}>
                <Trans bold t={'recompense_working.day_of_doing'} color={themeVariables.textColor} />
                {props.dataChangeLatest &&
                <View style={s.ml1}>
                    <NewReleasesIcon size={themeVariables.ifs4} color={themeVariables.primary} />
                </View>}
            </View>
            <View style={styles.viewAlignCenterRow}>
                <CalendarIcon style={styles.iconBody} />
                <CommonText text={moment(data.recompense_date).format('LL')} />
            </View>
            <Trans bold t={'recompense_working.request_day_change'} color={themeVariables.textColor} style={s.mt2} />
            <View style={styles.viewAlignCenterRow}>
                <CalendarIcon style={styles.iconBody} />
                <CommonText text={moment(data.work_date).format('LL')} />
            </View>
        </View>
    );
};

listRecompenseWorking.propTypes = {
    item: PropTypes.object.isRequired,
    dataChangeLatest: PropTypes.bool
};

listRecompenseWorking.defaultProps = {
    dataChangeLatest: false
};

const styles = StyleSheet.create({
    viewAlignCenterRow: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%'
    },
    iconBody: {
        alignItems: 'center',
        marginRight: themeVariables.sp2,
        color: themeVariables.textColor
    },
    icon: {
        alignSelf: 'center',
        marginRight: themeVariables.sp2,
    }
});

export default listRecompenseWorking;
