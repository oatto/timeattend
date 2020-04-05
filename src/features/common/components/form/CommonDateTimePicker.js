import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import { StyleSheet, ViewPropTypes } from 'react-native';
import moment from '_utils/moment';
import themeVariables from '_theme';

class CommonDateTimePicker extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dateOrTime: this.props.input.value,
        }
    }

    render () {
        const { input, ...inputProps } = this.props;
        const isDateMode = this.props.mode === 'date';
        let displayMode = this.state.dateOrTime;

        if (this.state.dateOrTime && isDateMode) {
            displayMode = moment(this.state.dateOrTime, 'YYYY-MM-DD').format('dddd LL');
        }

        return (
            <DatePicker
                {...inputProps}
                format={isDateMode ? 'dddd LL' : 'HH:mm'}
                ref={(ref) => this.dataPickerRef = ref}
                placeholder={this.props.placeholder}
                confirmBtnText={this.props.confirmText}
                cancelBtnText={this.props.cancelText}
                onDateChange={(value) => {
                    const convertValue = isDateMode ? moment(value, 'dddd LL').format('YYYY-MM-DD') : value;

                    this.setState({dateOrTime: convertValue});
                    input.onChange(convertValue);
                }}
                date={displayMode}
                mode={this.props.mode}
                androidMode={'spinner'}
                showIcon={false}
                style={themeVariables.combineStyles(styles.datePicker, inputProps.style)}
                customStyles={{
                    dateInput: [styles.dateInputStyle, this.props.dateInputStyle],
                    placeholderText: {
                        fontFamily: themeVariables.fontCustomFamily,
                        fontSize: themeVariables.inputFontSize,
                        color: this.props.placeholderColor
                    },
                    dateText: {
                        fontFamily: themeVariables.fontCustomFamily,
                        fontSize: themeVariables.inputFontSize,
                        color: this.props.dateTextColor
                    },
                }}
            />
        )
    }
}

CommonDateTimePicker.propTypes = {
    input: PropTypes.object,
    icon: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    mode: PropTypes.string,
    displayIcon: PropTypes.bool,
    dateInputStyle: ViewPropTypes.style,
    dateTextColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    elementStyleIcon: ViewPropTypes.style,
    colorIcon: PropTypes.string,
};

CommonDateTimePicker.defaultProps = {
    input: {},
    icon: undefined,
    required: false,
    placeholder: undefined,
    confirmText: 'เลือก',
    cancelText: 'ปิด',
    mode: 'date',
    displayIcon: true,
    dateInputStyle: {},
    dateTextColor: themeVariables.textColor,
    placeholderColor: themeVariables.inputColorPlaceholder,
    elementStyleIcon: {},
    colorIcon: themeVariables.black
};

const styles = StyleSheet.create({
    datePicker: {
        flex: 1,
        width: '100%',
    },
    dateInputStyle: {
        borderRadius: themeVariables.inputBorderRadius,
        borderWidth: themeVariables.inputBorderWidth,
        alignItems: 'flex-start',
        paddingLeft: 14,
        borderColor: themeVariables.inputBorderColor
    },
});

export default CommonDateTimePicker;
