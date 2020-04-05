/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import moment from '_utils/moment';
import { mngCurrentActiveEmployee } from '_features/mng-employee-management/redux/selectors';
import TakeLeaveRequestCreateForm, { validate } from '_features/take-leave/forms/TakeLeaveRequestCreateForm';
import { mngEmTakeLeaveDataTypeByEmployee } from '../redux/selectors';
import { mngEmTakeLeaveCreateByEmployee } from '../redux/actions';

class MngEmTakeLeaveRequestCreateScreen extends React.PureComponent {
    render () {
        const takeLeaveTypes = [];
        const user =  this.props.currentActiveEmployee;
        const leaveHourChoices = [
            {label: Trans.tran('take_leave_request.take_leave_create.days'), value: {id: 1, value: false }},
            {label: Trans.tran('take_leave_request.take_leave_create.hour'), value: {id: 2, value: true }}
        ];

        if (this.props.mngEmTakeLeaveDataTypeByEmployee) {
            this.props.mngEmTakeLeaveDataTypeByEmployee.map((item) => {
                takeLeaveTypes.push({
                    label: item.type_name,
                    value: item.take_leave_setting.id,
                    allowTakeLeave: item.allow_take_leave_hour
                })
            })
        }

        return (
            <TakeLeaveRequestCreateForm
                initialValues={{ leaveHours: false }}
                timingChoices={leaveHourChoices}
                takeLeaveTypeChoices={takeLeaveTypes}
                onSubmit={(values) => {
                    if (validate(values)) {
                        if (values.leaveHours) {
                            if (user.is_across_work_time && values.startTime > values.endTime) {
                                values.endDate.date = moment(values.startDate.date).add(1, 'day').format('YYYY-MM-DD')
                            } else {
                                values.endDate.date = values.startDate.date;
                            }
                        }

                        if (!values.leaveHours) {
                            values.startDate.time = "00:00";
                            values.endDate.time = "00:00";
                        }

                        Alert.alert(
                            Trans.tran('take_leave_request.take_leave_create.alert.create_form_title'),
                            Trans.tran('take_leave_request.take_leave_create.alert.create_form_description'),
                            [
                                {
                                    text: Trans.tran('general.confirm'),
                                    onPress: () => this.props.mngEmTakeLeaveCreateByEmployee.submit({
                                        employeeId: user.id,
                                        formData: values
                                    })
                                },
                                {text: Trans.tran('general.cancel')}
                            ]
                        );
                    }
                }}
            />
        )
    }
}

MngEmTakeLeaveRequestCreateScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'take_leave_request.title'} />
});

export default connect(
    (state) => ({
        currentActiveEmployee: mngCurrentActiveEmployee(state),
        mngEmTakeLeaveDataTypeByEmployee: mngEmTakeLeaveDataTypeByEmployee(state),
    }),
    (dispatch) => ({
        mngEmTakeLeaveCreateByEmployee: bindActionCreators(mngEmTakeLeaveCreateByEmployee, dispatch),
    })
)(MngEmTakeLeaveRequestCreateScreen);
