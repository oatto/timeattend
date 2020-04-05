import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import Trans from "_features/common/containers/Trans";

class QRScannerRectView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            topWidth: 0,
            topHeight: 0,
            leftWidth: 0
        };
    }

    measureTotalSize = (e) => {
        let totalSize = e.layout;
        this.setState({
            topWidth: totalSize.width
        })
    };

    measureRectPosition = (e) => {
        let rectSize = e.layout;
        this.setState({
            topHeight: rectSize.y,
            leftWidth: rectSize.x
        })
    };

    getTopMaskHeight = () => {
        if (this.props.isCornerOffset) {
            if(this.props.screen === 'qrLogin'){
                return this.state.topHeight + this.props.rectHeight - this.props.cornerOffsetSize + 150;
            } else {
                return this.state.topHeight + this.props.rectHeight - this.props.cornerOffsetSize + 70;
            }
        } else {
            if(this.props.screen === 'qrLogin'){
                return this.state.topHeight + this.props.rectHeight + 150;
            } else {
                return this.state.topHeight + this.props.rectHeight + 70;
            }
        }
    };

    getBottomMaskHeight = () => {
        if (this.props.isCornerOffset) {
            if(this.props.screen === 'qrLogin'){
                return this.state.topHeight + this.props.rectHeight - this.props.cornerOffsetSize + 80;
            } else {
                return this.state.topHeight + this.props.rectHeight - this.props.cornerOffsetSize;
            }
        } else {
            if(this.props.screen === 'qrLogin'){
                return this.state.topHeight + this.props.rectHeight + 80;
            } else {
                return this.state.topHeight + this.props.rectHeight;
            }
        }
    };

    getSideMaskHeight() {
        if (this.props.isCornerOffset) {
            if(this.props.screen === 'qrLogin'){
                return this.props.rectHeight - this.props.cornerOffsetSize * 2 + 80.3;
            } else {
                return this.props.rectHeight - this.props.cornerOffsetSize * 2 + 0.3;
            }
        } else {
            if(this.props.screen === 'qrLogin'){
                return this.props.rectHeight + 80.3;
            } else {
                return this.props.rectHeight + 0.3;
            }
        }
    }

    getSideMaskWidth = () => {
        if (this.props.isCornerOffset) {
            return this.state.leftWidth + this.props.cornerOffsetSize;
        } else {
            return this.state.leftWidth;
        }
    };

    render() {
        return (
            <View
                style={styles.container}
                onLayout={({nativeEvent: e}) => this.measureTotalSize(e)}
            >
                <View
                    style={styles.viewScan}
                    onLayout={({nativeEvent: e}) => this.measureRectPosition(e)}
                >
                    <View style={styles.topLeftCorner} />
                    <View style={styles.topBorder} />
                    <View style={styles.topRightCorner} />
                    <View style={styles.rightBorder} />
                    <View style={styles.bottomLeftCorner} />
                    <View style={styles.leftBorder} />
                    <View style={styles.bottomRightCorner} />
                    <View style={styles.bottomBorder} />
                </View>
                <View style={[
                    styles.topMask,
                    {
                        bottom: this.getTopMaskHeight(),
                        width: this.state.topWidth
                    }
                ]}
                />
                <View style={[
                    styles.leftMask,
                    {
                        height: this.getSideMaskHeight(),
                        width: this.getSideMaskWidth(),
                        bottom: this.state.topHeight + 69.8
                    }
                ]}
                />
                <View style={[
                    styles.rightMask,
                    {
                        height: this.getSideMaskHeight(),
                        width: this.getSideMaskWidth(),
                        bottom: this.state.topHeight + 69.8
                    }]}
                />

                <View style={[
                    styles.bottomMask,
                    {
                        top: this.getBottomMaskHeight(),
                        width: this.state.topWidth
                    }]}
                />
                <View style={styles.textContainer}>
                    <CommonText
                        text={Trans.tran('check_time.qr_code.recommend')}
                        style={[styles.hintText, s.ph3, {top: this.state.topHeight}]}
                    />
                </View>
            </View>
        )
    }
}

QRScannerRectView.propTypes = {
    rectHeight: PropTypes.number,
    isCornerOffset: PropTypes.bool,
    cornerOffsetSize: PropTypes.number,
    screen: PropTypes.string
};

QRScannerRectView.defaultProps = {
    rectHeight: 0,
    isCornerOffset: true,
    cornerOffsetSize: 0,
    screen: 'qrCheckTime'
};

const windows = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
    viewScan: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 280,
        width: 280,
        bottom: 35
    },
    topLeftCorner: {
        position: 'absolute',
        borderColor: '#f9f9f9',
        top: 0,
        left: 0,
        height: 15,
        width: 15,
        borderLeftWidth: 1,
        borderTopWidth: 1
    },
    topBorder: {
        position: 'absolute',
        top: 0,
        width: windows.width,
        borderColor: 'rgba( 255, 255, 255, 0.4 )',
        borderTopWidth: 1
    },
    topRightCorner: {
        position: 'absolute',
        borderColor: '#f9f9f9',
        top: 0,
        right: 0,
        height: 15,
        width: 15,
        borderRightWidth: 1,
        borderTopWidth: 1
    },
    rightBorder: {
        position: 'absolute',
        right: 0,
        height: windows.height,
        borderColor: 'rgba( 255, 255, 255, 0.4 )',
        borderRightWidth: 1
    },
    bottomLeftCorner: {
        position: 'absolute',
        borderColor: '#f9f9f9',
        bottom: 0,
        left: 0,
        height: 15,
        width: 15,
        borderLeftWidth: 1,
        borderBottomWidth: 1
    },
    leftBorder: {
        position: 'absolute',
        left: 0,
        height: windows.height,
        borderColor: 'rgba( 255, 255, 255, 0.4 )',
        borderLeftWidth: 1
    },
    bottomRightCorner: {
        position: 'absolute',
        borderColor: '#f9f9f9',
        bottom: 0,
        right: 0,
        height: 15,
        width: 15,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    bottomBorder: {
        position: 'absolute',
        bottom: 0,
        width: windows.width,
        borderColor: 'rgba( 255, 255, 255, 0.4 )',
        borderBottomWidth: 1
    },
    topMask: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba( 0, 0, 0, 0.6 )'
    },
    leftMask: {
        position: 'absolute',
        left: 0,
        backgroundColor: 'rgba( 0, 0, 0, 0.6 )'
    },
    rightMask: {
        position: 'absolute',
        right: 0,
        backgroundColor: 'rgba( 0, 0, 0, 0.6 )'
    },
    bottomMask: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba( 0, 0, 0, 0.6 )'
    },
    textContainer: {
        position: 'absolute',
        paddingHorizontal: themeVariables.sp4,
    },
    hintText: {
        color: themeVariables.white,
        fontSize: themeVariables.fs6,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
});

export default QRScannerRectView;
