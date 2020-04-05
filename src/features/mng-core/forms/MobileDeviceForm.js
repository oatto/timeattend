/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {Form, Button, View} from 'native-base';
import {styles as s} from 'react-native-style-tachyons';
import themeVariables from '_theme';
import {CommonInput} from '_features/common/components/form/index';
import CommonFormGroup from '_features/common/components/form/CommonFormGroup';
import Hr from '_features/common/components/Hr';
import CommonText from "../../common/components/CommonText";
import Trans from "../../common/containers/Trans";

export const NAME = 'mobileDeviceForm';

class MobileDeviceForm extends React.PureComponent {
    render() {
        return (
            <Form>
                <View style={s.pa2}>
                    <CommonFormGroup
                        style={themeVariables.globalStyle.flex0}
                        field={
                            <Field
                                name={'name'}
                                component={CommonInput}
                                placeholder={Trans.tran('mng.core.mobile_device.modal.form.placeholder_name')}
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
                            text={Trans.tran('general.confirm')}
                        />
                    </Button>
                </View>
            </Form>
        )
    }
}

MobileDeviceForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default (reduxForm({
    form: NAME
})(MobileDeviceForm));
