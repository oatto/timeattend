/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Tab, Tabs, TabHeading, Text, View } from 'native-base';
import themeVariables from '_theme';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import Trans from "_features/common/containers/Trans";
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderMainDataUser from '_features/common/components/HeaderMainDataUser';
import ProfileDetail from './profile-tab/ProfileDetail';
import ProfileTakeLeaves from './profile-tab/ProfileTakeLeaves';
import ProfileTakeLeavesTypeDescription from './profile-tab/ProfileTakeLeavesTypeDescription';
import { getUserTakeLeave } from '../redux/actions';
import { userProfile, userTakeLeave } from '../redux/selectors';
import TabHeadingTheme from '../../../../native-base-theme/components/TabHeading';


class ProfileScreen extends React.PureComponent {
    componentDidMount() {
        this.props.getEmployeeTakeLeaves.request();
    }

    render() {
        const profile = this.props.employeeProfile;
        const takeLeave = this.props.employeeTakeLeaves;

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser
                    user={this.props.employeeProfile}
                    showTime={false}
                />
                <View fill padderHorizontal>
                    <Tabs locked>
                        <Tab heading={
                            <TabHeading style={TabHeadingTheme(themeVariables)['.first']}>
                                <Text>
                                    {Trans.tran('user.profile_tab_detail.title')}
                                </Text>
                            </TabHeading>}
                        >
                            <ProfileDetail data={profile} />
                        </Tab>
                        <Tab heading={
                            <TabHeading>
                                <Text>
                                    {Trans.tran('user.profile_tab_right_take_leave.title')}
                                </Text>
                            </TabHeading>}
                        >
                            <ProfileTakeLeaves data={takeLeave} />
                        </Tab>
                        <Tab heading={
                            <TabHeading style={TabHeadingTheme(themeVariables)['.last']}>
                                <Text>
                                    {Trans.tran('user.profile_tab_take_leave_add.title')}
                                </Text>
                            </TabHeading>}
                        >
                            <ProfileTakeLeavesTypeDescription />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        )
    }
}

ProfileScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

ProfileScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'user.profile.data_account'} />,
    headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: themeVariables.primary
    }
});

export default connect(
    (state) => ({
        employeeProfile: userProfile(state),
        employeeTakeLeaves: userTakeLeave(state)
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        getEmployeeTakeLeaves: bindActionCreators(getUserTakeLeave, dispatch)
    })
)(ProfileScreen);
