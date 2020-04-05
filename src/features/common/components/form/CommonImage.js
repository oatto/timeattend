import React from 'react';
import PropTypes from 'prop-types';
import extend from 'lodash/extend';
import isArray from 'lodash/isArray';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import ImagePicker from 'react-native-image-picker';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';

class CommonImage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageSource: null
        };
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

                let source = { uri: response.uri };
                this.props.input.onChange(`data:image/jpeg;base64,${response.data}`);
                this.setState({
                    imageSource: source
                });
                return;
            }

            const data = [...this.props.input.value, `data:image/jpeg;base64,${response.data}`];
            this.props.input.onChange(data);
            this.props.onChange(data);
        });
    }

    render() {
        const { imageSource } = this.state;

        return (
            <TouchableOpacity
                onPress={this.selectPhotoTapped}
                style={[s.pa2, s.bg_grayLighter, styles.block, imageSource && styles.overwriteHeight, this.props.containerStyle]}
            >
                <Image
                    style={[styles.image, imageSource && {height: 280, width: '100%', resizeMode: 'contain'}, this.props.imageStyle]}
                    source={imageSource ? imageSource : require('_public/images/photo-mock-up.png')}
                />
                {this.state.imageSource ?
                    null : (false !== this.props.label) && <Text style={s.tc}>{this.props.label}</Text>
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    block: {
        width: '100%',
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeVariables.white
    },
    image: {
        flex: 1,
        width: 100,
        height: 160,
        backgroundColor: themeVariables.white
    },
    overwriteHeight: {
        height: 280,
    }
});

CommonImage.propTypes = {
    input: PropTypes.object.isRequired,
    options: PropTypes.object,
    numberOfFiles: PropTypes.number,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    onChange: PropTypes.func,
    containerStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
    imageStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
};

CommonImage.defaultProps = {
    options: {},
    numberOfFiles: 1,
    label: Trans.tran('general.form.image'),
    onChange: () => {},
    containerStyle: {},
    imageStyle: {},
};

export default CommonImage;