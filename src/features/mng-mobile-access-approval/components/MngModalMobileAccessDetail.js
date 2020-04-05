import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import ColumnList from '_features/common/components/ColumnList';

const MngModalMobileAccessDetail = ({data}) => {
    return (
        <View padder>
            <ColumnList
                label={"mng.mobile_access_approval.modal.employee_full_name"}
                data={data.employee.full_name}
            />
            <ColumnList
                label={'mng.mobile_access_approval.modal.model'}
                data={data.mobile_device.model}
            />
            <ColumnList
                label={'mng.mobile_access_approval.modal.platform'}
                data={data.mobile_device.platform}
            />
        </View>
    )
};

MngModalMobileAccessDetail.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MngModalMobileAccessDetail;
