/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimensions } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import HeaderTitle from '_features/common/components/HeaderTitle';
import QRScannerRectView from '../components/QRScannerRectView';
import { selectLocationForCheckInWithQrCode } from '../redux/actions';

class CheckTimeViaQrScreen extends React.PureComponent {
    onSuccess = (e) => {
        this.props.selectLocationForCheckInWithQrCode({
            token: e.data,
            forwardedParams: this.props.navigation.state.params
        });
    };

    render() {
        const SCREEN_HEIGHT = Dimensions.get("window").height;

        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                cameraStyle={{ height: SCREEN_HEIGHT }}
                showMarker
                reactivate
                reactivateTimeout={2500}
                vibrate={false}
                customMarker={
                    <QRScannerRectView
                        rectHeight={280}
                        isCornerOffset={false}
                    />
                }
            />
        )
    }
}

CheckTimeViaQrScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.typeValue === 'check-out'
        ? <HeaderTitle text={'check_time.check_out.title'} />
        : <HeaderTitle text={'check_time.check_in.title'} />
});

export default connect(
    null,
    (dispatch) => ({
        selectLocationForCheckInWithQrCode: bindActionCreators(selectLocationForCheckInWithQrCode, dispatch)
    })
)(CheckTimeViaQrScreen);
