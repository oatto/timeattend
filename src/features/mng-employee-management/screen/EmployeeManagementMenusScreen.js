/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlatList } from 'react-native';
import { Container, View, Content } from 'native-base';
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderMainDataUser from '_features/common/components/HeaderMainDataUser';
import { EMPLOYEE_MANAGEMENT_MENUS } from '_features/mng-employee-management/router';
import MngModalPushMessage from "_features/mng-employee-management/components/MngModalPushMessage";
import ModalSetting from '_features/mng-employee-management/components/ModalSetting';
import MenuListItem from '_features/mng-employee-management/components/MenuListItem';
import { getMngEmployeeProfile, mngPushMessageToEmployee } from '_features/mng-employee-management/redux/actions';
import { mngCurrentActiveEmployee, mngCurrentIsLoadingEmployee } from '../redux/selectors';

class EmployeeManagementMenusScreen extends React.PureComponent {
    constructor(props){
        super(props);
        this.menuItems = [
            {'title': 'mng.menus.check_time_history', 'icon': 'history', 'routeName': 'MNG_EM_CHECK_TIME_TRANSACTIONS_HISTORY'},
            {'title': 'mng.menus.employee_detail', 'icon': 'user-tie', 'routeName': 'MNG_EMPLOYEE_PROFILE'},
            {'title': 'mng.menus.take_leave_create', 'icon': 'file-alt', 'routeName': 'MNG_EM_PROFILE_TAKE_LEAVE'},
            {'title': 'mng.menus.take_leave_history', 'icon': 'history', 'routeName': 'MNG_EM_TAKE_LEAVE'},
            {'title': 'mng.menus.time_adjustment_create', 'icon': 'clock', 'routeName': 'MNG_EM_CHECK_TIME_ADJUSTMENT_CREATE'},
            {'title': 'mng.menus.time_adjustment_history', 'icon': 'history', 'routeName': 'MNG_EM_CHECK_TIME_ADJUSTMENT_INDEX'},
            {'title': 'mng.menus.recompense_work_create', 'icon': 'calendar', 'routeName': 'MNG_EM_RECOMPENSE_WORKING_CREATE'},
            {'title': 'mng.menus.recompense_work_history', 'icon': 'history', 'routeName': 'MNG_EM_RECOMPENSE_WORKING_INDEX'},
            {'title': 'mng.menus.send_message', 'icon': 'envelope'},
            {'title': 'mng.menus.send_message_history', 'icon': 'history', 'routeName': 'MNG_EMPLOYEE_INBOX_MESSAGE'},
        ];

        this.state = {
            mngPushMessageModalVisible: false
        }
    }

    componentDidMount() {
        const { data } = this.props.navigation.state.params;

        this.props.getMngEmployeeProfile.request({ employeeId: data.id });
    }

    _renderItem = ({item}) => {
        const { routeName } = item;

        return (
            <MenuListItem
                data={item}
                onPress={() => {routeName
                    ? this.props.navigation.navigate({
                        routeName: routeName,
                        key: EMPLOYEE_MANAGEMENT_MENUS
                    })
                    : this.setState({mngPushMessageModalVisible: true })
                }}
            />
        )
    };

    _keyExtractor = (item, index) => index.toString();

    render() {
        if (this.props.mngCurrentIsLoadingEmployee) {
            return <View />
        }

        return (
            <Container withBackground iPhoneXSupport>
                <HeaderMainDataUser user={this.props.mngCurrentActiveEmployee} showTime={false} />
                <Content>
                    <View padder>
                        <FlatList
                            data={this.menuItems}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                </Content>
                <MngModalPushMessage
                    isVisible={this.state.mngPushMessageModalVisible}
                    onConfirm={(values) => {
                        this.props.mngPushMessageToEmployee.submit({
                            employeeId: this.props.mngCurrentActiveEmployee.id,
                            message: values.message
                        });

                        this.setState({
                            mngPushMessageModalVisible: false
                        })
                    }}
                    onClosePress={() => this.setState({mngPushMessageModalVisible: false})}
                />
            </Container>
        )
    }
}

EmployeeManagementMenusScreen.navigationOptions = ({navigation}) => {
    const { id } = navigation.state.params.data;

    return {
        headerTitle: <HeaderTitle text={'mng.employee_management.menu_title'} />,
        headerRight: <ModalSetting employeeId={id} />
    }
};

export default connect(
    (state) => ({
        mngCurrentActiveEmployee: mngCurrentActiveEmployee(state),
        mngCurrentIsLoadingEmployee: mngCurrentIsLoadingEmployee(state)
    }),
    (dispatch) => ({
        getMngEmployeeProfile: bindActionCreators(getMngEmployeeProfile, dispatch),
        mngPushMessageToEmployee: bindActionCreators(mngPushMessageToEmployee, dispatch),
    })
)(EmployeeManagementMenusScreen);
