import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TouchableOpacity, ViewPropTypes } from 'react-native';
import { Item, Input, Text, Button, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CommonText from "_features/common/components/CommonText";
import Trans from "_features/common/containers/Trans";
import ForgotPasswordModal from "_features/user/components/ForgotPasswordModal";
import { forgotPassword } from "_features/user/redux/actions";
import { CloseIcon } from "../icons/AppIcons";

class CommonInput extends React.Component {
    constructor(props) {
        super(props);

        this._handleModalToggle = this._handleModalToggle.bind(this);

        this.state = {
            isModalShow: false
        }
    }

    _handleModalToggle() {
        this.setState({isModalShow: !this.state.isModalShow})
    }

    render() {
        const {input, ...inputProps} = this.props;

        return (
            <Item
                rounded={this.props.rounded}
                regular={this.props.regular}
                style={this.props.containerStyle}
                last={this.props.last}
            >
                {this.props.icon && <Icon active name={this.props.icon} style={[(this.props.required) ? s.red : '', this.props.iconStyle]} />}
                <Input
                    {...inputProps}
                    onChangeText={input.onChange}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                    value={input.value}
                    placeholder={(this.props.placeholder) ? `${this.props.placeholder}${this.props.required ? ' *' : ''}` : undefined}
                    placeholderTextColor={this.props.placeholderColor}
                />
                {this.props.clearButton &&
                    <Button
                        title={null}
                        onPress={() => {
                            input.value = '';
                            input.onChange('');
                            this.props.onClear()
                        }}
                        transparent
                        style={s.pa2}
                    >
                        <CloseIcon color={themeVariables.gray} />
                    </Button>
                }
                {this.props.forgetPassword && !input.value &&
                    <View>
                        <TouchableOpacity
                            style={s.pr2}
                            onPress={this._handleModalToggle}
                        >
                            <CommonText
                                bold
                                style={s.f6}
                                text={Trans.tran('user.login.forget_password.title')}
                            />
                        </TouchableOpacity>
                        <ForgotPasswordModal
                            isVisible={this.state.isModalShow}
                            onConfirm={(v) => {
                                this.props.forgotPassword.submit(v);
                                this._handleModalToggle();
                            }}
                            onClosePress={this._handleModalToggle}
                        />
                    </View>
                }
            </Item>
        )
    }
}

CommonInput.propTypes = {
    input: PropTypes.object,
    icon: PropTypes.string,
    iconStyle: Text.propTypes.style,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    rounded: PropTypes.bool,
    regular: PropTypes.bool,
    last: PropTypes.bool,
    containerStyle: ViewPropTypes.style,
    placeholderColor: PropTypes.string,
    clearButton: PropTypes.bool,
    onClear: PropTypes.func,
    forgetPassword: PropTypes.bool,
};

CommonInput.defaultProps = {
    input: {},
    icon: undefined,
    iconStyle: [],
    required: false,
    placeholder: undefined,
    rounded: false,
    regular: false,
    last: false,
    containerStyle: {},
    placeholderColor: themeVariables.inputColorPlaceholder,
    clearButton: false,
    onClear: undefined,
    forgetPassword: false,
};

export default connect(
    null,
    (dispatch) => ({
        forgotPassword: bindActionCreators(forgotPassword, dispatch),
    })
)(CommonInput);
