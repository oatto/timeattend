/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Container, Text, View, Tabs, Tab, TabHeading, Content } from 'native-base';
import themeVariables from "_theme";
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderMainDataUser from '_features/common/components/HeaderMainDataUser';
import Trans from "_features/common/containers/Trans";
import ProfileTakeLeavesTypeDescription from "_features/user/screen/profile-tab/ProfileTakeLeavesTypeDescription";
import ProfileTakeLeaves from "_features/user/screen/profile-tab/ProfileTakeLeaves";
import { mngCurrentActiveEmployee, mngEmployeeTakeLeaves } from "_features/mng-employee-management/redux/selectors";
import { getMngTakeLeaveByEmployee } from '../redux/actions';
import TabHeadingTheme from "../../../../native-base-theme/components/TabHeading";
import MngEmployeeProfileDetail from './tabs/_mngEmployeeProfileDetail';

class MngEmployeeProfileScreen extends React.PureComponent {
    componentDidMount() {
        this.props.getMngTakeLeaveByEmployee.request({employeeId: this.props.mngCurrentActiveEmployee.id});
    }

    render() {
        const data = this.props.mngCurrentActiveEmployee;
        const takeLeaves = this.props.mngEmployeeTakeLeaves;

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={data} showTime={false} />
                <View fill padder>
                    <Tabs locked>
                        {/*FIXME : .first not working why ?*/}
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                    <Text>
                                        {Trans.tran('user.profile_tab_detail.title')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <MngEmployeeProfileDetail employee={data} />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading>
                                    <Text>
                                        {Trans.tran('user.profile_tab_right_take_leave.title')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <ProfileTakeLeaves data={takeLeaves} />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                    <Text>
                                        {Trans.tran('user.profile_tab_take_leave_add.title')}
                                    </Text>
                                </TabHeading>
                            }
                        >
                            <ProfileTakeLeavesTypeDescription />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        )
    }
}

MngEmployeeProfileScreen.navigationOptions = {
    headerTitle: <HeaderTitle text={'mng.employee_detail.title'} />,
};

export default connect(
    (state) => ({
        mngCurrentActiveEmployee: mngCurrentActiveEmployee(state),
        mngEmployeeTakeLeaves: mngEmployeeTakeLeaves(state)
    }),
    (dispatch) => ({
        getMngTakeLeaveByEmployee: bindActionCreators(getMngTakeLeaveByEmployee, dispatch)
    })
)(MngEmployeeProfileScreen);
