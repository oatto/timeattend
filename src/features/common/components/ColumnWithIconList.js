import React from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { View } from "native-base";
import CommonText from "_features/common/components/CommonText";

const ColumnWithIconList = (props) => {
    return (
        <View style={styles.container}>
            <View padder style={[styles.label, props.iconContainerStyle]}>
                {props.icon}
            </View>
            <View style={[styles.data, props.dataElementStyle]}>
                <CommonText text={props.data} style={props.dataStyle} />
            </View>
        </View>
    )
};

ColumnWithIconList.propTypes = {
    icon: PropTypes.element.isRequired,
    iconContainerStyle: ViewPropTypes.style,
    data: PropTypes.string.isRequired,
    dataElementStyle: ViewPropTypes.style,
    dataStyle: PropTypes.object,
};

ColumnWithIconList.defaultProps = {
    iconContainerStyle: {},
    dataElementStyle: {},
    dataStyle: {},
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    label: {
        width: '20%',
        alignItems: 'center'
    },
    data: {
        alignSelf: 'center'
    },
});

export default ColumnWithIconList;
