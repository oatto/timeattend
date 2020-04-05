/* eslint-disable react/prop-types */
import React from 'react';
import { Alert } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from 'native-base';
import Trans from "_features/common/containers/Trans";
import HeaderTitle from '_features/common/components/HeaderTitle';
import { mngCurrentActiveEmployee } from '_features/mng-employee-management/redux/selectors';
import RecompenseWorkingCreateForm, { validate } from '_features/recompense-working/forms/RecompenseWorkingCreateForm';
import { createMngEmRecompenseWorking } from '../redux/actions';

class MngEmRecompenseWorkingCreateScreen extends React.PureComponent {
    render () {
        const employee = this.props.mngCurrentActiveEmployee;

        return (
            <Container iPhoneXSupport>
                <RecompenseWorkingCreateForm
                    onSubmit={(values) => {
                        if (validate(values)) {
                            Alert.alert(
                                Trans.tran('recompense_working.alert.create_form_title'),
                                Trans.tran('recompense_working.alert.create_form_description'),
                                [
                                    {
                                        text: Trans.tran('general.confirm'),
                                        onPress: () => this.props.createMngEmRecompenseWorking.submit({
                                            employeeId: employee.id,
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

MngEmRecompenseWorkingCreateScreen.navigationOptions = ({
    headerTitle: <HeaderTitle text={'recompense_working.request_day_change_add'} />
});

export default connect(
    (state) => ({
        mngCurrentActiveEmployee: mngCurrentActiveEmployee(state),
    }),
    (dispatch) => ({
        createMngEmRecompenseWorking: bindActionCreators(createMngEmRecompenseWorking, dispatch)
    })
)(MngEmRecompenseWorkingCreateScreen);
