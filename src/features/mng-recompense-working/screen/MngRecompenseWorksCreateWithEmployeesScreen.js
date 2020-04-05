/* eslint-disable react/prop-types */
import React from 'react';
import { Alert } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ref from 'react-native-core/utils/ref';
import { Container } from 'native-base';
import Trans from "_features/common/containers/Trans";
import HeaderTitle from '_features/common/components/HeaderTitle';
import { mngCurrentActiveEmployee } from '_features/mng-employee-management/redux/selectors';
import RecompenseWorkingCreateForm, { validate } from '_features/recompense-working/forms/RecompenseWorkingCreateForm';
import { mngCreateRecompenseWorksWithEmployees } from '../redux/actions';

class MngRecompenseWorksCreateWithEmployeesScreen extends React.PureComponent {
    render () {
        const employeesId = ref(this.props.navigation.state.params, 'employeesId');

        return (
            <Container>
                <RecompenseWorkingCreateForm
                    onSubmit={(values) => {
                        if (validate(values)) {
                            values.employeeIds = employeesId;
                            Alert.alert(
                                Trans.tran('recompense_working.alert.create_form_title'),
                                Trans.tran('recompense_working.alert.create_form_description'),
                                [
                                    {
                                        text: Trans.tran('general.confirm'),
                                        onPress: () => this.props.mngCreateRecompenseWorksWithEmployees.submit({
                                            formData: values
                                        })
                                    },
                                    {text: Trans.tran('general.cancel')}
                                ]
                            );
                        }
                    }}
                />
            </Container>
        )
    }
}

MngRecompenseWorksCreateWithEmployeesScreen.navigationOptions = ({
    headerTitle: <HeaderTitle text={'recompense_working.request_day_change_add'} />
});

export default connect(
    (state) => ({
        mngCurrentActiveEmployee: mngCurrentActiveEmployee(state),
    }),
    (dispatch) => ({
        mngCreateRecompenseWorksWithEmployees: bindActionCreators(mngCreateRecompenseWorksWithEmployees, dispatch)
    })
)(MngRecompenseWorksCreateWithEmployeesScreen);
