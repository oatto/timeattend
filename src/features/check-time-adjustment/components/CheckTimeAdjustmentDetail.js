import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ViewPropTypes } from 'react-native';
import { Text, View } from 'native-base';
import moment from '_utils/moment';
import { styles as s } from 'react-native-style-tachyons';
import ref from 'react-native-core/utils/ref';
import ColumnList from '_features/common/components/ColumnList';
import Trans from '_features/common/containers/Trans';
import themeVariables from '_theme';

const CheckTimeAdjustmentDetail = (props) => {
    const data = props.data;
    const oldCheckIn = ref(data, 'from_checked_in_at');
    const oldCheckOut = ref(data, 'from_checked_out_at');
    const oldPlace = ref(data, 'from_check_in_place');
    const checkInPlace = ref(data, 'check_in_place');

    const checkState = data.state === 'requested' ?
        Trans.tran('recompense_working.show_screen.requested') : data.state === 'approved' ?
            Trans.tran('recompense_working.show_screen.approved') : data.state === 'cancelled' ?
                Trans.tran('recompense_working.show_screen.cancelled') : data.state === 'rejected' ?
                    Trans.tran('recompense_working.show_screen.rejected') : '';

    return (
        <View>
            <View withBackground padderVertical>
                <ColumnList
                    label="time_adjustment.edit_time.before_edit"
                    labelWeight={{bold: true}}
                    data={`${moment(data.date).format('dddd D MMMM YYYY')}`}
                    dataWeight={{bold: true}}
                />
                <ColumnList
                    label="time_adjustment.show.time"
                    data={
                        (oldCheckIn ? moment(oldCheckIn).format('HH:mm') : '--:--')
                        + ' - ' +
                        (oldCheckOut ? moment(oldCheckOut).format('HH:mm') : '--:--')
                    }
                />
                <ColumnList
                    label="time_adjustment.show.check_in_place"
                    data={oldPlace ? oldPlace : '-'}
                />
            </View>
            <View whiteBackground padderVertical>
                <ColumnList
                    label="time_adjustment.edit_time.after_edit"
                    labelWeight={{bold: true}}
                    data={`${moment(data.date).format('dddd D MMMM YYYY')}`}
                    dataWeight={{bold: true}}
                />
                <ColumnList
                    label="time_adjustment.show.time"
                    data={
                        `${moment(data.checked_in_at).format('HH:mm')}` + ' - ' +
                        `${moment(data.checked_out_at).format('HH:mm')}`
                    }
                />
                <ColumnList
                    label="time_adjustment.show.check_in_place"
                    data={checkInPlace ? checkInPlace.name : '-'}
                />
                <ColumnList
                    label="time_adjustment.show.reason"
                    data={`${data.reason}`}
                    dataStyle={s.pr2}
                />
                <ColumnList
                    containerStyle={s.mt3}
                    label="time_adjustment.show.status"
                    data={checkState}
                    dataStyle={s[themeVariables.getKeyColorForState(data.state)]}
                />
                { data.state === 'rejected' ?
                    <ColumnList
                        label="general.state.rejected_reason"
                        data={data.rejected_reason}
                        dataStyle={s.primary}
                    /> : null
                }
            </View>
        </View>
    )}
;

CheckTimeAdjustmentDetail.propTypes = {
    data: PropTypes.object.isRequired,
    labelStyle: Text.propTypes.style,
    labelElement: ViewPropTypes.style,
};

CheckTimeAdjustmentDetail.defaultProps = {
    labelStyle: {},
    labelElement: {}
};

const styles = StyleSheet.create({});

export default CheckTimeAdjustmentDetail;
