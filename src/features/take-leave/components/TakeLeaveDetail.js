import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, ViewPropTypes } from 'react-native';
import { Text, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import forEach from 'lodash/find';
import CommonLightBox from '_features/common/components/CommonLightBox';
import ref from 'react-native-core/utils/ref';
import themeVariables from '_theme';
import ColumnList from '_features/common/components/ColumnList';
import moment from '_utils/moment';
import Trans from '_features/common/containers/Trans';

const TakeLeaveDetail = (props) => {
    const data = props.data;
    const userTakeLeave = props.userTakeLeave;
    const dataImage = ref(data, '_links');
    const takeLeaveRequestHoursTotal = data.use_nb_hours ? data.use_nb_hours : 0;
    const takeLeaveRequestMinTotal = data.use_nb_minutes ? data.use_nb_minutes : 0;

    let takeLeaveTotal = null;
    let takeLeaveRemaining = null;

    forEach(userTakeLeave, function (values) {
        if (values.take_leave_setting.id === data.company_take_leave_setting.id) {
            const remainingMin = values.remaining_minutes ? values.remaining_minutes : 0;

            takeLeaveTotal = `${values.nb_days} ${Trans.tran('general.unit.day')}`;
            takeLeaveRemaining = `${values.remaining_days} ${Trans.tran('general.unit.day')} ${values.remaining_hours} ${Trans.tran('general.unit.hour')} ${remainingMin} ${Trans.tran('general.unit.min')}`;

            return false;
        }
    });

    let status = 'general.state.canceled';
    if (data.state === 'requested') {
        status = 'general.state.requested';
    } else if (data.state === 'approved') {
        status = 'general.state.approved';
    } else if (data.state === 'rejected') {
        status =  'general.state.rejected';
    } else if (data.state === 'requested_cancel') {
        status =  'general.state.requested_cancel';
    }

    return(
        <View>
            <View padder>
                <ColumnList
                    label="take_leave_request.take_leave_detail.form.list"
                    data={data.company_take_leave_setting.type_name}
                />
                <ColumnList
                    label="take_leave_request.take_leave_detail.form.day_take_leave"
                    data={moment(data.start_date).format('dddd D MMMM YYYY')}
                />
                <ColumnList
                    label="take_leave_request.take_leave_detail.form.end"
                    data={moment(data.end_date).format('dddd D MMMM YYYY')}
                />
                {takeLeaveTotal && <ColumnList
                    label="take_leave_request.take_leave_detail.form.authorized_per_year"
                    data={takeLeaveTotal}
                />}
                {takeLeaveRemaining && <ColumnList
                    label="take_leave_request.take_leave_detail.form.remain"
                    data={takeLeaveRemaining}
                />}
                <ColumnList
                    label="take_leave_request.take_leave_detail.request_total"
                    data={`${data.use_nb_days} ${Trans.tran('general.unit.day')} ${takeLeaveRequestHoursTotal} ${Trans.tran('general.unit.hour')} ${takeLeaveRequestMinTotal} ${Trans.tran('general.unit.min')}`}
                />
                <ColumnList
                    label="take_leave_request.take_leave_detail.form.detail"
                    data={data.reason}
                />
                <ColumnList
                    label="take_leave_request.take_leave_detail.form.state"
                    data={Trans.tran(status)}
                    dataStyle={s[themeVariables.getKeyColorForState(data.state)]}
                />
                {(data.state === 'rejected' || data.state === 'cancelled' || data.state === 'approved') && <ColumnList
                    label="take_leave_request.take_leave_detail.form.rejected_reason"
                    data={data.rejected_reason ? data.rejected_reason : '-'}
                    dataStyle={s[themeVariables.getKeyColorForState(data.state)]}
                />}
                {dataImage && <ColumnList
                    label="take_leave_request.take_leave_detail.form.attach_take_leave"
                    data={Trans.tran("take_leave_request.take_leave_detail.form.attach_file")}
                />}
            </View>
            { dataImage ?
                <CommonLightBox>
                    <Image
                        style={styles.imagePhoto}
                        source={{uri: dataImage.image.href}}
                        resizeMode={'contain'}
                    />
                </CommonLightBox>
                :
                <View />
            }
        </View>
    );
};

TakeLeaveDetail.propTypes = {
    data: PropTypes.object.isRequired,
    userTakeLeave: PropTypes.array,
    labelStyle: Text.propTypes.style,
    labelElement: ViewPropTypes.style,
};

TakeLeaveDetail.defaultProps = {
    userTakeLeave: [],
    labelStyle: {},
    labelElement: {}
};

const styles = StyleSheet.create({
    imagePhoto: {
        flex: 1,
        width: undefined,
        height: undefined
    }
});

export default TakeLeaveDetail;
