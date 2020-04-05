import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import { RefreshIcon } from "_features/common/components/icons/AppIcons";
import Trans from '../containers/Trans';

const NoResult = (props) => {
    return (
        <View style={s.pv3}>
            <Trans t={props.text} color="black" style={s.tc} />
            {props.onReload ?
                <TouchableOpacity style={styles.touchableButton} onPress={props.onReload}>
                    <RefreshIcon style={s.tc} />
                    <Trans t={'general.reload'} style={[s.tc, s.white, s.ml2]} />
                </TouchableOpacity>
                : null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    touchableButton: {
        width: '40%',
        marginTop: themeVariables.sp3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: themeVariables.sp2,
        backgroundColor: themeVariables.primary,
        borderRadius: themeVariables.borderRadiusLarge,
    }
});

NoResult.propTypes = {
    text: PropTypes.string,
    onReload: PropTypes.func,
};

NoResult.defaultProps = {
    text: 'general.no_result.no_length',
    onReload: null,
};

export default NoResult;
