import React from 'react';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import { View } from 'react-native';
import ColumnList from "_features/common/components/ColumnList";

const MngMobileDeviceDetail = (props) => {
    const data = props.data;

    return (
        <View style={[s.ph3, s.pb3]}>
            {data.name && (<ColumnList
                label={'mng.core.mobile_device.modal.body.name'}
                data={data.name}
            />)}
            <ColumnList
                label={'mng.core.mobile_device.modal.body.model'}
                data={data.model}
            />
            <ColumnList
                label={'mng.core.mobile_device.modal.body.platform'}
                data={data.platform}
            />
        </View>
    )
};

MngMobileDeviceDetail.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MngMobileDeviceDetail;
