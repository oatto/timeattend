import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import moment from '_utils/moment';
import Trans from '_features/common/containers/Trans';
import ColumnList from '_features/common/components/ColumnList';
import CommonText from '_features/common/components/CommonText';

const RecompenseWorkingDetail = (props) => {
    const data = props.data;

    const checkState = data.state === 'requested' ?
        Trans.tran('recompense_working.show_screen.requested') : data.state === 'approved' ?
            Trans.tran('recompense_working.show_screen.approved') : data.state === 'cancelled' ?
                Trans.tran('recompense_working.show_screen.cancelled') : data.state === 'rejected' ?
                    Trans.tran('recompense_working.show_screen.rejected') : data.state === 'requested_cancel' ?
                        Trans.tran('recompense_working.show_screen.requested_cancel') : '';

    return (
        <View>
            <ColumnList
                label="recompense_working.work_show_screen.date_add"
                data={moment(data.work_date).format('dddd D MMMM YYYY')}
            />
            <ColumnList
                label="recompense_working.work_show_screen.date_off"
                data={moment(data.recompense_date).format('dddd D MMMM YYYY')}
            />
            <ColumnList
                label="time_adjustment.show.reason"
                data={data.reason}
            />
            <ColumnList
                label="time_adjustment.show.status"
                data={checkState}
                dataStyle={s[themeVariables.getKeyColorForState(data.state)]}
            />
            { (data.state === 'rejected' || data.state === 'cancelled' || data.state === 'approved') ?
                <ColumnList
                    label="general.state.rejected_reason"
                    data={data.rejected_reason ? data.rejected_reason : '-'}
                    dataStyle={s[themeVariables.getKeyColorForState(data.state)]}
                /> : null
            }
        </View>
    );
};

RecompenseWorkingDetail.propTypes = {
    data: PropTypes.object.isRequired,
};

export default RecompenseWorkingDetail;
