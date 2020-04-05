import React from 'react';
import PropTypes from 'prop-types';
import extend from 'lodash/extend';
import isArray from 'lodash/isArray';
import { TouchableOpacity, StyleSheet, View, ViewPropTypes } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Trans from '_features/common/containers/Trans';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';

class CommonButtonSelectImage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    selectPhotoTapped() {
        if (1 < this.props.numberOfFiles && isArray(this.props.input.value)) {
            if (this.props.input.value.length === this.props.numberOfFiles) {
                alert(Trans.tran('general.validate.image.max_file', {limit : this.props.numberOfFiles}));
                return;
            }
        }

        const options = extend({
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        }, {
            ...this.props.options,
            mediaType: 'photo'
        });

        ImagePicker.showImagePicker(options, (response) => {
            if (!response.uri) {
                return;
            }

            if (1 === this.props.numberOfFiles) {
                this.props.input.onChange(`data:image/jpeg;base64,${response.data}`);
                return;
            }

            const data = [...this.props.input.value, `data:image/jpeg;base64,${response.data}`];
            this.props.input.onChange(data);
            this.props.onChange(data);
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={this.selectPhotoTapped}>
                <View style={[styles.SelectImageButton, this.props.style]}>
                    <IconFontAwesome size={20} name={'camera-retro'} color={'gray'} />
                    <Trans
                        t={'location_create.button_add_image_title'}
                        weight={'bold'}
                        size={20}
                        style={styles.labelSelectImageButton}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    SelectImageButton: {
        borderRadius: 25,
        height: 45,
        width: 270,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelSelectImageButton: {
        marginLeft: 5
    }
});

CommonButtonSelectImage.propTypes = {
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

CommonButtonSelectImage.defaultProps = {
    options: {},
    numberOfFiles: 1,
    label: Trans.tran('general.form.image'),
    onChange: () => {},
    style: {}
};

export default CommonButtonSelectImage;
