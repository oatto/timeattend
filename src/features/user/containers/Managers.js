/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {bindActionCreators} from 'redux';
import {getManagers} from '../redux/actions';
import {managers} from '../redux/selectors';
import EmployeeManagerInfo from '../components/EmployeeManagerInfo';
import NoResult from "../../common/components/NoResult";

class Managers extends React.PureComponent {
    componentDidMount() {
        if (!isEmpty(this.props.managers)) {
            return;
        }

        this.props.getManagers.request();
    }

    render() {
        return !isEmpty(this.props.managers) ? this.props.managers.map(function (manager) {
            return <EmployeeManagerInfo employee={manager} key={manager.id} />;
        }) :  <NoResult />;
    }
}

export default connect(
    (state) => ({
        managers: managers(state)
    }),
    (dispatch) => ({
        getManagers: bindActionCreators(getManagers, dispatch),
    })
)(Managers);
