/* eslint-disable react/prop-types */
import React from 'react';
import { Alert } from "react-native";
import { connect } from 'react-redux';
import { Container, Spinner } from 'native-base';
import { bindActionCreators } from 'redux';
import ref from 'react-native-core/utils/ref';
import { userProfile } from "_features/user/redux/selectors";
import HeaderTitle from '_features/common/components/HeaderTitle';
import { getCurrentLocation } from '_features/common/redux/actions';
import Trans from "_features/common/containers/Trans";
import themeVariables from '_theme';
import { createLocation } from '../redux/actions';
import LocationCreateForm, { validate } from '../forms/LocationCreateForm';
import { getCurrentLocation as getCurrentLocationSelector, isReceivingLocation } from "../../common/redux/selectors";

class LocationCreateScreen extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            locationReceived: false
        };

        this._onDrag = this._onDrag.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (ref(props.currentLocation, 'coords.latitude') && ref(props.currentLocation, 'coords.longitude')) {
            return {
                ...state,
                locationReceived: true,
                latitude: props.currentLocation.coords.latitude,
                longitude: props.currentLocation.coords.longitude,
            }
        }

        return state;
    }

    componentDidMount() {
        this.props.getCurrentLocation.request({
            mode: 'current'
        });
    }

    _onDrag = (value) => {
        this.setState({
            latitude: value.nativeEvent.coordinate.latitude,
            longitude: value.nativeEvent.coordinate.longitude
        })
    };

    render () {
        const user = this.props.user;

        if (this.props.isReceivingLocation || !this.state.locationReceived) {
            return <Spinner color={themeVariables.brandPrimary} />;
        }

        return (
            <Container iPhoneXSupport>
                <LocationCreateForm
                    initialValues={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude
                    }}
                    onDrag={this._onDrag}
                    provider={'google'}
                    nameUser={`${user.first_name} ${user.last_name}`}
                    lat={this.state.latitude}
                    lng={this.state.longitude}
                    onSubmit={(values) => {
                        if (validate(values)) {
                            delete values._location;

                            Alert.alert(
                                Trans.tran('location.alert.create_form_title'),
                                Trans.tran('location.alert.create_form_description'),
                                [
                                    {
                                        text: Trans.tran('general.confirm'),
                                        onPress: () => this.props.createLocation.submit({formData: values})
                                    },
                                    {text: Trans.tran('general.cancel')}
                                ]
                            );
                        }
                    }}
                />
            </Container>
        )
    }
}

LocationCreateScreen.navigationOptions = {
    headerTitle: <HeaderTitle text={'location_create.title'} />
};

export default connect(
    (state) => ({
        user: userProfile(state),
        currentLocation: getCurrentLocationSelector(state),
        isReceivingLocation: isReceivingLocation(state),
    }),
    (dispatch) => ({
        createLocation: bindActionCreators(createLocation, dispatch),
        getCurrentLocation: bindActionCreators(getCurrentLocation, dispatch),
    })
)(LocationCreateScreen);
