/* eslint-disable react/prop-types */
import React from 'react';
import { Alert } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, View } from 'native-base';
import ref from 'react-native-core/utils/ref';
import Trans from "_features/common/containers/Trans";
import HeaderTitle from '_features/common/components/HeaderTitle';
import { mngCurrentActiveEmployee } from '_features/mng-employee-management/redux/selectors';
import { getAllLocation } from '_features/location/redux/actions';
import { allLocation, isAllLocationsIsLoading } from '_features/location/redux/selectors';
import CheckTimeAdjustmentCreateForm, { validate } from '_features/check-time-adjustment/forms/CheckTimeAdjustmentCreateForm';
import { mngCreateCheckTimeAdjustmentWithEmployees } from '_features/mng-check-time-adjustment/redux/actions';

class MngCheckTimeAdjustmentCreateWithEmployeesScreen extends React.PureComponent {
    componentDidMount() {
        this.props.getLocation.request();
    }

    render () {
        const employeesId = ref(this.props.navigation.state.params, 'employeesId');

        if (this.props.isAllLocationsIsLoading) {
            return <View />
        }

        return (
            <Container>
                <CheckTimeAdjustmentCreateForm
                    initialValues={{
                        date: undefined,
                        checkInPlace: undefined,
                        checkedInAt: undefined,
                        checkedOutAt: undefined
                    }}
                    locations={this.props.allLocation}
                    onSubmit={(values) => {
                        if (validate(values)) {
                            // replace place both checkin and checkout
                            if (values.checkInPlace) {
                                values.checkOutPlace = values.checkInPlace;
                            }

                            values.employeeIds = employeesId;

                            Alert.alert(
                                Trans.tran('time_adjustment.alert.create_form_title'),
                                Trans.tran('time_adjustment.alert.create_form_description'),
                                [
                                    {
                                        text: Trans.tran('general.confirm'),
                                        onPress: () => this.props.mngCreateCheckTimeAdjustmentWithEmployees.submit({
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

MngCheckTimeAdjustmentCreateWithEmployeesScreen.navigationOptions = ({
    headerTitle: <HeaderTitle text={'time_adjustment.create.title'} />
});

export default connect(
    (state) => ({
        mngCurrentActiveEmployee: mngCurrentActiveEmployee(state),
        allLocation: allLocation(state),
        isAllLocationsIsLoading: isAllLocationsIsLoading(state)
    }),
    (dispatch) => ({
        getLocation: bindActionCreators(getAllLocation, dispatch),
        mngCreateCheckTimeAdjustmentWithEmployees: bindActionCreators(mngCreateCheckTimeAdjustmentWithEmployees, dispatch)
    })
)(MngCheckTimeAdjustmentCreateWithEmployeesScreen);
