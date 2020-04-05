/* eslint-disable react/prop-types */
import React from 'react';
import {Container, Tab, TabHeading, Tabs, Text, Card, CardItem, Body, View} from 'native-base';
import themeVariables from '_theme';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from "_features/common/containers/Trans";
import CheckTimeTab from "./my-employee-tabs/CheckTimeTab";
import TakeLeaveTab from "./my-employee-tabs/TakeLeaveTab";
import RecompenseTab from "./my-employee-tabs/RecompenseTab";
import MonthlyFilterForm from "../../check-time/forms/MonthlyFilterForm";
import TabHeadingTheme from '../../../../native-base-theme/components/TabHeading';

class MyEmployeeScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        const d = new Date();
        const month = d.getMonth() + 1;

        this.state = {
            activeYear: d.getFullYear().toString(),
            activeMonth: month > 9 ? month.toString() : '0' + month.toString(),
        };
    }

    render() {
        const d = new Date();
        const month = d.getMonth() + 1;
        const initialValues = {
            year: d.getFullYear().toString(),
            month: month > 9 ? month.toString() : '0' + month.toString(),
        };

        return (
            <Container withBackground>
                <View fill padder>
                    <Card withSpace style={themeVariables.globalStyle.flex0}>
                        <CardItem padder>
                            <Body>
                                <MonthlyFilterForm
                                    initialValues={initialValues}
                                    onSubmit={(values) => {
                                        this.setState({
                                            activeYear: values.year.toString(),
                                            activeMonth: values.month.toString(),
                                        });
                                    }}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                    <Tabs>
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                    <Text>
                                        {Trans.tran('mng.my_employee.tabs.check_time')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <CheckTimeTab {...this.state} />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading>
                                    <Text>
                                        {Trans.tran('mng.my_employee.tabs.take_leave')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <TakeLeaveTab {...this.state} />
                        </Tab>

                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                    <Text>
                                        {Trans.tran('mng.my_employee.tabs.recompense_work')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <RecompenseTab {...this.state} />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        );
    }
}

MyEmployeeScreen.navigationOptions = ({navigation}) => ({
    headerLeft: <HeaderIconMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerTitle: <HeaderTitle text={'mng.my_employee.title'} />,
});

export default MyEmployeeScreen;
