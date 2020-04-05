import React from 'react';
import PropTypes from 'prop-types';
import { View } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommonText from '_features/common/components/CommonText';
import momentTimezone from '_utils/moment-timezone';
import { serverTimeRequestAction } from '../redux/actions';
import { getServerTime, isReceivingServerTime } from '../redux/selectors';

class CurrentTime extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            serverTime: this.props.serverTime
        };
        this.setTime = this.setTime.bind(this);
    }

    componentDidMount() {
        this._interval = setInterval(() => {
            this.setTime();
        }, 1000);
    }

    componentWillUnmount() {
        if (null === this._interval) {
            return;
        }

        clearInterval(this._interval);
    }

    setTime() {
        const date = this.state.serverTime;
        const usedDate = momentTimezone(date).add(1, 's');

        this.setState({
            serverTime: usedDate
        })
    }

    render() {
        const date = this.state.serverTime;
        const formatDate = momentTimezone(date).format(this.props.format);

        if (this.state.serverTime === undefined && this.props.receivingServerTime) {
            return <View />
        }

        return (
            <CommonText
                {...this.props.textProps}
                text={formatDate}
            />
        );
    }
}

CurrentTime.propTypes = {
    textProps: PropTypes.object,
    format: PropTypes.string
};

CurrentTime.defaultProps = {
    textProps: {},
    format: 'HH:mm'
};

export default connect(
    (state) => ({
        serverTime: getServerTime(state),
        receivingServerTime: isReceivingServerTime(state)
    }),
    (dispatch) => ({
        getServerTime: bindActionCreators(serverTimeRequestAction, dispatch)
    })
)(CurrentTime);
