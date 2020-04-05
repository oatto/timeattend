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
import { CommonChoice, CommonInput } from '_features/common/components/form/index';
import Trans from '_features/common/containers/Trans';

export const NAME = 'locationSearchForm';

export const validate = values => {
    const errors = [];

    if (!errors.length) {
        return true;
    }

    alert(errors.join('\r\n'));
    return false;
};

class LocationSearchForm extends React.PureComponent {
    static types = [
        {label: 'ทุกสถานที่ในระบบ', value: ''},
        {label: 'แบบพิกัดสถานที่', value: 'place'},
        {label: 'แบบ QR Code', value: 'qr'}
    ];

    render() {
        const showClearButton = this.props.hasLocationName && this.props.submitSucceeded;
        const allClearButton = showClearButton || (this.props.hasLocationType && this.props.submitSucceeded);

        return (
            <Form style={styles.containerForm}>
                <View fill>
                    <Field
                        name={'type'}
                        component={CommonChoice}
                        required
                        expand={false}
                        placeholder={'location_create.form.placeholder.type'}
                        choices={LocationSearchForm.types}
                        style={s.mb2}
                    />
                    <Field
                        name={'name'}
                        component={CommonInput}
                        placeholder={Trans.tran('location_create.form.placeholder.name')}
                        last={false}
                    />
                </View>

                <View style={styles.searchButtonContainer}>
                    <Button
                        title={null}
                        primary
                        style={[s.pa2, styles.button, allClearButton ? styles.spaceBetweenButton : undefined]}
                        onPress={
                            this.props.handleSubmit(this.props.onSubmit)
                        }
                    >
                        <SearchIcon style={s.asc} />
                    </Button>
                    {allClearButton &&
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

LocationSearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    allClear: PropTypes.func
};

LocationSearchForm.defaultProps = {
    allClear: () => {},
};

const styles = StyleSheet.create({
    containerForm: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    searchButtonContainer: {
        marginLeft: themeVariables.sp2,
        marginRight: themeVariables.sp1,
        flex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center'
    },
    spaceBetweenButton: {
        marginBottom: themeVariables.sp2
    },
    searchButton: {
        borderRadius: 100,
        flex: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
});

export default connect(
    state => {
        return {
            hasLocationName: !!formValueSelector(NAME)(state, 'name'),
            hasLocationType: formValueSelector(NAME)(state, 'type')
        }
    }
)(reduxForm({
    form: NAME
})(LocationSearchForm));
