/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Tab, TabHeading, Tabs, Text, Content, View, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import themeVariables from "_theme";
import TabHeadingTheme from "../../../../native-base-theme/components/TabHeading";
import Trans from "../../common/containers/Trans";
import {
    getCheckTimeHistory as getCheckTimeHistoryActions,
    getCheckTimeTransactionsDailyHistory as getCheckTimeTransactionsDailyHistoryActions,
    getCheckTimeTransactionsOutsideHistory as getCheckTimeTransactionsOutsideHistoryActions
} from '../redux/actions';
import CheckTimeTransactionsDaily from './tab/_checkTimeTransactionsDaily';
import CheckTimeTransactionsOutside from './tab/_checkTimeTransactionsOutside';
import MonthlySummary from './tab/_monthlySummary';

class CheckTimeTransactionHistoryScreen extends React.PureComponent {
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

    render() {
        return (
            <Container withBackground iPhoneXSupport>
                <View fill padderHorizontal>
                    <Tabs locked>
                        {/*FIXME : .first not working why ?*/}
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                    <Text>
                                        {Trans.tran('check_time.history.titleTab.title_daily')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <CheckTimeTransactionsDaily year={this.state.activeYear} month={this.state.activeMonth} />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading>
                                    <Text>
                                        {Trans.tran('check_time.history.titleTab.title_outside')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <CheckTimeTransactionsOutside year={this.state.activeYear} month={this.state.activeMonth} />
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
                            <MonthlySummary year={this.state.activeYear} month={this.state.activeMonth} />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        )
    }
}

CheckTimeTransactionHistoryScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'check_time.history.title'} />,
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default connect(
    null,
    (dispatch) => ({
        getCheckTimeHistory: bindActionCreators(getCheckTimeHistoryActions, dispatch),
        getCheckTimeTransactionDailyHistory: bindActionCreators(getCheckTimeTransactionsDailyHistoryActions, dispatch),
        getCheckTimeTransactionsOutsideHistory: bindActionCreators(getCheckTimeTransactionsOutsideHistoryActions, dispatch)
    })
)(CheckTimeTransactionHistoryScreen);
