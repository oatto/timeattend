/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { Field, reduxForm, change } from 'redux-form';
import Validation from 'react-native-core/validation';
import { styles as s } from 'react-native-style-tachyons';
import { Alert, StyleSheet } from 'react-native';
import { Container, Content, Form, View } from 'native-base';
import themeVariables from '_theme';
import CommonFormGroup from '_features/common/components/form/CommonFormGroup';
import Trans from "_features/common/containers/Trans";
import {
    CommonChoice,
    CommonDateTimePicker,
    CommonTextarea,
    CommonImage
} from '_features/common/components/form/index';
import CommonText from "_features/common/components/CommonText";
import {SaveIcon} from "_features/common/components/icons/AppIcons";
import ButtonSubmit from "_features/common/components/form/ButtonSubmit";
import CommonLabelFormGroup from "_features/common/components/form/CommonLabelFormGroup";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";

export const NAME = 'takeLeaveRequestCreateForm';

export const validate = values => {
    const errors = [];
    if (Validation.NotBlank(values.companyTakeLeaveSetting)) {
        errors.push(Trans.tran('take_leave_request.validation.list_can_not_null'));
    }

    if (values.leaveHours) {
        if (values.startDate) {
            if (Validation.NotBlank(values.startDate.time)) {
                errors.push(Trans.tran('take_leave_request.validation.please_select_star_time'))
            }
        }
    }

    if (Validation.NotBlank(values.startDate)) {
        errors.push(Trans.tran('take_leave_request.validation.please_select_leave'))
    }

    if (Validation.NotBlank(values.endDate)) {
        errors.push(Trans.tran('take_leave_request.validation.please_select_end_date'))
    }

    if (Validation.NotBlank(values.reason)) {
        errors.push(Trans.tran('take_leave_request.validation.please_reason_leave'))
    }

    if (!errors.length) {
        return true;
    }

    Alert.alert(Trans.tran('check_time.alert_reducer.alert'), errors.join('\r\n'));
    return false;
};

class TakeLeaveRequestCreateForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            allowTakeLeaveHour: true,
            leaveHours: false
        };
    }

    render() {
        return (
            <Container iPhoneXSupport>
                <Content whiteBackground>
                    <Form style={this.props.styleForm}>
                        <View padder withBackground>
                            <Field
                                name={'image[file]'}
                                component={CommonImage}
                                label={Trans.tran('take_leave_request.take_leave_create.attach_file')}
                            />
                        </View>
                        <View padder>
                            <CommonText
                                text={Trans.tran('take_leave_request.title_form')}
                                bold
                                style={s.mb2}
                            />
                            <CommonFormGroup
                                label={<CommonLabelFormGroup label={Trans.tran('take_leave_request.title_picker_type_leave')} required />}
                                field={<Field
                                    name={'companyTakeLeaveSetting'}
                                    component={CommonChoice}
                                    choices={this.props.takeLeaveTypeChoices}
                                    placeholder={'take_leave_request.take_leave_create.placeholder.company_setting'}
                                    expand={false}
                                    multiple={false}
                                    iconStyle={s.primary}
                                    onChange={(value) => {
                                        const takeLeaveType = find(this.props.takeLeaveTypeChoices, {
                                            value
                                        });

                                        let allowTakeLeaveHour = true;
                                        if (takeLeaveType) {
                                            allowTakeLeaveHour = !isEmpty(takeLeaveType.allowTakeLeave)
                                        }

                                        this.setState({allowTakeLeaveHour});
                                        if (!allowTakeLeaveHour) {
                                            this.props.setLeaveHoursToDate();
                                            this.setState({leaveHours: 0});
                                        }
                                    }}
                                />}
                            />
                            <CommonFormGroup
                                label={<CommonLabelFormGroup label={Trans.tran('take_leave_request.take_leave_create.typeTime')} required />}
                                field={<Field
                                    name={'leaveHours'}
                                    component={CommonChoice}
                                    choices={this.props.timingChoices}
                                    expand
                                    multiple={false}
                                    spaceBetweenRadio={styles.smallestSpace}
                                    disabledChoiceId={!this.state.allowTakeLeaveHour ? 2 : null}
                                    onChange={(value) => {
                                        this.setState({leaveHours: value});
                                    }}
                                />}
                            />
                            <CommonFormGroup
                                label={<CommonLabelFormGroup label={Trans.tran('take_leave_request.take_leave_create.start_date')} required />}
                                field={<Field
                                    name={'startDate[date]'}
                                    component={CommonDateTimePicker}
                                    placeholder={Trans.tran('take_leave_request.take_leave_create.placeholder.start_date')}
                                />}
                            />
                            <View style={[{display: this.state.leaveHours ? 'none' : 'flex'}]}>
                                <CommonFormGroup
                                    label={<CommonLabelFormGroup label={Trans.tran('take_leave_request.take_leave_create.end_date')} required />}
                                    field={<Field
                                        name={'endDate[date]'}
                                        component={CommonDateTimePicker}
                                        placeholder={Trans.tran('take_leave_request.take_leave_create.placeholder.end_date')}
                                    />}
                                />
                            </View>
                            <View style={[{display: this.state.leaveHours ? 'flex' : 'none'}, s.flx_row, s.jcsb]}>
                                <CommonFormGroup
                                    label={<CommonLabelFormGroup label={Trans.tran('take_leave_request.take_leave_create.start_time')} required />}
                                    field={
                                        <Field
                                            name={'startDate[time]'}
                                            component={CommonDateTimePicker}
                                            placeholder={Trans.tran('take_leave_request.take_leave_create.placeholder.start_time')}
                                            mode={'time'}
                                        />
                                    }
                                    style={styles.timePickerFirst}
                                />
                                <CommonFormGroup
                                    label={<CommonLabelFormGroup label={Trans.tran('take_leave_request.take_leave_create.end_time')} required />}
                                    field={
                                        <Field
                                            name={'endDate[time]'}
                                            component={CommonDateTimePicker}
                                            placeholder={Trans.tran('take_leave_request.take_leave_create.placeholder.end_time')}
                                            mode={'time'}
                                        />
                                    }
                                    style={styles.timePickerLast}
                                />
                            </View>

                            <CommonFormGroup
                                label={<CommonLabelFormGroup label={Trans.tran('take_leave_request.take_leave_create.reason')} required />}
                                field={
                                    <Field
                                        required
                                        name={'reason'}
                                        component={CommonTextarea}
                                        rounded={false}
                                        placeholder={Trans.tran('time_adjustment.form.fill_reason')}
                                        rowSpan={4}
                                    />
                                }
                            />
                        </View>
                    </Form>
                    <View padderHorizontal style={s.pb2}>
                        <ButtonSubmit
                            onPress={this.props.handleSubmit(this.props.onSubmit)}
                            icon={<SaveIcon />}
                            label={'take_leave_request.take_leave_create.next'}
                            gradientBackground
                        />
                    </View>
                </Content>
            </Container>
        )
    }
}

TakeLeaveRequestCreateForm.propTypes = {
    onSubmit: PropTypes.func,
    timingChoices: PropTypes.array.isRequired,
    takeLeaveTypeChoices: PropTypes.array.isRequired,
    styleForm: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
    btn: PropTypes.bool,
    field: PropTypes.bool
};

TakeLeaveRequestCreateForm.defaultProps = {
    onSubmit: null,
    styleForm: {},
    btn: true,
    field: true
};

const styles = StyleSheet.create({
    smallestSpace: {
        marginTop: themeVariables.sp1/2
    },
    timePickerFirst: {
        flex: 1,
        paddingRight: themeVariables.sp1
    },
    timePickerLast: {
        flex: 1,
        paddingLeft: themeVariables.sp1
    }
});

export default connect(
    null,
    (dispatch) => ({
        setLeaveHoursToDate: () => dispatch(change(NAME, 'leaveHours', false))
    })
)(reduxForm({
    form: NAME,
})(TakeLeaveRequestCreateForm));
