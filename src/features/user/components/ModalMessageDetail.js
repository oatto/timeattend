import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import CommonText from "_features/common/components/CommonText";

const ModalMessageDetail = ({data}) => {
    return (
        <View padder>
            <CommonText
                text={data.message}
            />
        </View>
    )
};

ModalMessageDetail.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ModalMessageDetail;
