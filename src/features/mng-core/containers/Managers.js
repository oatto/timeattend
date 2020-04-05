/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';
import themeVariables from "_theme";
import { bindActionCreators } from 'redux';
import { mngEmployeeGetManagers } from '_features/mng-core/redux/actions';
import { mngEmployeeGetManagers as mngEmployeeGetManagersSelector, isMngEmployeeGetManagersLoading } from '_features/mng-core/redux/selectors';
import MngManagersInfo from '../components/MngManagersInfo';

class Managers extends React.PureComponent {
    componentDidMount() {
        this.props.mngEmployeeGetManagers.request({employeeId: this.props.employeeId});
    }

    render() {
        return true === this.props.isMngEmployeeGetManagersLoading ? <Spinner color={themeVariables.brandPrimary} /> : this.props.mngEmployeeGetManagersSelector.map(function (manager) {
            return <MngManagersInfo employee={manager} key={manager.id} />;
        });
    }
}

Managers.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default connect(
    (state) => ({
        mngEmployeeGetManagersSelector: mngEmployeeGetManagersSelector(state),
        isMngEmployeeGetManagersLoading: isMngEmployeeGetManagersLoading(state)
    }),
    (dispatch) => ({
        mngEmployeeGetManagers: bindActionCreators(mngEmployeeGetManagers, dispatch),
    })
)(Managers);
