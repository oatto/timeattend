/* eslint-disable react/prop-types */
import React from 'react';
import { Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { bindActionCreators } from 'redux';
import QRScannerRectView from '_features/check-time/components/QRScannerRectView';
import { loginViaQr } from '../redux/actions';

class LoginQrScreen extends React.PureComponent {
    onSuccess = (e) => {
        this.props.login.submit({identifierToken: e.data});
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
                topViewStyle={{height: 0, flex: 0}}
                bottomViewStyle={{height: 0, flex: 0}}
                vibrate={false}
                customMarker={
                    <QRScannerRectView
                        rectHeight={200}
                        screen={'qrLogin'}
                        isCornerOffset={false}
                    />
                }
            />
        )
    }
}

export default connect(
    null,
    (dispatch) => { return {
        login: bindActionCreators(loginViaQr, dispatch),
    }}
)(LoginQrScreen);
