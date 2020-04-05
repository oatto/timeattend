import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { View } from 'react-native';
import MngModal from "_features/mng-core/components/MngModal";
import RejectReasonForm from '_features/mng-core/forms/RejectReasonForm';
import Trans from '_features/common/containers/Trans';

const MngModalRejectReason = (props) => {
    return (
        <MngModal
            isVisible={props.isVisible}
            title={Trans.tran('mng.core.modal.form.title')}
            onClosePress={props.onClosePress}
            modalProps={props.modalProps}
        >
            <View>
                <RejectReasonForm
                    onSubmit={(values) => {
                        if (isEmpty(values.rejectedReason)) {
                            alert(Trans.tran('mng.core.modal.form.alert_rejected_reason'));

                            return;
                        }

                        props.onConfirm(values);
                    }}
                />
            </View>
        </MngModal>
    )
};

MngModalRejectReason.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClosePress: PropTypes.func.isRequired,
    modalProps: PropTypes.object,
};
MngModalRejectReason.defaultProps = {
    modalProps: {},
};

export default MngModalRejectReason;
