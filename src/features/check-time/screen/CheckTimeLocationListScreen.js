/* eslint-disable react/prop-types */
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { Container, Content, View, Card, CardItem, Body } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { styles as s } from 'react-native-style-tachyons';
import MapView, { Marker } from 'react-native-maps';
import ref from 'react-native-core/utils/ref';
import themeVariables from '_theme';
import { getAllLocationWithCoordinate } from '_features/location/redux/actions';
import { inRangeLocation } from '_features/location/redux/selectors';
import Trans from '_features/common/containers/Trans';
import { PlusIcon } from '_features/common/components/icons/AppIcons';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import NoResult from '_features/common/components/NoResult';
import CurrentTime from "_features/common/components/CurrentTime";
import CommonText from "_features/common/components/CommonText";
import { serverTimeRequestAction, getCurrentLocation } from '_features/common/redux/actions';
import { getCheckTimeOutsideTodayList } from "_features/check-time-outside/redux/actions";
import { getCheckTimeTodayList as getCheckTimeTodayListAction } from '_features/check-time/redux/actions';
import { checkTimeOutsideTodayTransaction } from '_features/check-time-outside/redux/selectors';
import { _userHasPermission } from '_features/user/redux/selectors';
import ItemListLocation from '../components/ItemListLocation';
import { getCheckTimeTodayWithType } from "../redux/selectors";
import { LOCATION_CREATE } from "../../location/router";
import { CHECK_TIME } from '../router';
import { getCurrentLocation as getCurrentLocationSelector } from "../../common/redux/selectors";

class CheckTimeLocationListScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this._getLocations = this._getLocations.bind(this);
    }

    componentDidMount() {
        this._getLocations();

        this.props.getCheckTimeTodayList.request();
        this.props.getCheckTimeOutsideTodayList.request();

        this.props.getCurrentLocation.request({
            mode: 'watch'
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentLocation.coords.latitude === this.props.currentLocation.coords.latitude
        && prevProps.currentLocation.coords.longitude === this.props.currentLocation.coords.longitude
        ) {
            return;
        }

        this._getLocations(false);
    }

    componentWillUnmount() {
        this.props.getCurrentLocation.dismiss();
    }

    _getLocations (_withLoadingOverlay = true) {
        this.props.getAllLocation.request({
            latitude: this.props.currentLocation.coords.latitude,
            longitude: this.props.currentLocation.coords.longitude,
            type: 'place',
            _withLoadingOverlay
        });
    }

    _renderItem = ({item}) => {
        const { typeValue, typeName } = this.props.navigation.state.params;
        return (
            <Card>
                <CardItem padder>
                    <Body>
                        <ItemListLocation
                            onPress={() => {

                                this.props.navigationActions.navigate({
                                    routeName: CHECK_TIME,
                                    params: {
                                        place: item,
                                        deviceLatitude: this.props.currentLocation.coords.latitude,
                                        deviceLongitude: this.props.currentLocation.coords.longitude,
                                        checkType: {
                                            typeValue,
                                            typeName,
                                        },
                                    }
                                })
                            }}
                            location={item}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    render() {
        const data = this.props.inRangeLocation;
        const { typeValue, typeName } = this.props.navigation.state.params;
        const isCheckout = typeValue === 'check-out';
        const checkInLatestPlace = data.filter((item) => {
            if (typeName === 'daily') {
                return !!find(this.props.checkInTimeToday, (o) => o.place.id === item.id);
            } else {
                return !!find(this.props.checkInTimeOutsideToday, (o) => o.place.id === item.id);
            }
        });

        return (
            <Container iPhoneXSupport>
                <Content>
                    <View>
                        <MapView
                            style={styles.map}
                            provider={'google'}
                            initialRegion={{
                                latitude: this.props.currentLocation.coords.latitude,
                                longitude: this.props.currentLocation.coords.longitude,
                                latitudeDelta: 0.0050,
                                longitudeDelta: 0.0050
                            }}
                        >
                            <Marker
                                coordinate={{latitude: this.props.currentLocation.coords.latitude, longitude: this.props.currentLocation.coords.longitude}}
                                title={Trans.tran('location.your_location')}
                                image={require('_public/images/map/marker-human-color.png')}
                            />
                        </MapView>
                    </View>
                    {/*<View padder>*/}
                        {/*<Card>*/}
                            {/*<CardItem padder>*/}
                                {/*<Body>*/}
                                    {/*<View style={styles.viewDateTime}>*/}
                                        {/*<CurrentTime format={`${Trans.tran('general.unit.before_date')}dddd LL`} />*/}
                                        {/*<CurrentTime*/}
                                            {/*format={'HH:mm:ss'}*/}
                                            {/*textProps={{*/}
                                                {/*bold: true,*/}
                                                {/*style: s.f2*/}
                                            {/*}}*/}
                                        {/*/>*/}
                                    {/*</View>*/}
                                {/*</Body>*/}
                            {/*</CardItem>*/}
                        {/*</Card>*/}
                    {/*</View>*/}
                    {isCheckout && !isEmpty(checkInLatestPlace) ?
                        <View padderVertical>
                            <View style={styles.viewTitle}>
                                <CommonText
                                    text={Trans.tran('check_time.location_list.checked_latest')}
                                    bold
                                    color={themeVariables.white}
                                />
                            </View>
                            <View>
                                <FlatList
                                    data={checkInLatestPlace}
                                    renderItem={this._renderItem}
                                    keyExtractor={(item, index) => 'latest-' + index.toString()}
                                />
                            </View>
                        </View> : <View />
                    }
                    <View style={styles.viewTitle}>
                        <CommonText
                            text={Trans.tran('check_time.location_list.near_locations')}
                            bold
                            color={themeVariables.white}
                        />
                    </View>
                    <View>
                        {data.length
                            ? <FlatList
                                data={data}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            : <NoResult text={'location.no_result_in_range'} onReload={this._getLocations} />
                        }
                    </View>
                </Content>
            </Container>
        )
    }
}

CheckTimeLocationListScreen.navigationOptions = ({ navigation, screenProps }) => {
    return {
        headerTitle: navigation.state.params.typeValue === 'check-out'
            ? <HeaderTitle text={'check_time.location_list.title_check_out'} />
            : <HeaderTitle text={'check_time.location_list.title_check_in'} />,
        headerRight: _userHasPermission(screenProps.user, 'coordinate_location_create') ?
            <HeaderIconMenu
                icon={<PlusIcon headerMenuIcon />}
                onPress={() => {
                    navigation.dispatch(NavigationActions.navigate({
                        routeName: LOCATION_CREATE,
                        params: {
                            coordinate: navigation.state.params.coordinate
                        }
                    }));
                }}
            /> : null
    };
};

const styles = StyleSheet.create({
    viewDateTime: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    viewTitle: {
        backgroundColor: themeVariables.primary,
        paddingVertical: themeVariables.sp1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        height: (themeVariables.deviceHeight) > 500 ? 250 : 200,
        width: '100%'
    }
});
export default connect(
    (state) => ({
        checkInTimeToday: getCheckTimeTodayWithType(state, 'check_in'),
        checkInTimeOutsideToday: checkTimeOutsideTodayTransaction(state, 'check_in'),
        inRangeLocation: inRangeLocation(state),
        currentLocation: getCurrentLocationSelector(state),
    }),
    (dispatch) => ({
        getServerTime: bindActionCreators(serverTimeRequestAction, dispatch),
        getAllLocation: bindActionCreators(getAllLocationWithCoordinate, dispatch),
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        getCheckTimeTodayList: bindActionCreators(getCheckTimeTodayListAction, dispatch),
        getCheckTimeOutsideTodayList: bindActionCreators(getCheckTimeOutsideTodayList, dispatch),
        getCurrentLocation: bindActionCreators(getCurrentLocation, dispatch),
    })
)(CheckTimeLocationListScreen);
