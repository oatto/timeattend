import React from 'react';
import Lightbox from 'react-native-lightbox';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import PropTypes from 'prop-types';
import themeVariables from '_theme';

const CommonLightBox = (props) => {
    return (
        <Lightbox swipeToDismiss underlayColor={themeVariables.contentBg}>
            <View padder fill style={styles.imageView}>
                {props.children}
            </View>
        </Lightbox>
    )
};

CommonLightBox.propTypes = {
    children: PropTypes.element.isRequired
};

CommonLightBox.defaultProps = {};

const styles = StyleSheet.create({
    imageView: {
        height: 250,
        width: '100%',
        marginVertical: themeVariables.sp2
    }
});

export default CommonLightBox;
