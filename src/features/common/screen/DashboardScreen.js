/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import moment from '_utils/moment';
import ref from 'react-native-core/utils/ref';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Spinner, Card, CardItem, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import CheckInDetail from '_features/check-time/components/CheckInDetail';
import themeVariables from '_theme';
import { CHECK_TIME_TYPE } from '_features/check-time/router';
import { getCheckTimeLatest, isCheckTimeLatestLoading } from '_features/check-time/redux/selectors';
import {
    getCheckTimeLatest as getCheckTimeLatestActions
} from '_features/check-time/redux/actions';
import { userProfile } from "_features/user/redux/selectors";
import { serverTimeRequestAction } from '_features/common/redux/actions';
import HeaderMainDataUser from "_features/common/components/HeaderMainDataUser";
import ButtonFixedFooter from "_features/common/components/ButtonFixedFooter";
import {CheckInIcons} from "../components/icons/CheckInIcons";
import {CheckOutIcons} from "../components/icons/CheckOutIcons";

class DashboardScreen extends React.PureComponent {
    componentDidMount() {
        this.props.getCheckTimeLatest.request();
    }

    chooseTypeCheckTime(type) {
        this.props.getServerTime.request();
        this.props.navigation.navigate({
            routeName: CHECK_TIME_TYPE,
            params: {
                typeName: 'daily',
                typeValue: type
            }
        })
    }

    render() {
        let checkTimeLatest = this.props.checkTimeLatest;

        if (null === checkTimeLatest) {
            checkTimeLatest = undefined;
        }

        return (
            <Container withBackground>
                <View fill>
                    <View flex style={[themeVariables.globalStyle.flex0, s.mb3]}>
                        <HeaderMainDataUser user={this.props.user} />
                    </View>

                    <View fill padderHorizontal>
                        {
                            true === this.props.isCheckTimeLatestLoading ?
                                <View style={[s.aic, s.jcc]}>
                                    <View style={styles.viewLoading}>
                                        <Spinner color={themeVariables.brandPrimary} />
                                    </View>
                                </View> :
                                <View fill>
                                    <Card withSpace style={themeVariables.globalStyle.flex0}>
                                        <CardItem>
                                            <CheckInDetail
                                                type="check_in"
                                                place={ref(checkTimeLatest, 'check_in_place.name')}
                                                placeType={ref(checkTimeLatest, 'check_in_place.type')}
                                                checkInLate={ref(checkTimeLatest, 'check_in_late')}
                                                time={ref(checkTimeLatest, 'check_in_at') ? moment(checkTimeLatest.check_in_at).format('HH:mm') : undefined}
                                            />
                                        </CardItem>
                                    </Card>
                                    <Card withSpace style={themeVariables.globalStyle.flex0}>
                                        <CardItem>
                                            <CheckInDetail
                                                type="check_out"
                                                place={ref(checkTimeLatest, 'check_out_place.name')}
                                                placeType={ref(checkTimeLatest, 'check_out_place.type')}
                                                checkOutEarly={ref(checkTimeLatest, 'check_out_early')}
                                                time={ref(checkTimeLatest, 'check_out_at') ? moment(checkTimeLatest.check_out_at).format('HH:mm') : undefined}
                                            />
                                        </CardItem>
                                    </Card>
                                </View>
                        }
                    </View>
                    <ButtonFixedFooter
                        leftBtn={{
                            btnProps: {
                                onPress: this.chooseTypeCheckTime.bind(this, 'check-in'),
                                checkIn: true
                            },
                            icon: <CheckInIcons buttonFooter />,
                            label: 'dashboard.title_button_check_in'
                        }}
                        rightBtn={{
                            btnProps: {
                                onPress: this.chooseTypeCheckTime.bind(this, 'check-out')
                            },
                            icon: <CheckOutIcons buttonFooter />,
                            label: 'dashboard.title_button_check_out'
                        }}
                    />
                </View>
            </Container>
        );
    }
}

DashboardScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    viewLoading: {
        width: 100,
        height: 80,
    }
});

export default connect(
    (state) => ({
        checkTimeLatest: getCheckTimeLatest(state),
        isCheckTimeLatestLoading: isCheckTimeLatestLoading(state),
        user: userProfile(state)
    }),
    (dispatch) => ({
        getCheckTimeLatest: bindActionCreators(getCheckTimeLatestActions, dispatch),
        getServerTime: bindActionCreators(serverTimeRequestAction, dispatch)
    })
)(DashboardScreen);