/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from "react-redux";
import { Container, Tab, TabHeading, Tabs, Text, View } from 'native-base';
import themeVariables from '_theme';
import ref from 'react-native-core/utils/ref';
import HeaderMainDataUser from '_features/common/components/HeaderMainDataUser';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import { mngCurrentActiveEmployee } from '_features/mng-employee-management/redux/selectors';
import TabHeadingTheme from '../../../../native-base-theme/components/TabHeading';
import RequestedTab from './tabs/_requested';
import ApprovedTab from './tabs/_approved';
import RejectedTab from './tabs/_rejected';

class MngEmRecompenseWorkingIndexScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        const haveInitPage = ref(this.props.navigation.state.params, 'tabIndexInit');

        this.state = {
            initPage: haveInitPage ? haveInitPage : 0
        };
    }

    render() {
        const employee = this.props.mngCurrentActiveEmployee;

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={employee} showTime={false} />
                <View fill padderHorizontal>
                    <Tabs locked initialPage={this.state.initPage}>
                        <Tab heading={
                            <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                <Text>
                                    {Trans.tran('general.tab.requested')}
                                </Text>
                            </TabHeading>}
                        >
                            <RequestedTab employeeId={employee.id} />
                        </Tab>
                        <Tab heading={
                            <TabHeading>
                                <Text>
                                    {Trans.tran('general.tab.approved')}
                                </Text>
                            </TabHeading>}
                        >
                            <ApprovedTab employeeId={employee.id} />
                        </Tab>
                        <Tab heading={
                            <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                <Text>
                                    {Trans.tran('general.tab.rejected')}
                                </Text>
                            </TabHeading>}
                        >
                            <RejectedTab employeeId={employee.id} />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        )
    }
}

MngEmRecompenseWorkingIndexScreen.navigationOptions = {
    headerTitle: <HeaderTitle text={'mng.recompense_works.history.title'} />,
};

export default connect(
    (state) => ({
        mngCurrentActiveEmployee: mngCurrentActiveEmployee(state),
    }),
    null
)(MngEmRecompenseWorkingIndexScreen);
