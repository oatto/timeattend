import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { View } from 'react-native';
import MngModal from "_features/mng-core/components/MngModal";
import PushMessageForm from '_features/mng-employee-management/forms/PushMessageForm';
import Trans from '_features/common/containers/Trans';

const MngModalPushMessage = (props) => {
    return (
        <MngModal
            isVisible={props.isVisible}
            title={Trans.tran('mng.employee_management.modal.form.title')}
            onClosePress={props.onClosePress}
            modalProps={props.modalProps}
        >
            <View>
                <PushMessageForm
                    onSubmit={(values) => {
                        if (isEmpty(values.message)) {
                            alert(Trans.tran('mng.employee_management.modal.form.alert_empty'));

                            return;
                        }

                        props.onConfirm(values);
                    }}
                />
            </View>
        </MngModal>
    )
};

MngModalPushMessage.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClosePress: PropTypes.func.isRequired,
    modalProps: PropTypes.object,
};
MngModalPushMessage.defaultProps = {
    modalProps: {},
};

export default MngModalPushMessage;
