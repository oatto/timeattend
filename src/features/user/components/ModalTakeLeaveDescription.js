import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import CommonText from "_features/common/components/CommonText";

const ModalTakeLeaveDescription = ({data}) => {
    return (
        <View padder>
            <CommonText
                text={data.description}
            />
        </View>
    )
};

ModalTakeLeaveDescription.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ModalTakeLeaveDescription;
