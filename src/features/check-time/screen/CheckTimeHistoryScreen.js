/* eslint-disable react/prop-types */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {Container, Tab, TabHeading, Tabs, Text, Content, Card, CardItem, View, Body} from 'native-base';
import {NavigationActions} from "react-navigation";
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import CheckInList from '../components/CheckInList';
import MonthlyFilterForm from '../forms/MonthlyFilterForm';
import {getCheckTimeHistory as getCheckTimeHistoryActions} from '../redux/actions';
import {getCheckTimeHistoryExcludeFuture} from '../redux/selectors';
import MonthlySummary from './tab/_monthlySummary';
import TabHeadingTheme from "../../../../native-base-theme/components/TabHeading";
import themeVariables from "../../../../native-base-theme/variables/platform";
import Trans from "../../common/containers/Trans";

class CheckTimeHistoryScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        const d = new Date();
        const month = d.getMonth() + 1;

        this.state = {
            activeYear: d.getFullYear(),
            activeMonth: month > 9 ? month.toString() : '0' + month.toString(),
        };
    }

    componentDidMount() {
        this.props.getCheckTimeHistory.request({
            year: this.state.activeYear,
            month: this.state.activeMonth
        });
    }

    _renderItem = ({item}) => {
        return (
            <Card withSpace>
                <CardItem>
                    <CheckInList data={item} />
                </CardItem>
            </Card>
        )
    };

    render() {
        const d = new Date();
        const month = d.getMonth() + 1;
        const initialValues = {
            year: d.getFullYear().toString(),
            month: month > 9 ? month.toString() : '0' + month.toString(),
        };

        return (
            <Container iPhoneXSupport withBackground>
                <View fill padder>
                    <Card style={themeVariables.globalStyle.flex0}>
                        <CardItem padderSm>
                            <Body>
                                <MonthlyFilterForm
                                    initialValues={initialValues}
                                    onSubmit={(values) => {
                                        this.setState({
                                            activeYear: values.year,
                                            activeMonth: values.month,
                                        });

                                        this.props.getCheckTimeHistory.request({
                                            year: values.year,
                                            month: values.month,
                                        });
                                    }}
                                />
                            </Body>
                        </CardItem>
                    </Card>

                    <Tabs locked>
                        {/*FIXME : .first not working why ?*/}
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                    <Text>
                                        {Trans.tran('check_time.history.titleTab.title_history')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <Content>
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.props.checkTimeHistory}
                                    renderItem={this._renderItem}
                                />
                            </Content>
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                    <Text>
                                        {Trans.tran('check_time.history.titleTab.title_monthly_Summary.title')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <Content>
                                <MonthlySummary month={this.state.activeMonth} year={this.state.activeYear} />
                            </Content>
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        )
    }
}

CheckTimeHistoryScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'check_time.history.title'} />,
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default connect(
    (state) => ({
        checkTimeHistory: getCheckTimeHistoryExcludeFuture(state),
    }),
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        getCheckTimeHistory: bindActionCreators(getCheckTimeHistoryActions, dispatch),
    })
)(CheckTimeHistoryScreen);
