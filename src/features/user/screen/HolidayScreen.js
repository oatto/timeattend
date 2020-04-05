/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import moment from '_utils/moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import { Container, Content, Card, View, CardItem } from 'native-base';
import { NavigationActions } from 'react-navigation'
import CommonText from '_features/common/components/CommonText';
import { isNowLoading } from 'react-native-core/features/common/redux/selectors';
import NoResult from '_features/common/components/NoResult';
import Trans from '_features/common/containers/Trans';
import HeaderTitle from '_features/common/components/HeaderTitle';
import { getCompanyHoliday } from '../redux/actions';
import { companyHolidayGroupWithMonth } from '../redux/selectors';

class HolidayScreen extends React.Component {
    componentDidMount() {
        this.props.getCompanyHolidays.request();
    }

    _renderHolidayList = (dataArr, month) => {
        const dayCount = dataArr.length;
        return (
            <Card key={month} withSpace>
                <CardItem header>
                    <CommonText
                        bold
                        text={moment(dataArr[0].date).format('MMMM YYYY')}
                        style={styles.headerTitle}
                    />
                </CardItem>
                <CardItem padderHorizontal style={styles.cardItem}>
                    {dataArr.map((item, inx) => {
                        const incomingIn = Math.floor(moment.duration(moment(item.date).diff(moment(new Date()))).asDays());

                        let incomingText = `${Trans.tran('holiday.coming_soon')} ${incomingIn} ${Trans.tran('general.unit.day')}`;
                        if (0 === incomingIn) {
                            incomingText = Trans.tran('holiday.today');
                        } else if (0 > incomingIn) {
                            incomingText = `${Trans.tran('holiday.holidays_passed')} ${Math.abs(incomingIn)} ${Trans.tran('general.unit.day')}`;
                        }

                        return (
                            <View full key={item.date} style={[styles.viewStyleDay, dayCount - 1 === inx ? styles.viewStyleDayLast : undefined]}>
                                <View style={styles.iconOuterContainer}>
                                    <View style={styles.iconContainer}>
                                        <CommonText
                                            bold
                                            text={moment(item.date).format('D')}
                                            color={themeVariables.primary}
                                        />
                                    </View>
                                </View>
                                <View style={s.flx_i}>
                                    <CommonText
                                        bold
                                        text={item.name}
                                        style={s.pr3}
                                    />
                                    <CommonText
                                        text={incomingText}
                                        style={styles.textDayStatus}
                                    />
                                </View>
                            </View>
                        )
                    })}
                </CardItem>
            </Card>
        );
    };

    render() {
        if (this.props.isNowLoading) {
            return <View />;
        }

        return (
            <Container withBackground iPhoneXSupport>
                <Content>
                    {
                        this.props.companyHolidays ?
                            <View fill padder>
                                {Object.keys(this.props.companyHolidays).map((month) => this._renderHolidayList(this.props.companyHolidays[month], month))}
                            </View>
                            : <NoResult />
                    }
                </Content>
            </Container>
        )
    }
}

HolidayScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

HolidayScreen.navigationOptions = () => ({
    headerTitle: <HeaderTitle text={'holiday.title'} />
});

const styles = StyleSheet.create({
    headerTitle: {
        padding: themeVariables.sp2,
        color: themeVariables.white
    },
    cardItem: {
        flexDirection: 'column'
    },
    viewStyleHeaderDate: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: themeVariables.sp2,
        backgroundColor: themeVariables.primary,
    },
    viewStyleDay: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: themeVariables.sp2,
        borderBottomColor: themeVariables.gray
    },
    viewStyleDayLast: {
        borderBottomWidth: 0,
    },
    iconContainer: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        backgroundColor: themeVariables.white,
    },
    iconOuterContainer: {
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        backgroundColor: themeVariables.primary,
        marginRight: themeVariables.contentPadding,
    },
});

export default connect(
    (state) => ({
        companyHolidays: companyHolidayGroupWithMonth(state),
        isNowLoading: isNowLoading(state)
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        getCompanyHolidays: bindActionCreators(getCompanyHoliday, dispatch)
    })
)(HolidayScreen);
