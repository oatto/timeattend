import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Container } from 'native-base';
import Trans from "_features/common/containers/Trans";
import CommonText from '_features/common/components/CommonText';

class ProfileTakeLeaveAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            pressedBtn1: true,
            pressedBtn2: false,
            pressedBtn3: false,
            Detail: Trans.tran('user.profile_tab_take_leave_add.form.take_leave_errand.detail_errand')
        }
    }

    changeTitle1 = () =>{
        this.setState({
            Detail: Trans.tran('user.profile_tab_take_leave_add.form.take_leave_errand.detail_errand')
        });
    };

    changeTitle2 = () =>{
        this.setState({
            Detail: '(รอใส่ข้อมูล2)'
        });
    };

    changeTitle3 = () =>{
        this.setState({
            Detail: '(รอใส่ข้อมูล3)'
        });
    };

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.viewMainTouchable}>
                    <TouchableHighlight
                        onPress={this.changeTitle1}
                        underlayColor={'#808080'}
                        style={[styles.button, this.state.pressedBtn1 ? {backgroundColor: '#808080'} : {}]}
                        onShowUnderlay={()=>{this.setState({pressedBtn1: true})}}
                        onHideUnderlay={()=>{this.setState({pressedBtn2: false,pressedBtn3: false})}}
                    >
                        <View style={styles.viewTitleText}>
                            <Trans
                                t={'user.profile_tab_take_leave_add.form.take_leave_errand.title'}
                                style={[this.state.pressedBtn1 ? {color: '#fff'} : {}]}
                            />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.changeTitle2}
                        underlayColor={'#808080'}
                        style={[styles.button, this.state.pressedBtn2 ? {backgroundColor: '#808080'} : {}]}
                        onShowUnderlay={()=>{this.setState({pressedBtn2: true})}}
                        onHideUnderlay={()=>{this.setState({pressedBtn1: false,pressedBtn3: false})}}
                    >
                        <View style={styles.viewTitleText}>
                            <Trans
                                t={'user.profile_tab_take_leave_add.form.take_leave_sick.title'}
                                style={[this.state.pressedBtn2 ? {color: '#fff'} : {}]}
                            />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.changeTitle3}
                        underlayColor={'#808080'}
                        style={[styles.button, this.state.pressedBtn3 ? {backgroundColor: '#808080'} : {}]}
                        onShowUnderlay={()=>{this.setState({pressedBtn3: true})}}
                        onHideUnderlay={()=>{this.setState({pressedBtn1: false,pressedBtn2: false})}}
                    >
                        <View style={styles.viewTitleText}>
                            <Trans
                                t={'user.profile_tab_take_leave_add.form.take_leave_holiday.title'}
                                style={[this.state.pressedBtn3 ? {color: '#fff'} : {}]}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.viewBackground}>
                    <CommonText
                        style={styles.commonTextDetail}
                        text={this.state.Detail}
                    />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginTop: 20
    },
    viewMainTouchable: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        justifyContent: 'center',
        height: 90,
        width: 90,
        borderRadius: 100,
        backgroundColor: '#DCDCDC'
    },
    viewBackground: {
        backgroundColor: '#c7c6cc',
        height: '100%',
        width: '100%',
        marginTop: 20
    },
    commonTextDetail: {
        marginLeft: 20,
        marginTop: 30,
    },
    viewTitleText: {
        alignItems: 'center'
    },
});

export default ProfileTakeLeaveAdd;
