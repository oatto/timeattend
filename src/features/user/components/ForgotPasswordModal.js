import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import CommonText from "_features/common/components/CommonText";
import MngModal from "_features/mng-core/components/MngModal";
import ForgetPasswordForm from '_features/user/forms/ForgetPasswordForm';
import Trans from '_features/common/containers/Trans';

const ForgetPasswordModal = (props) => {
    return (
        <MngModal
            isVisible={props.isVisible}
            title={Trans.tran('user.login.forget_password.title')}
            onClosePress={props.onClosePress}
            modalProps={props.modalProps}
        >
            <View>
                <CommonText
                    style={[s.ph3, s.tc]}
                    text={Trans.tran('user.login.forget_password.description')}
                />
                <ForgetPasswordForm
                    onSubmit={(values) => {
                        if (isEmpty(values.email)) {
                            alert(Trans.tran('user.login.forget_password.validation.not_blank'));

                            return;
                        }

                        props.onConfirm(values);
                    }}
                />
            </View>
        </MngModal>
    )
};

ForgetPasswordModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClosePress: PropTypes.func.isRequired,
    modalProps: PropTypes.object,
};
ForgetPasswordModal.defaultProps = {
    modalProps: {},
};

export default ForgetPasswordModal;
