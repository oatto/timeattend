/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'native-base';
import Validation from 'react-native-core/validation';
import { CommonInput } from '_features/common/components/form/index';
import CommonFormGroup from "_features/common/components/form/CommonFormGroup";
import Trans from '_features/common/containers/Trans';
import CommonText from "_features/common/components/CommonText";
import themeVariable from '_theme';

export const NAME = 'login';

export const validate = values => {
    const errors = [];
    if (Validation.NotBlank(values.username)) {
        errors.push(Trans.tran('user.login.form.username_not_blank'));
    }
    if (Validation.NotBlank(values.password)) {
        errors.push(Trans.tran('user.login.form.password_not_blank'));
    }

    if (!errors.length) {
        return true;
    }

    Alert.alert(Trans.tran('check_time.alert_reducer.alert'), errors.join('\r\n'));
    return false;
};

const LoginForm = (props) => {
    return (
        <Form>
            <CommonFormGroup
                field={<Field
                    name={'username'}
                    component={CommonInput}
                    placeholder={Trans.tran('user.login.form.placeholder.username')}
                    rounded
                    style={s.pv1}
                    containerStyle={styles.inputContainer}
                    icon="user-alt"
                    iconStyle={styles.inputIcon}
                />}
            />
            <CommonFormGroup
                field={<Field
                    name={'password'}
                    component={CommonInput}
                    placeholder={Trans.tran('user.login.form.placeholder.password')}
                    containerStyle={styles.inputContainer}
                    secureTextEntry
                    rounded
                    icon="lock"
                    iconStyle={styles.inputIcon}
                    forgetPassword
                />}
            />
            <View style={styles.submitContainer}>
                <Button
                    full
                    rounded
                    transparent
                    onPress={props.handleSubmit(props.onSubmit)}
                    disabled={props.submitting}
                    style={styles.submitButton}
                >
                    <CommonText
                        bold
                        text={Trans.tran('user.login.form.submit')}
                        style={[s.pt1, s.white]}
                    />
                </Button>
            </View>
        </Form>
    )
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: themeVariable.white,
        paddingVertical: themeVariable.sp1/2
    },
    inputIcon: {
        padding: themeVariable.sp2,
        marginLeft: themeVariable.sp1,
        fontSize: themeVariable.fs6,
        color: themeVariable.gray
    },
    submitContainer: {
        borderRadius: themeVariable.borderRadiusLarge,
        borderColor: themeVariable.white
    },
    submitButton: {
        borderColor: themeVariable.white,
        borderWidth: themeVariable.borderWidth
    }
});

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: NAME
})(LoginForm)
