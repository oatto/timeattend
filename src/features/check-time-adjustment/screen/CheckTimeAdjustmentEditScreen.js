/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { Container, Content, View } from 'native-base';
import ref from 'react-native-core/utils/ref';
import { styles as s } from 'react-native-style-tachyons';
import moment from '_utils/moment';
import themeVariables from '_theme';
import ColumnList from '_features/common/components/ColumnList';
import HeaderTitle from '_features/common/components/HeaderTitle';
import Trans from '_features/common/containers/Trans';
import { getAllLocation } from '_features/location/redux/actions';
import { allLocation, isAllLocationsIsLoading } from '_features/location/redux/selectors';
import CheckTimeAdjustmentCreateForm, { validate } from '../forms/CheckTimeAdjustmentCreateForm';
import { createTimeAdjustment } from '../redux/actions';

class CheckTimeAdjustmentEditScreen extends React.PureComponent {
    componentDidMount() {
        this.props.getLocation.request();
    }

    render() {
        const data = ref(this.props.navigation.state.params, 'item');
        const checkInTime = ref(data, 'check_in.check_in_at');
        const checkOutTime = ref(data, 'check_in.check_out_at');
        const checkInPlace = ref(data, 'check_in.check_in_place.name');
        const checkOutPlace = ref(data, 'check_in.check_out_place.name');

        if (this.props.isAllLocationsIsLoading) {
            return <View />
        }

        return (
            <Container iPhoneXSupport>
                <Content>
                    {data ?
                        <View withBackground padder>
                            <ColumnList
                                label="time_adjustment.edit_time.before_edit"
                                labelWeight={{bold: true}}
                                data={moment(data.date).format('DD MMMM YYYY')}
                                dataWeight={{bold: true}}
                            />
                            <ColumnList
                                label="time_adjustment.edit_time.time"
                                data={
                                    (checkInTime ? moment(checkInTime).format('HH:mm') : Trans.tran('time_adjustment.edit_time.not_check_in_work')) + ' - ' +
                                    (checkOutTime ? moment(checkOutTime).format('HH:mm') : Trans.tran('time_adjustment.edit_time.not_check_out_work'))
                                }
                            />
                            <ColumnList
                                label="time_adjustment.edit_time.chekc_in_place"
                                data={checkInPlace ? checkInPlace : Trans.tran('time_adjustment.edit_time.no_locations_found')}
                            />
                            <ColumnList
                                label="time_adjustment.edit_time.chekc_out_place"
                                data={checkOutPlace ? checkOutPlace : Trans.tran('time_adjustment.edit_time.no_locations_found')}
                            />
                        </View>
                        : null
                    }
                    <CheckTimeAdjustmentCreateForm
                        initialValues={{
                            date: data ? data.date : undefined,
                            checkInPlace: ref(data, 'check_in.check_in_place.id')
                                ? ref(data, 'check_in.check_in_place.id')
                                : (ref(data, 'check_in.check_out_place.id')
                                    ? ref(data, 'check_in.check_out_place.id')
                                    : undefined
                                ) ,
                            checkedInAt: checkInTime ? moment(checkInTime).format('HH:mm') : undefined,
                            checkedOutAt: checkOutTime ? moment(checkOutTime).format('HH:mm') : undefined
                        }}
                        locations={this.props.allLocation}
                        onSubmit={(values) => {
                            if (validate(values)) {
                                // replace place both checkin and checkout
                                if (values.checkInPlace) {
                                    values.checkOutPlace = values.checkInPlace;
                                }

                                Alert.alert(
                                    Trans.tran('time_adjustment.alert.create_form_title'),
                                    Trans.tran('time_adjustment.alert.create_form_description'),
                                    [
                                        {
                                            text: Trans.tran('general.confirm'),
                                            onPress: () => this.props.createCheckTimeAdjustment.submit({formData: values})
                                        },
                                        {text: Trans.tran('general.cancel')}
                                    ]
                                );
                            }
                        }}
                    />
                </Content>
            </Container>
        )
    }
}

CheckTimeAdjustmentEditScreen.navigationOptions = ({
    headerTitle: <HeaderTitle text={'time_adjustment.create.title'} />
});

export default connect(
    (state) => ({
        allLocation: allLocation(state),
        isAllLocationsIsLoading: isAllLocationsIsLoading(state)
    }),
    (dispatch) => ({
        createCheckTimeAdjustment: bindActionCreators(createTimeAdjustment, dispatch),
        getLocation: bindActionCreators(getAllLocation, dispatch)
    })
)(CheckTimeAdjustmentEditScreen);
