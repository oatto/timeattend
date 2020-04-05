/* eslint-disable react/prop-types,react/no-did-update-set-state */
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { bindActionCreators } from 'redux';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, View, Card, CardItem, Body } from 'native-base';
import { companyTakeLeaveSettings } from '_features/take-leave/redux/selectors';
import MngModal from '_features/mng-core/components/MngModal';
import { getCompanyTakeLeaveSettings } from '_features/take-leave/redux/actions';
import ModalTakeLeaveDescription from "../../components/ModalTakeLeaveDescription";
import TakeLeaveList from "../../components/TakeLeaveList";

class ProfileTakeLeavesTypeDescription extends React.Component {
    constructor(props) {
        super(props);

        this._renderCompanyTakeLeaveSettings = this._renderCompanyTakeLeaveSettings.bind(this);
        this._onClose = this._onClose.bind(this);
        this.state = {
            modalVisible: false,
            activeData: {},
        };
    }

    componentDidMount() {
        if (!isEmpty(this.props.companyTakeLeaveSettings)) {
            return;
        }

        this.props.getCompanyTakeLeaveSettings.request();
    }

    _renderCompanyTakeLeaveSettings({item}) {
        return (
            <Card withSpace>
                <CardItem padder>
                    <Body>
                        <TakeLeaveList
                            onPress={() => {
                                this.setState({
                                    modalVisible: true,
                                    activeData: item
                                })
                            }}
                            data={item}
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    }

    _onClose() {
        this.setState({modalVisible: false})
    }

    render() {
        const data = this.props.companyTakeLeaveSettings;

        return (
            <Container>
                <Content>
                    <View fill>
                        <FlatList
                            data={data}
                            renderItem={this._renderCompanyTakeLeaveSettings}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </Content>

                <MngModal
                    isVisible={this.state.modalVisible}
                    title={this.state.activeData.type_name}
                    onClosePress={this._onClose}
                    modalProps={{
                        animationType: 'none'
                    }}
                >
                    <ModalTakeLeaveDescription data={this.state.activeData} />
                </MngModal>
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        companyTakeLeaveSettings: companyTakeLeaveSettings(state),
    }),
    (dispatch) => ({
        getCompanyTakeLeaveSettings: bindActionCreators(getCompanyTakeLeaveSettings, dispatch)
    })
)(ProfileTakeLeavesTypeDescription);
