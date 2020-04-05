/* eslint-disable react/prop-types */
import React from 'react';

class InitialValuesDateForm extends React.PureComponent {
    static initialMonthAndYear() {
        const d = new Date();
        const month = d.getMonth() + 1;

        return {
            year: d.getFullYear().toString(),
            month: month > 9 ? month.toString() : '0' + month.toString(),
        };
    }
}

export default InitialValuesDateForm;
