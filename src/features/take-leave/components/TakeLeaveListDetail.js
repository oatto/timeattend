import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import ref from 'react-native-core/utils/ref';
import themeVariables from '_theme';
import moment from '_utils/moment';
import CommonText from '_features/common/components/CommonText';
import { CalendarIcon, ClockIcon } from '_features/common/components/icons/AppIcons';
import Trans from '_features/common/containers/Trans';

class TakeLeaveListDetail extends React.PureComponent {
    render() {
        const data = this.props.data;
        const isHourLeave = data.leave_hours;
        const isSameDay = data.start_date === data.end_date;
        const hasMinutes = ref(data, 'use_nb_minutes');

        let useNbText = `${Trans.tran('general.total')} ${data.use_nb_days} ${Trans.tran('general.unit.day')}`;

        if (isHourLeave) {
            useNbText = `${Trans.tran('general.total')} ${data.use_nb_hours} ${Trans.tran('general.unit.hour')}`;
        }

        if (isHourLeave && hasMinutes) {
            useNbText = `${Trans.tran('general.total')} ${data.use_nb_hours} ${Trans.tran('general.unit.hour')} ${hasMinutes} ${Trans.tran('general.unit.min')}`;
        }

        let fromPrefix = Trans.tran('take_leave_request.take_leave_detail.from');
        let toPrefix = Trans.tran('take_leave_request.take_leave_detail.end');

        if (isSameDay || isHourLeave) {
            fromPrefix = Trans.tran('take_leave_request.take_leave_detail.day_take_leave');
        }

        return (
            <View fill>
                <View style={[s.flx_row, s.mt1]}>
                    <View padderHorizontal style={s.asc}>
                        <CalendarIcon style={styles.icon} />
                    </View>
                    <CommonText
                        text={`${fromPrefix} ${moment(data.start_date).format('LL')}`}
                    />
                </View>

                {isHourLeave &&
                (
                    <View style={[s.flx_row, s.mt1]}>
                        <View padderHorizontal style={s.asc}>
                            <ClockIcon style={styles.icon} />
                        </View>
                        <CommonText
                            thin
                            text={`${moment(data.start_date).format('HH:mm')} - ${moment(data.end_date).format('HH:mm')}`}
                        />
                    </View>
                )}

                {!isHourLeave && !isSameDay &&
                (
                    <View style={[s.flx_row, s.mt1]}>
                        <View padderHorizontal style={s.asc}>
                            <CalendarIcon style={styles.icon} />
                        </View>
                        <CommonText text={`${toPrefix} ${moment(data.end_date).format('LL')}`} />
                    </View>
                )}

                <View padderHorizontal>
                    <CommonText
                        bold
                        text={useNbText}
                        style={[s.primary, s.mt1]}
                    />
                </View>
            </View>
        );
    }
}

TakeLeaveListDetail.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func
};

TakeLeaveListDetail.defaultProps = {
    onPress: null
};

const styles = StyleSheet.create({
    icon: {
        color: themeVariables.textColor,
    }
});

export default TakeLeaveListDetail;
