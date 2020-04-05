import React from 'react';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import { Button, Icon, Text } from 'native-base';
import { View } from 'react-native';
import Trans from '_features/common/containers/Trans';
import MapLocationPickerModal from '../MapLocationPickerModal';

class CommonMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showMap: false
        }
    }

    render() {
        return (
            <View>
                <Button bordered rounded block onPress={() => this.setState({showMap: true})} withIcon>
                    <Icon name="pin" />
                    {this.props.input.value ? (
                        <View style={s.flx_i}>
                            <Text both>{this.props.input.value.latitude}</Text>
                            <Text both>{this.props.input.value.longitude}</Text>
                        </View>
                    )
                        : <Trans both t="location.maps.pin" />
                    }
                    <Icon name='arrow-forward' />
                </Button>
                {this.state.showMap && (
                    <MapLocationPickerModal
                        visible
                        onCancel={() => {
                            this.setState({
                                showMap: false
                            })
                        }}
                        initialRegion={('object' === typeof this.props.input.value) ? this.props.input.value : undefined}
                        onFinish={(region) => {
                            this.props.input.onChange(region);
                            this.props.onChange(region);
                            this.setState({
                                showMap: false
                            })
                        }}
                    />
                )}
            </View>
        )
    }
}


CommonMap.propTypes = {
    input: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

CommonMap.defaultProps = {
    onChange: () => {}
};

export default CommonMap;
