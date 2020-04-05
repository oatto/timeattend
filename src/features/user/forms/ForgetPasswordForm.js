/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import { CommonInput } from '_features/common/components/form/index';
import CommonFormGroup from '_features/common/components/form/CommonFormGroup';
import Hr from '_features/common/components/Hr';
import CommonText from "_features/common/components/CommonText";
import Trans from "_features/common/containers/Trans";

export const NAME = 'forgetPasswordForm';

class ForgetPasswordForm extends React.PureComponent {
    render() {
        return (
            <Form>
                <View padder>
                    <CommonFormGroup
                        style={themeVariables.globalStyle.flex0}
                        field={
                            <Field
                                name={'email'}
                                component={CommonInput}
                                placeholder={Trans.tran('user.login.forget_password.placeholder.email')}
                            />
                        }
                    />
                </View>
                <Hr />
                <View style={[s.flx_row]}>
                    <Button
                        actionModal
                        full
                        onPress={this.props.handleSubmit(this.props.onSubmit)}
                    >
                        <CommonText
                            bold
                            text={Trans.tran('user.login.forget_password.submit')}
                        />
                    </Button>
                </View>
            </Form>
        )
    }
}

ForgetPasswordForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default (reduxForm({
    form: NAME
})(ForgetPasswordForm));
