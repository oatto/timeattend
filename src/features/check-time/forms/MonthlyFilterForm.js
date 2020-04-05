/* eslint-disable react/prop-types */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {styles as s} from 'react-native-style-tachyons';
import {Field, reduxForm} from 'redux-form';
import {Form, Button} from 'native-base';
import themeVariables from '_theme';
import {CommonChoice} from '_features/common/components/form/index';
import {SearchIcon} from '_features/common/components/icons/AppIcons';

export const NAME = 'MonthlyFilterForm';

class MonthlyFilterForm extends React.PureComponent {
    static months = [
        {label: 'มกราคม', value: '01'},
        {label: 'กุมภาพันธ์', value: '02'},
        {label: 'มีนาคม', value: '03'},
        {label: 'เมษายน', value: '04'},
        {label: 'พฤษภาคม', value: '05'},
        {label: 'มิถุนายน', value: '06'},
        {label: 'กรกฎาคม', value: '07'},
        {label: 'สิงหาคม', value: '08'},
        {label: 'กันยายน', value: '09'},
        {label: 'ตุลาคม', value: '10'},
        {label: 'พฤศจิกายน', value: '11'},
        {label: 'ธันวาคม', value: '12'},
    ];

    static years = (function () {
        const d = new Date();
        let arrYears = [];

        for (let i = 2018; i <= d.getFullYear(); i++) {
            arrYears.push({label: i.toString(), value: i.toString()})
        }

        return arrYears
    })();

    render() {
        return (
            <Form style={styles.containerForm}>
                <View style={[s.flx_i, s.jcc]}>
                    <Field
                        name={'year'}
                        component={CommonChoice}
                        allowClearSelectedValue={false}
                        placeholder={'check_time.history.titleTab.title_monthly_Summary.form.placeholder.choose_year'}
                        required
                        expand={false}
                        choices={MonthlyFilterForm.years}
                        iconStyle={s.primary}
                        rounded={false}
                        style={styles.yearField}
                    />
                </View>
                <View style={[s.flx_i, s.jcc]}>
                    <Field
                        name={'month'}
                        component={CommonChoice}
                        allowClearSelectedValue={false}
                        placeholder={'check_time.history.titleTab.title_monthly_Summary.form.placeholder.choose_month'}
                        required
                        expand={false}
                        choices={MonthlyFilterForm.months}
                        iconStyle={s.primary}
                        rounded={false}
                        style={styles.monthField}
                    />
                </View>
                <Button
                    style={[styles.submitButton, s.br2, s.jcc]}
                    onPress={this.props.handleSubmit(this.props.onSubmit)}
                >
                    <SearchIcon color={themeVariables.brandPrimary} />
                </Button>
            </Form>
        )
    }
}

MonthlyFilterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    containerForm: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
    },
    yearField: {
        marginRight: themeVariables.sp2,
    },
    monthField: {
        marginRight: themeVariables.sp2,
    },
    submitButton: {
        width: 30,
        backgroundColor: themeVariables.transparent,
        elevation: themeVariables.isAndroid ? 0 : 2
    }
});

export default connect(
)(reduxForm({
    form: NAME,
    destroyOnUnmount: false
})(MonthlyFilterForm));

// FIXME: for tab
export const MonthlyFilterForm1 = connect(
)(reduxForm({
    form: NAME + '1',
    destroyOnUnmount: false
})(MonthlyFilterForm));

export const MonthlyFilterForm2 = connect(
)(reduxForm({
    form: NAME + '2',
    destroyOnUnmount: false
})(MonthlyFilterForm));
