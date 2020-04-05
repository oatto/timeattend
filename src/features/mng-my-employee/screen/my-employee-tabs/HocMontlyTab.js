import React from 'react';
import PropTypes from "prop-types";

export default function withMonthlyTab(WrappedComponent) {
    return class extends React.Component {
        static propTypes = {
            activeYear: PropTypes.string.isRequired,
            activeMonth: PropTypes.string.isRequired,
            getData: PropTypes.func.isRequired
        };

        componentDidMount() {
            this.props.getData(this.props.activeYear, this.props.activeMonth);
        }

        getSnapshotBeforeUpdate(prevProps) {
            return prevProps.activeYear !== this.props.activeYear ||  prevProps.activeMonth !== this.props.activeMonth;
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (true !== snapshot) {
                return;
            }

            this.props.getData(this.props.activeYear, this.props.activeMonth);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}
