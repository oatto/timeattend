/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Alert } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { NavigationActions } from 'react-navigation';
import Trans from '_features/common/containers/Trans';
import themeVariables from '_theme';
import HeaderTitle from '_features/common/components/HeaderTitle';
import { MNG_RECOMPENSE_WORKS_CREATE_WITH_EMPLOYEES } from '_features/mng-recompense-working/router';
import ButtonSubmit from '_features/common/components/form/ButtonSubmit';
import { CalendarIcon } from "_features/common/components/icons/AppIcons";
import MngEmployeesSelect from "_features/mng-core/containers/MngEmployeesSelect";

class MngRecompenseWorksEmployeeListScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
        };

        this._onChange = this._onChange.bind(this);
    }

    _onChange = (employeeIds) => {
        this.setState({employees: employeeIds});
    };

    render() {
        return (
            <MngEmployeesSelect
                submitButton={
                    <ButtonSubmit
                        onPress={() => {
                            !isEmpty(this.state.employees)
                                ?
                                this.props.navigation.navigate({
                                    routeName: MNG_RECOMPENSE_WORKS_CREATE_WITH_EMPLOYEES,
                                    params: {
                                        employeesId: this.state.employees
                                    }
                                })
                                : Alert.alert(Trans.tran('general.alert.failed'),
                                    Trans.tran('general.alert.empty_employee'),
                                    [{text: Trans.tran('general.alert.ok')}]
                                );

                        }}
                        borderRadius={false}
                        buttonStyle={styles.button}
                        icon={<CalendarIcon size={themeVariables.ifs5} />}
                        label={'mng.menus.recompense_work_create_with_employee_select'}
                        labelReplace={{number: this.state.employees.length}}
                        positionBottom
                    />
                }
                onChange={this._onChange}
            />
        )
    }
}

MngRecompenseWorksEmployeeListScreen.navigationOptions = ({
    headerTitle: <HeaderTitle text={'mng.recompense_works.title'} />,
});

const styles = StyleSheet.create({
    button: {
        height: 60
    }
});

export default connect(
    null,
    (dispatch) => ({
        navigation: bindActionCreators(NavigationActions, dispatch),
    })
)(MngRecompenseWorksEmployeeListScreen);
