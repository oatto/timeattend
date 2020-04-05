/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Spinner, View } from 'native-base';
import {Modal, StyleSheet} from 'react-native';
import { isDisabledBackButton, isNowLoading } from 'react-native-core/features/common/redux/selectors';
import themeVariables from '_theme';

const LoadingOverlay = (props) => {
    if (themeVariables.isAndroid) {
        return (
            <Modal
                transparent
                animationType='none'
                visible={props.visible}
                onRequestClose={() => {}}
            >
                <View style={[styles.modalPosition]}>
                    <Spinner color={themeVariables.primary} />
                </View>
            </Modal>
        );
    }

    if (!props.visible) {
        return <View />;
    }

    return (
        <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            // always 0 for beautiful loading
            // top: (props.loadingAwareHeader) ? themeVariables.toolbarHeight : 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1000
        }}
        >
            <View style={{
                width: 100,
                height: 80
            }}
            >
                <Spinner color={themeVariables.brandPrimary} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalPosition: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default connect((state) => {
    return {
        visible: isNowLoading(state),
        loadingAwareHeader: isDisabledBackButton(state)
    }
})(LoadingOverlay);
