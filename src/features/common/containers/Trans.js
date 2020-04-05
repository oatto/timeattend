/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import { getLocaleCode } from 'react-native-core/features/common/redux/selectors';
import { connect } from 'react-redux';
import CommonText from '_features/common/components/CommonText';
import th from '../../../i18n/locales/th';
import en from '../../../i18n/locales/en';
import { DEFAULT_LOCALE } from '../../../common/constants';

I18n.fallbacks = true;
I18n.defaultLocale = DEFAULT_LOCALE;
I18n.translations = {th, en};

class Trans extends React.PureComponent {
    static tran(key, replace) {
        return I18n.t(key, replace);
    }

    static propTypes = {
        t: PropTypes.string.isRequired,
        replace: PropTypes.object
    };

    static defaultProps = {
        replace: {}
    };

    render() {
        I18n.locale = this.props.locale;
        return <CommonText {...this.props} text={I18n.t(this.props.t, this.props.replace)} />
    }
}

export default connect((state) => ({
    locale: getLocaleCode(state)
}))(Trans);
