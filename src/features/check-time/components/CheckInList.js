import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import moment from '_utils/moment';
import ref from 'react-native-core/utils/ref';
import { List } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';
import { CHECK_TIME_PLACE_TYPE_QR } from "_features/check-time/redux/constants";
import { DayWorkIcon, HolidayIcon, RecompenseWorkIcon, TakeLeaveIcon } from '../../common/components/icons/AppIcons';
import CheckInDetail from './CheckInDetail';
import CheckInListHeader from './CheckInListHeader';

export const getDateInfo = (data) => {
    if (data.check_in) {
        if (data.check_in.take_leave_date) return {work_type_tran: 'general.work_type.take_leave_day', work_type_icon: <TakeLeaveIcon size={themeVariables.fs3} /> };
        else if (data.check_in.is_holiday) return {work_type_tran: 'general.work_type.holiday', work_type_icon: <HolidayIcon size={themeVariables.fs2} />};

        return {work_type_tran: 'general.work_type.work_day', work_type_icon: <DayWorkIcon size={themeVariables.fs2} /> };
    }

    if (data.is_recompense) return {work_type_tran: 'general.work_type.recompense_day', work_type_icon: <RecompenseWorkIcon size={themeVariables.fs2} />};
    else if (data.is_holiday || data.is_weekend) return {work_type_tran: 'general.work_type.holiday', work_type_icon: <HolidayIcon size={themeVariables.fs2} /> };
    else if (data.is_take_leave) return {work_type_tran: 'general.work_type.take_leave_day', work_type_icon: <TakeLeaveIcon size={themeVariables.fs2} /> };

    return {work_type_tran: 'general.work_type.work_day', work_type_icon: <DayWorkIcon size={themeVariables.fs2} /> };
};

const CheckInList = ({data, onPress}) => {
    const checkIn = data.check_in;
    const isClickable = typeof onPress === 'function';
    const { work_type_tran, work_type_icon } = getDateInfo(data);

    return (
        <TouchableOpacity onPress={onPress} disabled={!isClickable} style={s.flx_i}>
            <CheckInListHeader
                isClickable={isClickable}
                date={moment(data.date).format('dddd DD MMMM YYYY')}
                dateSuffix={`${Trans.tran(work_type_tran)}`}
                workTypeIcon={work_type_icon}
            />

            <List style={[s.flx_warp, s.bg_white]}>
                <CheckInDetail
                    type="check_in"
                    place={ref(checkIn, 'check_in_place.name')}
                    placeType={ref(checkIn, 'check_in_place._qr_code_path') ? CHECK_TIME_PLACE_TYPE_QR : undefined}
                    checkInLate={ref(checkIn, 'check_in_late')}
                    time={ref(checkIn, 'check_in_at') ? moment(checkIn.check_in_at).format('HH:mm') : undefined}
                    withBorderDivide
                />
                <CheckInDetail
                    type="check_out"
                    place={ref(checkIn, 'check_out_place.name')}
                    placeType={ref(checkIn, 'check_out_place._qr_code_path') ? CHECK_TIME_PLACE_TYPE_QR : undefined}
                    checkOutEarly={ref(checkIn, 'check_out_early')}
                    time={ref(checkIn, 'check_out_at') ? moment(checkIn.check_out_at).format('HH:mm') : undefined}
                />
            </List>
        </TouchableOpacity>
    )}
;

CheckInList.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func
};

CheckInList.defaultProps = {
    onPress: undefined
};

export default CheckInList;
