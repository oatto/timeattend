import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import moment from '_utils/moment';
import ref from 'react-native-core/utils/ref';
import { List } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';
import CheckInDetail from '_features/check-time/components/CheckInDetail';
import MngCheckInListHeader from '_features/mng-core/components/MngCheckInListHeader';
import { getDateInfo } from '_features/check-time/components/CheckInList';

const MngCheckInList = ({employeeData, onPress}) => {
    let checkIn = null;
    let date = null;
    let employeeName = null;

    if (employeeData.check_time_data_with_date) {
        // employeeData from dasboardScreen
        employeeName = employeeData.full_name;
        checkIn = employeeData.check_time_data_with_date.check_in;
        date = checkIn ? checkIn.date : employeeData.check_time_data_with_date.date;
    } else {
        // employeeData from myEmployeeScreen
        employeeName = employeeData.employee.full_name;
        checkIn = employeeData;
        date = employeeData.date;
    }

    const isClickable = typeof onPress === 'function';
    const { work_type_tran, work_type_icon } = getDateInfo({check_in: checkIn});

    return (
        <TouchableOpacity onPress={onPress} disabled={!isClickable} style={themeVariables.globalStyle.w100}>
            <MngCheckInListHeader
                isClickable={isClickable}
                employeeName={employeeName}
                date={moment(date).format('dddd DD MMMM YYYY')}
                dateSuffix={`${Trans.tran(work_type_tran)}`}
                workTypeIcon={work_type_icon}
            />

            <List style={[s.flx_warp, s.bg_white]}>
                <CheckInDetail
                    type="check_in"
                    place={ref(checkIn, 'check_in_place.name')}
                    placeType={ref(checkIn, 'check_in_place.type')}
                    checkInLate={ref(checkIn, 'check_in_late')}
                    time={ref(checkIn, 'check_in_at') ? moment(checkIn.check_in_at).format('HH:mm') : undefined}
                    withBorderDivide
                />

                <CheckInDetail
                    type="check_out"
                    place={ref(checkIn, 'check_out_place.name')}
                    placeType={ref(checkIn, 'check_out_place.type')}
                    checkOutEarly={ref(checkIn, 'check_out_early')}
                    time={ref(checkIn, 'check_out_at') ? moment(checkIn.check_out_at).format('HH:mm') : undefined}
                />
            </List>
        </TouchableOpacity>
    )}
;

MngCheckInList.propTypes = {
    employeeData: PropTypes.object.isRequired,
    onPress: PropTypes.func
};

MngCheckInList.defaultProps = {
    onPress: undefined
};

export default MngCheckInList;
