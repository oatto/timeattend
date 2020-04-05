/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Alert, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container, Content } from 'native-base';
import Modal from 'react-native-modal';
import themeVariables from '_theme';
import CommonChoiceHeaderModal from './_CommonChoiceHeaderModal';
import CommonText from "../CommonText";

class CommonChoiceModal extends React.Component {
    constructor(props) {
        super(props);

        this._closeModal = this._closeModal.bind(this);
    }

    _closeModal(item) {
        this.props.onValueChange(item);
        this.props.onClosePress();
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => this._closeModal(item)}
            >
                <CommonText text={item.label} />
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <Modal
                animationType={'slide'}
                visible={this.props.isVisible}
                onBackdropPress={this.props.onClosePress}
                onRequestClose={() => Alert.alert('Modal has been closed.')}
                {...this.props.modalProps}
            >
                <Container withBackground>
                    <CommonChoiceHeaderModal
                        onClose={this.props.onClosePress}
                        title={this.props.label ? this.props.label : this.props.placeholder}
                    />
                    <Content>
                        <FlatList
                            data={this.props.choices}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                        />
                    </Content>
                </Container>
            </Modal>
        );
    }
}

CommonChoiceModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    choices: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    onClosePress: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        height: themeVariables.inputHeightBase,
        paddingHorizontal: themeVariables.sp3,
        paddingVertical: themeVariables.sp1,
        borderBottomWidth: themeVariables.borderWidth,
        borderBottomColor: themeVariables.gray,
    }
});

export default connect(
    null,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(CommonChoiceModal);
