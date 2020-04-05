/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, Button, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import { SearchIcon, CloseIcon } from '_features/common/components/icons/AppIcons';
import { CommonInput, CommonChoice } from '_features/common/components/form/index';
import CommonFormGroup from '_features/common/components/form/CommonFormGroup';
import Trans from '_features/common/containers/Trans';

export const NAME = 'employeeSearchForm';

class EmployeeSearchForm extends React.PureComponent {
    render() {
        const showClearButton = this.props.hasEmployeeSearch && this.props.submitSucceeded;
        const allClearButton = showClearButton || (this.props.department && this.props.submitSucceeded);

        if (this.props.departments.length) {
            this.props.departments.unshift({label: 'ทุกแผนก', value: 'allDepartment'});
        }

        return (
            <Form style={[s.flx_row, s.pv1]}>
                <View fill style={styles.inputContainer}>
                    {this.props.withDepartment && (
                        <CommonFormGroup
                            field={
                                <Field
                                    name={'department'}
                                    component={CommonChoice}
                                    multiple={false}
                                    expand={false}
                                    choices={this.props.departments}
                                    label={'mng.employee_search.form.department.label'}
                                    placeholder={'mng.employee_search.form.department.label'}
                                />
                            }
                            style={themeVariables.globalStyle.flex0}
                        />
                    )}

                    <CommonFormGroup
                        field={
                            <View>
                                <Field
                                    name={'employee'}
                                    component={CommonInput}
                                    placeholder={Trans.tran('mng.employee_search.form.employee.placeholder')}
                                    last={false}
                                    clearButton={showClearButton && this.props.showClearButtonInner}
                                    onClear={() => {
                                        this.props.onSubmit({
                                            department: this.props.department
                                        });

                                        this.props.onClear();
                                    }}
                                />
                            </View>

                        }
                        style={[s.mb0, themeVariables.globalStyle.flex0]}
                    />
                </View>
                <View style={[styles.searchButtonContainer, s.flx_warp]}>
                    <Button
                        title={null}
                        primary
                        style={[s.pa2, styles.button, this.props.showClearButtonInner ? undefined : styles.spaceBetweenButton]}
                        onPress={
                            this.props.handleSubmit(this.props.onSubmit)
                        }
                    >
                        <SearchIcon style={s.asc} />
                    </Button>
                    {(allClearButton && !this.props.showClearButtonInner) &&
                        <Button
                            title={null}
                            primary
                            style={[s.pa2, styles.button]}
                            onPress={() => {
                                this.props.allClear();
                                this.props.reset();
                            }}
                        >
                            <CloseIcon style={s.asc} />
                        </Button>
                    }
                </View>
            </Form>
        )
    }
}

EmployeeSearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    withDepartment: PropTypes.bool,
    departments: PropTypes.array,
    allClear: PropTypes.func,
    showClearButtonInner: PropTypes.bool
};
EmployeeSearchForm.defaultProps = {
    withDepartment: false,
    departments: [],
    onClear: () => {},
    allClear: () => {},
    showClearButtonInner: true,
};

const styles = StyleSheet.create({
    searchButtonContainer: {
        paddingHorizontal: themeVariables.sp2,
        paddingVertical: themeVariables.sp1,
        flexGrow: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center'
    },
    spaceBetweenButton: {
        marginBottom: themeVariables.sp3/1.5
    },
    inputContainer: {
        flexGrow: 1,
        paddingLeft: themeVariables.sp2,
        justifyContent: 'center',
    }
});

export default connect(
    state => {
        return {
            hasEmployeeSearch: !!formValueSelector(NAME)(state, 'employee'),
            department: formValueSelector(NAME)(state, 'department'),
        }
    }
)(reduxForm({
    form: NAME,
})(EmployeeSearchForm));

// FIXME: for tab
export const EmployeeSearchForm1 = connect(
    state => {
        return {
            hasEmployeeSearch: !!formValueSelector(NAME + '1')(state, 'employee'),
            department: formValueSelector(NAME + '1')(state, 'department'),
        }
    }
)(reduxForm({
    form: NAME + '1',
})(EmployeeSearchForm));

export const EmployeeSearchForm2 = connect(
    state => {
        return {
            hasEmployeeSearch: !!formValueSelector(NAME + '2')(state, 'employee'),
            department: formValueSelector(NAME + '2')(state, 'department'),
        }
    }
)(reduxForm({
    form: NAME + '2',
})(EmployeeSearchForm));
