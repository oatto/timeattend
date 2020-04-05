/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { styles as s } from 'react-native-style-tachyons';
import { StyleSheet } from "react-native";
import { Body, View, Card, CardItem, Container } from "native-base";
import themeVariables from '_theme';
import CommonText from "_features/common/components/CommonText";
import Trans from "_features/common/containers/Trans";
import { userProfile, userTakeLeave } from "_features/user/redux/selectors";
import { getUserTakeLeave } from "_features/user/redux/actions";

class _remainingTakeLeave extends React.PureComponent {
    componentDidMount() {
        this.props.getEmployeeTakeLeaves.request();
    }

    _renderItem = ({item, index}) => {
        return (
            <View key={index} style={styles.viewRender}>
                <View style={styles.viewWidth}>
                    <CommonText text={item.type_name} />
                </View>
                <View style={styles.viewWidth}>
                    <CommonText text={`${item.total_used_days} ${Trans.tran('general.unit.day')}`} />
                    <CommonText text={`${item.total_used_hours} ${Trans.tran('general.unit.hour')}`} style={s.mt1} />
                    <CommonText text={`${item.total_used_minutes} ${Trans.tran('general.unit.min')}`} style={s.mt1} />
                </View>
                <View style={styles.viewWidth}>
                    <CommonText text={`${item.remaining_days} ${Trans.tran('general.unit.day')}`} />
                    <CommonText text={`${item.remaining_hours} ${Trans.tran('general.unit.hour')}`} style={s.mt1} />
                    <CommonText
                        style={s.mt1}
                        text={item.remaining_minutes
                            ? `${item.remaining_minutes} ${Trans.tran('general.unit.min')}`
                            : `0 ${Trans.tran('general.unit.min')}`
                        }
                    />

                </View>
            </View>
        );
    };

    render() {
        const data = this.props.employeeTakeLeaves ? this.props.employeeTakeLeaves : [];

        return (
            <Container withBackground>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padder>
                        <Body>
                            <View style={styles.viewRender}>
                                <View style={styles.viewWidth} />
                                <View style={styles.viewWidth}>
                                    <Trans t={'take_leave_request.take_leave_detail.used'} bold />
                                </View>
                                <View style={styles.viewWidth}>
                                    <Trans t={'take_leave_request.take_leave_detail.remain'} bold />
                                </View>
                            </View>
                            {data.filter((i) => i.allow).map((item, index) => this._renderItem({item, index}))}
                        </Body>
                    </CardItem>
                </Card>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    viewRender: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewWidth: {
        flexBasis: '33%',
        marginTop: themeVariables.sp1
    }
});

export default connect(
    (state) => ({
        userProfile: userProfile(state),
        employeeTakeLeaves: userTakeLeave(state)
    }),
    (dispatch) => ({
        getEmployeeTakeLeaves: bindActionCreators(getUserTakeLeave, dispatch)
    })
)(_remainingTakeLeave)
