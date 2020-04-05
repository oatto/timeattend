import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {List} from 'native-base';
import moment from '_utils/moment';
import themeVariables from '_theme';
import { styles as s } from 'react-native-style-tachyons';
import ref from 'react-native-core/utils/ref';
import CheckInListHeader from '_features/check-time/components/CheckInListHeader';
import Trans from '_features/common/containers/Trans';
import CheckInDetail from '_features/check-time/components/CheckInDetail';
import { getDateInfo } from '_features/check-time/components/CheckInList';

const CheckTimeAdjustmentList = ({data, dataChangeLatest, onPress}) => {
    const { work_type_tran } = getDateInfo(data);
    const employee = ref(data, 'employee');

    function getTimeForRender(adjustment, field) {
        if (adjustment[field]) {
            return moment(adjustment[field]).format('HH:mm')
        }

        if (adjustment[`from_${field}`]) {
            return moment(adjustment[`from_${field}`]).format('HH:mm')
        }

        return '--:--';
    }

    function getPlaceForRender(adjustment, field) {
        if (ref(adjustment, `${field}.name`)) {
            return adjustment.check_in_place.name
        }

        if (adjustment[`from_${field}`]) {
            return adjustment[`from_${field}`]
        }

        return ' - ';
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <CheckInListHeader
                isClickable
                date={moment(data.date).format('dddd DD MMMM YYYY')}
                state={`${Trans.tran(`general.state.${data.state}`)}`}
                dateSuffix={`(${Trans.tran(work_type_tran)})`}
                employeeName={employee ? employee.full_name : null}
                dataChangeLatest={dataChangeLatest}
            />
            <List style={[s.flx_warp, s.bg_white]}>
                <CheckInDetail
                    type="check_in"
                    place={getPlaceForRender(data, 'check_in_place')}
                    placeType={ref(data, 'check_in_place.type')}
                    time={getTimeForRender(data, 'checked_in_at')}
                    state={data.state}
                    withBorderDivide
                />
                <View style={styles.line} />
                <CheckInDetail
                    type="check_out"
                    place={getPlaceForRender(data, 'check_out_place')}
                    placeType={ref(data, 'check_out_place.type')}
                    time={getTimeForRender(data, 'checked_out_at')}
                    state={data.state}
                />
            </List>
        </TouchableOpacity>
    )}
;

CheckTimeAdjustmentList.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    dataChangeLatest: PropTypes.bool
};

CheckTimeAdjustmentList.defaultProps = {
    dataChangeLatest: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: themeVariables.isAndroid ? '99.5%' : '100%'
    },
    line: {
        flexBasis: 10,
        flexGrow: 0,
        backgroundColor: themeVariables.grayLighter
    },
});

export default CheckTimeAdjustmentList;
