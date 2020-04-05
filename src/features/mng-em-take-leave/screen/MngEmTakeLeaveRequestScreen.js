/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from "react-redux";
import { Container, Text, View, Tabs, Tab, TabHeading } from 'native-base';
import themeVariables from "_theme";
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderMainDataUser from '_features/common/components/HeaderMainDataUser';
import ref from 'react-native-core/utils/ref';
import Trans from "_features/common/containers/Trans";
import { mngCurrentActiveEmployee } from "_features/mng-employee-management/redux/selectors";
import { EMPLOYEE_MANAGEMENT_MENUS } from "_features/mng-employee-management/router";
import ApprovedTab from './tab/Approved';
import RequestedTab from './tab/Requested';
import RejectedTab from './tab/Rejected';
import TabHeadingTheme from "../../../../native-base-theme/components/TabHeading";
import HeaderIconMenu from "../../common/components/HeaderIconMenu";
import { BackIcon } from "../../common/components/icons/AppIcons";

class MngEmTakeLeaveRequestScreen extends React.PureComponent {
    render() {
        const employee = this.props.currentActiveEmployee;

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={employee} showTime={false} />
                <View fill padderHorizontal withBackground>
                    <Tabs locked>
                        {/*FIXME : .first not working why ?*/}
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                    <Text>
                                        {Trans.tran('mng.take_leave.tab.requested_title')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <RequestedTab employeeId={employee.id} />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading>
                                    <Text>
                                        {Trans.tran('mng.take_leave.tab.approved_title')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <ApprovedTab employeeId={employee.id} />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                    <Text>
                                        {Trans.tran('mng.take_leave.tab.rejected_title')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <RejectedTab employeeId={employee.id} />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        )
    }
}

MngEmTakeLeaveRequestScreen.navigationOptions = {
    headerTitle: <HeaderTitle text={'mng.take_leave.title'} />
};

export default connect(
    (state) => ({
        currentActiveEmployee: mngCurrentActiveEmployee(state)
    })
)(MngEmTakeLeaveRequestScreen);
