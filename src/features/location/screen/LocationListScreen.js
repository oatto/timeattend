/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Card, CardItem, View, Body} from 'native-base';
import {NavigationActions} from 'react-navigation';
import ref from 'react-native-core/utils/ref';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import {bindActionCreators} from 'redux';
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import NoResult from '_features/common/components/NoResult';
import {userProfile} from "_features/user/redux/selectors";
import themeVariables from "_theme";
import LocationSearchForm, {validate} from '../forms/LocationSearchForm';
import {getAllLocationWithoutCoordinate} from '../redux/actions';
import {locationWithoutCoordinate} from '../redux/selectors';
import {LOCATION_SHOW} from "../router";
import LocationList from '../components/LocationList';

class LocationListScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            filterData: {}
        };

        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.getLocations.request();
    }

    _onRefresh() {
        this.props.getLocations.refresh(this.state.filterData)
    }

    renderItem = ({item}) => {
        let locationImage = ref(item, '_links.image.href');
        if (item.type === 'qr') {
            locationImage = item._qr_code_path;
        }

        return (
            <Card withSpace>
                <CardItem padderHorizontal>
                    <Body>
                        <LocationList
                            onPress={() =>
                                this.props.navigation.navigate({
                                    routeName: LOCATION_SHOW,
                                    params: {data: item}
                                })
                            }
                            source={
                                locationImage
                                    ? {uri: locationImage}
                                    : require('_public/images/no-image.png')
                            }
                            title={item.name}
                            numberOfTime={item.check_total}
                            user={ref(item, 'created_by.full_name')}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    };

    render() {
        const {data, isRefreshing, isLoading, isLoadingMore, pagination} = this.props.locations;

        return (
            <Container withBackground iPhoneXSupport>
                <View fill padder>
                    <Card style={themeVariables.globalStyle.flex0} withSpace>
                        <CardItem padder>
                            <Body>
                                <LocationSearchForm
                                    onSubmit={(values) => {
                                        if (validate(values)) {
                                            if (values.name || values.type) {
                                                this.props.getLocations.request(values);
                                            } else {
                                                this.props.getLocations.request();
                                            }

                                            this.setState({filterData: values});
                                        }
                                    }}
                                    allClear={() => {
                                        this.setState({filterData: {}});
                                        this.props.getLocations.request();
                                    }}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                    <View fill>
                        {isLoading
                            ? <View /> :
                            data.length ?
                                <InfinityScrollList
                                    data={data}
                                    loadingMore={isLoadingMore}
                                    refreshing={isRefreshing}
                                    renderItem={this.renderItem}
                                    onRefresh={this._onRefresh}
                                    onLoadMore={() => {
                                        if (!pagination.hasNextPage) {
                                            return;
                                        }
                                        this.props.getLocations.loadmore(this.state.filterData);
                                    }}
                                /> : <NoResult onReload={this._onRefresh} />
                        }
                    </View>
                </View>
            </Container>
        )
    }
}

LocationListScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

LocationListScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'location.title'} />,
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />,
});

export default connect(
    (state) => ({
        locations: locationWithoutCoordinate(state),
        user: userProfile(state),
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        getLocations: bindActionCreators(getAllLocationWithoutCoordinate, dispatch)
    })
)(LocationListScreen);