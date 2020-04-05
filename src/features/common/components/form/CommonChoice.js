/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Button, Icon } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';
import CommonText from '_features/common/components/CommonText';
import CommonRadio from './_CommonRadio';
import CommonChoiceModal from './_CommonChoiceModal';

class CommonChoice extends React.Component {
    constructor(props) {
        super(props);

        this._setModalVisible = this._setModalVisible.bind(this);

        this.andriodModalDropDown = null;
        this.state = {
            modalVisible: false
        }
    }

    componentDidUpdate() {
        if (!themeVariables.isAndroid) {
            return;
        }

        if (!this.andriodModalDropDown) {
            return;
        }

        this.andriodModalDropDown.select(findIndex(this.props.choices, {value: this.props.input.value}));
    }

    _setModalVisible() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    _renderRadio = () => {
        return this.props.choices.map((choice) => {
            const disabled = this.props.disabledChoiceId === choice.value.id;

            return (
                <CommonRadio
                    key={choice.value.id}
                    style={[this.props.choiceStyle, s.mt4]}
                    spaceBetweenRadio={this.props.spaceBetweenRadio}
                    label={choice.label}
                    selected={disabled
                        ? false
                        : this.props.input.value === choice.value.value
                    }
                    onPress={() => {
                        if (disabled) {
                            return;
                        }
                        this.props.input.onChange(choice.value.value);
                    }}
                    disabled={disabled}
                />
            )
        });
    };

    _renderSelect = () => {
        const { choices, disabled } = this.props;
        const defaultValue = find(choices, (i) => {if (i.value === this.props.input.value) {return i}});

        return (
            <View>
                <Button
                    bordered
                    block
                    onPress={this._setModalVisible}
                    choice
                    withIcon
                    disabled={this.props.disabled}
                    style={[
                        this.props.buttonStyle,
                        disabled && s.bg_grayLighter
                    ]}
                >
                    <CommonText
                        style={[{color: defaultValue ? themeVariables.black : themeVariables.muted}, this.props.buttonTextStyle]}
                        text={defaultValue ? defaultValue.label : Trans.tran(this.props.placeholder)}
                    />
                    {disabled
                        ? undefined
                        : <Icon style={this.props.iconStyle} type={"FontAwesome"} name='angle-down' />
                    }
                </Button>
                <CommonChoiceModal
                    choices={choices}
                    label={this.props.label}
                    isVisible={this.state.modalVisible}
                    onClosePress={this._setModalVisible}
                    onValueChange={(o) => {
                        if (o.value === '_addNew') {
                            this.props.navigationActions.navigate({
                                routeName: this.props.createNewScreen,
                                params: this.props.createNewParams
                            });

                            return;
                        }

                        this.props.input.onChange(o.value);
                        this.props.onChange(o.value);
                    }}
                    placeholder={this.props.placeholder}
                    modalProps={{
                        style: styles.modalContainer
                    }}
                />
            </View>
        )
    };

    _render = () => {
        if (this.props.expand && !this.props.multiple) {
            return this._renderRadio();
        }

        if (!this.props.expand && !this.props.multiple) {
            return this._renderSelect();
        }
    };

    render() {
        return (
            <View style={this.props.choiceContainerStyle} iPhoneXSupport>
                <View style={[this.props.style, (this.props.expand && !this.props.multiple) ? s.flx_row : '']}>
                    {this._render()}
                </View>
            </View>
        );
    }
}

CommonChoice.propTypes = {
    required: PropTypes.bool,
    choices: PropTypes.array.isRequired,
    allowClearSelectedValue: PropTypes.bool,
    input: PropTypes.object,
    label: PropTypes.string,
    expand: PropTypes.bool,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    choiceContainerStyle: ViewPropTypes.style,
    spaceBetweenRadio: ViewPropTypes.style,
    choiceStyle: ViewPropTypes.style,
    buttonStyle: ViewPropTypes.style,
    buttonTextStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
    iconStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
    style: ViewPropTypes.style,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    createNew: PropTypes.bool,
    createNewText: PropTypes.string,
    createNewScreen: PropTypes.string,
    createNewParams: PropTypes.object,
    disabledChoiceId: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
};

CommonChoice.defaultProps = {
    required: true,
    expand: true,
    multiple: false,
    disabled: false,
    label: undefined,
    input: {},
    allowClearSelectedValue: true,
    choiceContainerStyle: {},
    spaceBetweenRadio: {},
    choiceStyle: {},
    buttonStyle: {},
    buttonTextStyle: {},
    iconStyle: {},
    style: {},
    placeholder: '',
    onChange: () => {},
    disabledChoiceId: false,
    createNew: false,
    createNewText: 'Add new',
    createNewScreen: '',
    createNewParams: {},
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: themeVariables.grayLighter,
        margin: 0,
    }
});

export default connect(
    null,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(CommonChoice);
