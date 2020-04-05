import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import { AddImagePlaceIcon } from '_features/common/components/icons/AppIcons';
import { TouchableOpacity, StyleSheet, View, ViewPropTypes, NativeModules } from 'react-native';
import Trans from '_features/common/containers/Trans';
import themeVariables from '_theme';

const ImagePicker = NativeModules.ImageCropPicker;

class CommonButtonTakeWithCropImage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.pickSingleWithCamera = this.pickSingleWithCamera.bind(this);
    }

    pickSingleWithCamera() {
        if (1 < this.props.numberOfFiles && isArray(this.props.input.value)) {
            if (this.props.input.value.length === this.props.numberOfFiles) {
                alert(Trans.tran('general.validate.image.max_file', {limit : this.props.numberOfFiles}));
                return;
            }
        }

        ImagePicker.openCamera({
            cropping: true,
            width: 640,
            height: 640,
            includeExif: true,
            includeBase64: true,
        }).then(image => {
            if (!image.data) {
                return;
            }

            if (1 === this.props.numberOfFiles) {
                this.props.input.onChange(`data:image/jpeg;base64,${image.data}`);
                return;
            }

            const data = [...this.props.input.value, `data:image/jpeg;base64,${image.data}`];
            this.props.input.onChange(data);
            this.props.onChange(data);
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <TouchableOpacity onPress={this.pickSingleWithCamera}>
                <View style={[styles.SelectImageButton, this.props.style]}>
                    <AddImagePlaceIcon color={themeVariables.primary} />
                    <Trans
                        t={this.props.label}
                        style={styles.labelSelectImageButton}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    SelectImageButton: {
        borderRadius: themeVariables.borderRadiusLarge,
        borderWidth: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelSelectImageButton: {
        marginLeft: themeVariables.sp1,
        padding: themeVariables.sp1,
        color: themeVariables.primary,
        fontSize: themeVariables.fs5
    }
});

CommonButtonTakeWithCropImage.propTypes = {
    input: PropTypes.object.isRequired,
    options: PropTypes.object,
    numberOfFiles: PropTypes.number,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    onChange: PropTypes.func,
    style: ViewPropTypes.style
};

CommonButtonTakeWithCropImage.defaultProps = {
    options: {},
    numberOfFiles: 1,
    label: Trans.tran('general.form.image'),
    onChange: () => {},
    style: {}
};

export default CommonButtonTakeWithCropImage;
