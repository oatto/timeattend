import React from 'react';
import PropTypes from 'prop-types';
import {Text} from "native-base";
import {connect} from 'react-redux';
import {styles as s} from 'react-native-style-tachyons';
import {userProfile} from "_features/user/redux/selectors";
import themeVariables from "_theme";
import truncate from "lodash/truncate";
import CommonText from '../components/CommonText';
import Trans from '../containers/Trans';


const HeaderTitle = (props) => {
    return (
        <CommonText
            bold
            size={themeVariables.fs4}
            text={props.trans ? Trans.tran(props.text) : truncate(props.text)}
            style={themeVariables.combineStyles(s.white, props.style, s.mt2)}
        />);
};

HeaderTitle.propTypes = {
    text: PropTypes.string,
    trans: PropTypes.bool,
    style: Text.propTypes.style,
};

HeaderTitle.defaultProps = {
    text: '',
    trans: true,
    style: undefined
};

export default connect(
    (state) => ({user: userProfile(state)}),
    null
)(HeaderTitle);
