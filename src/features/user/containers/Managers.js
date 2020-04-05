/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {getManagers} from '../redux/actions';
import {managers} from '../redux/selectors';
import EmployeeManagerInfo from '../components/EmployeeManagerInfo';
import NoResult from "../../common/components/NoResult";

class Managers extends React.PureComponent {
    componentDidMount() {
        if (null !== this.props.managers) {
            return;
        }

        this.props.getManagers.request();
    }

    render() {
        return null === this.props.managers ? <View /> : 0 === this.props.managers.length ? <NoResult /> : this.props.managers.map(function (manager) {
            return <EmployeeManagerInfo employee={manager} key={manager.id} />;
        });
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
