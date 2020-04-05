/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Container, Text, View, Tabs, Tab, TabHeading } from 'native-base';
import themeVariables from "_theme";
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderMainDataUser from '_features/common/components/HeaderMainDataUser';
import Trans from "_features/common/containers/Trans";
import { mngCurrentActiveEmployee } from "_features/mng-employee-management/redux/selectors";
import TabHeadingTheme from "../../../../native-base-theme/components/TabHeading";
import MngEmCheckTimeTransactionsDaily from './tab/_mngEmCheckTimeTransactionsDaily';
import MngEmCheckTimeTransactionsOutside from './tab/_mngEmCheckTimeTransactionsOutside';
import MngEmMonthly from './tab/_mngEmMonthlySummary';

class MngEmCheckTimeTransactionsHistoryScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        const d = new Date();
        const month = d.getMonth() + 1;

        this.state = {
            activeYear: d.getFullYear(),
            activeMonth: month > 9 ? month.toString() : '0' + month.toString(),
        };
    }

    render() {
        const data = this.props.currentActiveEmployee;

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={data} showTime={false} />
                <View fill padder withBackground>
                    <Tabs locked>
                        {/*FIXME : .first not working why ?*/}
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                    <Text>
                                        {Trans.tran('mng.check_time.tab.daily')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <MngEmCheckTimeTransactionsDaily employeeId={data.id} year={this.state.activeYear} month={this.state.activeMonth} />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading>
                                    <Text>
                                        {Trans.tran('mng.check_time.tab.outside')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <MngEmCheckTimeTransactionsOutside employeeId={data.id} year={this.state.activeYear} month={this.state.activeMonth} />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                    <Text>
                                        {Trans.tran('mng.check_time.tab.monthly')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <MngEmMonthly employee={data} year={this.state.activeYear} month={this.state.activeMonth}/>
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        )
    }
}

MngEmCheckTimeTransactionsHistoryScreen.navigationOptions = {
    headerTitle: <HeaderTitle text={'mng.check_time.title'} />,
};

export default connect(
    (state) => ({
        currentActiveEmployee: mngCurrentActiveEmployee(state)
    }),
    null
)(MngEmCheckTimeTransactionsHistoryScreen);
