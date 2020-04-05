/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import { userProfile, userTakeLeave } from '_features/user/redux/selectors';
import moment from '_utils/moment';
import TakeLeaveRequestCreateForm, { validate } from '../forms/TakeLeaveRequestCreateForm';
import { createTakeLeaveRequest } from '../redux/actions';

class TakeLeaveRequestCreateScreen extends React.PureComponent {
    render () {
        const takeLeaveTypes = [];
        const user =  this.props.userProfile;
        const leaveHourChoices = [
            {label: Trans.tran('take_leave_request.take_leave_create.days'), value: {id: 1, value: false }},
            {label: Trans.tran('take_leave_request.take_leave_create.hour'), value: {id: 2, value: true }}
        ];

        if (this.props.userTakeLeave) {
            this.props.userTakeLeave.map((item) => {
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
                                    onPress: () => this.props.createTakeLeaveRequest.submit({formData: values})
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

TakeLeaveRequestCreateScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'take_leave_request.title'} />
});

export default connect(
    (state) => ({
        userProfile: userProfile(state),
        userTakeLeave: userTakeLeave(state)
    }),
    (dispatch) => ({
        createTakeLeaveRequest: bindActionCreators(createTakeLeaveRequest, dispatch)
    }))(TakeLeaveRequestCreateScreen)
;
