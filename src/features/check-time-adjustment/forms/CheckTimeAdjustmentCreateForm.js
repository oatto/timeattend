/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import { Field, reduxForm } from 'redux-form';
import { Content, Form, View } from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import CommonFormGroup from '_features/common/components/form/CommonFormGroup';
import Validation from 'react-native-core/validation';
import ref from 'react-native-core/utils/ref';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';
import { SaveIcon } from '_features/common/components/icons/AppIcons';
import CommonText from '_features/common/components/CommonText';
import { CommonChoice, CommonDateTimePicker, CommonTextarea } from '_features/common/components/form/index';
import { LOCATION_CREATE } from '_features/location/router';
import ButtonSubmit from "_features/common/components/form/ButtonSubmit";
import CommonLabelFormGroup from "_features/common/components/form/CommonLabelFormGroup";
import { userHasPermission } from "_features/user/redux/selectors";

export const NAME = 'checkTimeAdjustmentCreateForm';

export const validate = values => {
    const errors = [];
    if (Validation.NotBlank(values.date)) {
        errors.push(Trans.tran('time_adjustment.form.please_select_date'));
    }

    if (Validation.NotBlank(values.checkedInAt)) {
        errors.push(Trans.tran('time_adjustment.alert.please_select_time_check_in'));
    }

    if (Validation.NotBlank(values.checkedOutAt)) {
        errors.push(Trans.tran('time_adjustment.alert.please_select_time_check_out'));
    }

    if (Validation.NotBlank(values.reason)) {
        errors.push(Trans.tran('time_adjustment.alert.please_enter_reason'));
    }

    if (Validation.NotBlank(values.checkInPlace)) {
        errors.push(Trans.tran('time_adjustment.alert.please_select_location'));
    }

    if (!errors.length) {
        return true;
    }

    Alert.alert(Trans.tran('check_time.alert_reducer.alert'), errors.join('\r\n'));
    return false;
};

class CheckTimeAdjustmentCreateForm extends React.PureComponent {
    render() {
        let locations = [];

        if (isArray(this.props.locations)) {
            locations = this.props.locations.map((data) => {
                return {
                    label: data.name,
                    value: data.id
                };
            });

            if (this.props.canCreateNewLocation) {
                locations.push({label: Trans.tran('location_create.new_button'), value: '_addNew'});
            }
        }

        return (
            <Form style={s.flx_i}>
                <Content whiteBackground>
                    <View padder>
                        <View style={s.pb3}>
                            <CommonText
                                text={Trans.tran('time_adjustment.form.edit_time')}
                                bold
                            />
                            <CommonFormGroup
                                label={
                                    <CommonLabelFormGroup
                                        label={Trans.tran('time_adjustment.form.date')}
                                        required
                                    />
                                }
                                field={<Field
                                    name={'date'}
                                    component={CommonDateTimePicker}
                                    placeholder={Trans.tran('time_adjustment.form.please_select_date')}
                                    disabled={this.props.initialValues.date !== undefined}
                                />}
                                style={s.mt2}
                            />
                            <View style={[s.flx_row, s.jcsb]}>
                                <CommonFormGroup
                                    label={
                                        <CommonLabelFormGroup
                                            label={Trans.tran('time_adjustment.form.edit_time_check_in')}
                                            required
                                        />
                                    }
                                    field={<Field
                                        name={'checkedInAt'}
                                        component={CommonDateTimePicker}
                                        placeholder={Trans.tran('time_adjustment.form.edit_time_check_in')}
                                        mode={'time'}
                                    />}
                                    style={styles.timePicker}
                                />
                                <CommonFormGroup
                                    label={
                                        <CommonLabelFormGroup
                                            label={Trans.tran('time_adjustment.form.edit_time_check_out')}
                                            required
                                        />
                                    }
                                    field={<Field
                                        name={'checkedOutAt'}
                                        component={CommonDateTimePicker}
                                        placeholder={Trans.tran('time_adjustment.form.edit_time_check_out')}
                                        mode={'time'}
                                    />}
                                    style={styles.timePicker}
                                />
                            </View>
                            <CommonFormGroup
                                label={
                                    <CommonLabelFormGroup
                                        label={Trans.tran('time_adjustment.form.check_in_place')}
                                        required
                                    />
                                }
                                field={<Field
                                    name={'checkInPlace'}
                                    component={CommonChoice}
                                    choices={locations}
                                    expand={false}
                                    iconStyle={s.primary}
                                    multiple={false}
                                    placeholder={'time_adjustment.form.placeholder.check_in_place'}
                                    createNewScreen={LOCATION_CREATE}
                                    disabled={this.props.initialValues.checkInPlace !== undefined}
                                />}
                            />
                            <CommonFormGroup
                                label={
                                    <CommonLabelFormGroup
                                        label={Trans.tran('time_adjustment.form.reason')}
                                        required
                                    />
                                }
                                field={<Field
                                    required
                                    name={'reason'}
                                    component={CommonTextarea}
                                    placeholder={Trans.tran('time_adjustment.form.fill_reason')}
                                    rowSpan={4}
                                />}
                            />
                            <CommonText
                                text={Trans.tran('time_adjustment.form.please_check_information')}
                                style={styles.informationText}
                            />
                        </View>
                        <ButtonSubmit
                            onPress={this.props.handleSubmit(this.props.onSubmit)}
                            label={'general.submit_requested'}
                            icon={<SaveIcon style={s.mr1} />}
                            gradientBackground
                        />
                    </View>
                </Content>
            </Form>
        )
    }
}

CheckTimeAdjustmentCreateForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    locations: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};
CheckTimeAdjustmentCreateForm.defaultProps = {
    locations: []
};

const styles = StyleSheet.create({
    informationText: {
        fontSize: themeVariables.fs6,
        color: themeVariables.primary
    },
    timePicker: {
        flexBasis: '48%',
        flex: 0
    }
});

export default connect(
    (state) => {
        return {
            canCreateNewLocation: userHasPermission(state, 'coordinate_location_create'),
        }
    }
)(reduxForm({
    form: NAME
})(CheckTimeAdjustmentCreateForm));
