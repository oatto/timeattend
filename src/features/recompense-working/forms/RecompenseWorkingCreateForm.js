/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Content, Form, View } from 'native-base';
import Validation from 'react-native-core/validation';
import themeVariables from '_theme';
import Trans from "_features/common/containers/Trans";
import { styles as s } from 'react-native-style-tachyons';
import CommonFormGroup from '_features/common/components/form/CommonFormGroup';
import { SaveIcon } from '_features/common/components/icons/AppIcons';
import CommonText from '_features/common/components/CommonText';
import { CommonDateTimePicker, CommonTextarea } from '_features/common/components/form/index';
import ButtonSubmit from "../../common/components/form/ButtonSubmit";
import CommonLabelFormGroup from "../../common/components/form/CommonLabelFormGroup";

export const NAME = 'recompenseWorkingCreateForm';

export const validate = values => {
    const errors = [];
    if (Validation.NotBlank(values.workDate)) {
        errors.push(Trans.tran('recompense_working.form.please_select_date_add'));
    }

    if (Validation.NotBlank(values.recompenseDate)) {
        errors.push(Trans.tran('recompense_working.form.please_select_change_date'));
    } else {
        if (values.workDate === values.recompenseDate) {
            errors.push(Trans.tran('recompense_working.form.change_of_working_day'));
        }
    }

    if (Validation.NotBlank(values.reason)) {
        errors.push(Trans.tran('time_adjustment.form.fill_reason'));
    }

    if (!errors.length) {
        return true;
    }

    Alert.alert(Trans.tran('check_time.alert_reducer.alert'), errors.join('\r\n'));
    return false;
};

class RecompenseWorkingCreateForm extends React.PureComponent {
    render() {
        return (
            <Form style={s.flx_i}>
                <Content whiteBackground>
                    <View>
                        <View padder withBackground>
                            <CommonText
                                text={Trans.tran('recompense_working.form.title_form')}
                                bold
                                style={s.mb2}
                            />
                            <CommonFormGroup
                                label={<CommonLabelFormGroup label={Trans.tran('recompense_working.day_time_let_do')} required />}
                                field={
                                    <Field
                                        name={'recompenseDate'}
                                        component={CommonDateTimePicker}
                                        placeholder={Trans.tran('recompense_working.form.choose_date')}
                                    />
                                }
                            />
                        </View>
                        <View padder>
                            <CommonFormGroup
                                label={<CommonLabelFormGroup label={Trans.tran('recompense_working.request_day_time_change')} required />}
                                field={
                                    <Field
                                        name={'workDate'}
                                        component={CommonDateTimePicker}
                                        placeholder={Trans.tran('recompense_working.form.choose_date')}
                                    />
                                }
                            />
                            <CommonFormGroup
                                label={<CommonLabelFormGroup label={Trans.tran('recompense_working.reason')} required />}
                                field={
                                    <Field
                                        required
                                        name={'reason'}
                                        component={CommonTextarea}
                                        placeholder={Trans.tran('time_adjustment.form.fill_reason')}
                                        rowSpan={4}
                                    />
                                }
                            />
                            <CommonText
                                text={Trans.tran('time_adjustment.form.please_check_information')}
                                style={styles.infoText}
                            />
                            <ButtonSubmit
                                onPress={this.props.handleSubmit(this.props.onSubmit)}
                                icon={<SaveIcon style={s.mr1} />}
                                label={'recompense_working.save'}
                            />
                        </View>
                    </View>
                </Content>
            </Form>
        )
    }
}

RecompenseWorkingCreateForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    infoText: {
        textAlign: 'left',
        color: themeVariables.danger,
        marginBottom: themeVariables.sp3
    },
});

export default (reduxForm({
    form: NAME
})(RecompenseWorkingCreateForm));
