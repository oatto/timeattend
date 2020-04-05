import React from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Text, View } from "native-base";
import themeVariables from '_theme';
import Trans from "_features/common/containers/Trans";
import CommonText from "_features/common/components/CommonText";
import { styles as s } from 'react-native-style-tachyons';

const ColumnList = (props) => {
    return (
        <View style={themeVariables.combineStyles(styles.container, props.containerStyle)}>
            <View style={themeVariables.combineStyles(styles.label, props.labelElementStyle)}>
                {props.translateLabel ?
                    <Trans {...props.labelWeight} t={props.label} style={[s.tr, props.labelStyle]} />
                    : <CommonText {...props.labelWeight} text={props.label} style={[s.tr, props.labelStyle]} />
                }
            </View>
            <View style={themeVariables.combineStyles(styles.data, props.dataElementStyle)}>
                {props.translateData ?
                    <Trans {...props.dataWeight} t={props.data} style={props.dataStyle} />
                    : <CommonText {...props.dataWeight} text={props.data} style={props.dataStyle} />
                }
            </View>
        </View>
    )
};

ColumnList.propTypes = {
    containerStyle: ViewPropTypes.style,
    label: PropTypes.string.isRequired,
    translateLabel: PropTypes.bool,
    labelStyle: Text.propTypes.style,
    labelElementStyle: ViewPropTypes.style,
    labelWeight: PropTypes.object,
    data: PropTypes.string.isRequired,
    translateData: PropTypes.bool,
    dataElementStyle: ViewPropTypes.style,
    dataStyle: Text.propTypes.style,
    dataWeight: PropTypes.object,
};

ColumnList.defaultProps = {
    containerStyle: undefined,
    translateLabel: true,
    labelElementStyle: undefined,
    labelStyle: undefined,
    dataElementStyle: undefined,
    translateData: false,
    dataStyle: null,
    labelWeight: null,
    dataWeight: null
};

const styles = StyleSheet.create({
    container: {
        marginRight:  themeVariables.sp3,
        marginBottom: themeVariables.sp2,
        flexDirection: 'row'
    },
    label: {
        width: '37%',
        alignItems: 'flex-end',
    },
    data: {
        width: '63%',
        marginLeft: themeVariables.sp3
    },
});

export default ColumnList;
