import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { View } from 'react-native';
import MngModal from "_features/mng-core/components/MngModal";
import MobileDeviceForm from '_features/mng-core/forms/MobileDeviceForm';
import Trans from '_features/common/containers/Trans';

const MngModalMobileDevice = (props) => {
    return (
        <MngModal
            isVisible={props.isVisible}
            title={Trans.tran('mng.core.mobile_device.modal.set_name')}
            onClosePress={props.onClosePress}
            modalProps={props.modalProps}
        >
            <View>
                <MobileDeviceForm
                    initialValues={{name: props.defaultName}}
                    onSubmit={(values) => {
                        if (isEmpty(values.name)) {
                            alert(Trans.tran('mng.core.mobile_device.modal.form.alert_name'));

                            return;
                        }

                        props.onConfirm(values);
                    }}
                />
            </View>
        </MngModal>
    )
};

MngModalMobileDevice.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClosePress: PropTypes.func.isRequired,
    modalProps: PropTypes.object,
    defaultName: PropTypes.string
};
MngModalMobileDevice.defaultProps = {
    modalProps: {},
    defaultName: undefined
};

export default MngModalMobileDevice;
