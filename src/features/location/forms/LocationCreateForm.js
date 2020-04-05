/* eslint-disable react/prop-types */
import React from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Content, Form, View } from 'native-base';
import Validation from 'react-native-core/validation';
import { styles as s } from 'react-native-style-tachyons';
import CommonText from '_features/common/components/CommonText';
import CommonFormGroup from '_features/common/components/form/CommonFormGroup';
import { SaveIcon, UserIcon } from '_features/common/components/icons/AppIcons';
import { CommonInput, CommonPinMap, CommonButtonTakeWithCropImage } from '_features/common/components/form/index';
import Trans from '_features/common/containers/Trans';
import ButtonFixedFooter from "_features/common/components/ButtonFixedFooter";
import themeVariables from '_theme';
import CommonLabelFormGroup from "../../common/components/form/CommonLabelFormGroup";
import ButtonSubmit from "../../common/components/form/ButtonSubmit";

export const NAME = 'locationCreateForm';

export const validate = values => {
    const errors = [];
    if (Validation.NotBlank(values.name)) {
        errors.push(Trans.tran('location_create.alert.please_enter_place_name'));
    }

    if (Validation.NotBlank(values.picture)) {
        //errors.push(Trans.tran('location_create.alert.please_add_image'));
    }

    if (!errors.length) {
        return true;
    }

    Alert.alert(Trans.tran('check_time.alert_reducer.alert'), errors.join('\r\n'));
    return false;
};


class LocationCreateForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            image: null
        }
    }

    render() {
        return (
            <Form style={s.flx_i}>
                <Content whiteBackground>
                    <Field
                        name={'map'}
                        component={CommonPinMap}
                        OnDrag={this.props.onDrag}
                        Latitude={this.props.lat}
                        Longitude={this.props.lng}
                        markTitle={'You Mark'}
                        markDescription={'Place Selected'}
                    />
                    <View padder>
                        <CommonFormGroup
                            label={<CommonLabelFormGroup label={Trans.tran('location_create.title_input')} required />}
                            field={
                                <Field
                                    name={'name'}
                                    component={CommonInput}
                                    rounded={false}
                                    placeholder={Trans.tran('location_create.placeholder_input')}
                                />
                            }
                        />
                        <CommonLabelFormGroup label={Trans.tran('location_create.detail_user')} />
                        <View style={[styles.containerStyle]}>
                            <View style={styles.icon}>
                                <UserIcon style={styles.iconElement} />
                            </View>
                            <View>
                                <CommonText text={this.props.nameUser} />
                            </View>
                        </View>

                        { this.state.image ?
                            <View style={styles.imageView}>
                                <Image
                                    source={{uri: this.state.image}}
                                    style={styles.image}
                                    resizeMode={'contain'}
                                />
                            </View> : null
                        }
                        <View style={[s.mv3]}>
                            <Field
                                name={'picture[file]'}
                                component={CommonButtonTakeWithCropImage}
                                onChange={(value) => this.setState({image: value})}
                                label={'location_create.button_add_image_title'}
                                style={[styles.addImageBtn]}
                            />
                        </View>
                    </View>
                </Content>
                <View padder>
                    <ButtonSubmit
                        onPress={this.props.handleSubmit(this.props.onSubmit)}
                        icon={<SaveIcon />}
                        label={'general.submit_requested'}
                        positionBottom
                    />
                </View>
            </Form>
        )
    }
}

LocationCreateForm.propTypes = {
    onDrag: PropTypes.func,
    onSubmit: PropTypes.func,
    nameUser: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    field: PropTypes.bool
};

LocationCreateForm.defaultProps = {
    onDrag: () => {},
    onSubmit: () => {},
    nameUser: '',
    lat: 0.0,
    lng: 0.0,
    field: true
};

const styles = StyleSheet.create({
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        marginBottom: themeVariables.inputMarginBottom
    },
    icon: {
        flexGrow: 0,
        paddingHorizontal: themeVariables.sp4/3,
        display: 'flex',
        justifyContent: 'center',
    },
    iconElement: {
        width: 20,
        height: 20,
        fontSize: 20,
        color: themeVariables.primary
    },
    imageView: {
        width: '100%',
        height: 200,
        alignSelf: 'center'
    },
    image: {
        width: undefined,
        height: undefined,
        flex: 1
    },
    addImageBtn: {
        width: '100%',
        backgroundColor: themeVariables.transparent,
    }
});

export default (reduxForm({
    form: NAME
})(LocationCreateForm));
