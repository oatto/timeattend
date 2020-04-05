/* eslint-disable react/prop-types */
import React from 'react';
import { Alert } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from 'native-base';
import HeaderTitle from '_features/common/components/HeaderTitle';
import RecompenseWorkingCreateForm, { validate } from '../forms/RecompenseWorkingCreateForm';
import { createRecompenseWorking } from '../redux/actions';
import Trans from "../../common/containers/Trans";

class RecompenseWorkingRequestScreen extends React.PureComponent {
    render () {
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
                                        onPress: () => this.props.submitRecompenseWorkingRequest.submit({formData: values})
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

RecompenseWorkingRequestScreen.navigationOptions = ({
    headerTitle: <HeaderTitle text={'recompense_working.request_day_change_add'} />
});

export default connect(
    null,
    (dispatch) => ({
        submitRecompenseWorkingRequest: bindActionCreators(createRecompenseWorking, dispatch)
    })
)(RecompenseWorkingRequestScreen);
