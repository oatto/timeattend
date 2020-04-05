/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet } from 'react-native';
import { Container, Card, CardItem, Body, Content } from 'native-base';
import Trans from '_features/common/containers/Trans';
import themeVariables from '_theme';
import moment from '_utils/moment';
import { MonthlyFilterForm2, NAME } from '_features/check-time/forms/MonthlyFilterForm';
import ref from 'react-native-core/utils/ref';
import CommonText from "_features/common/components/CommonText";
import Hr from "_features/common/components/Hr";
import { userProfile } from '_features/user/redux/selectors';
import { getCheckTimeHistoryStats } from '_features/check-time/redux/selectors';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import { getCheckTimeHistory as getCheckTimeHistoryActions, } from '../../redux/actions'

export const monthlyStatsInfo = [
    {
        label: 'check_time.history.titleTab.title_monthly_Summary.form.work_days',
        statKey: 'workDays'
    },
    {
        label: 'check_time.history.titleTab.title_monthly_Summary.form.holidays',
        statKey: 'holidays'
    },
    {
        label: 'check_time.history.titleTab.title_monthly_Summary.form.really_work_days',
        statKey: 'reallyWorkDays'
    },
    {
        label: 'check_time.history.titleTab.title_monthly_Summary.form.slowly_working',
        statKey: 'late'
    },
    {
        label: 'check_time.history.titleTab.title_monthly_Summary.form.count_absence',
        statKey: 'absent'
    },
    {
        label: 'check_time.history.titleTab.title_monthly_Summary.form.take_leave',
        statKey: 'takeLeaves'
    },
];

class monthlySummaryTab extends React.PureComponent {
    constructor(props) {
        super(props);
        const d = new Date();
        const month = d.getMonth() + 1;

        this.state = {
            activeYear: d.getFullYear(),
            activeMonth: month > 9 ? month.toString() : '0' + month.toString(),
        };
    }

    componentDidMount() {
        this.props.resetForm(`${NAME}2`);

        this.props.getCheckTimeHistory.request({
            year: this.props.year,
            month: this.props.month
        });
    }

    _renderStat(label, statKey) {
        const data = ref(this.props.stats, statKey);

        return (
            <View style={styles.viewHorizontal} key={statKey}>
                <View style={styles.viewCommonTextTitle}>
                    <Trans t={label} />
                </View>
                <View style={styles.viewCommonTextData}>
                    <CommonText text={data ? `${data} ${Trans.tran('general.unit.day')}` : ' - '} />
                </View>
            </View>
        );
    }

    _renderInformation(label, text) {
        return (
            <View style={styles.viewHorizontal} key={label}>
                <View style={styles.viewCommonTextTitle}>
                    <Trans bold t={label} />
                </View>
                <View style={styles.viewCommonTextData}>
                    <CommonText bold text={text} />
                </View>
            </View>
        );
    }

    render() {
        const user = this.props.userProfile;
        const d = new Date();
        const month = d.getMonth() + 1;
        const initialValues = {
            year: d.getFullYear().toString(),
            month: month > 9 ? month.toString() : '0' + month.toString(),
        };

        return (
            <Container withBackground>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm2
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    this.props.getCheckTimeHistory.request({
                                        year: values.year,
                                        month: values.month,
                                    });

                                    this.setState({
                                        activeYear: values.year,
                                        activeMonth: values.month
                                    })
                                }}
                            />
                        </Body>
                    </CardItem>
                </Card>
                <Content contentContainerStyle={styles.container}>
                    <Card>
                        <CardItem padder>
                            <Body>
                                {this._renderInformation('check_time.history.titleTab.title_monthly_Summary.form.check_time', moment(user.check_in_time).format('HH:mm'))}
                                {this._renderInformation('check_time.history.titleTab.title_monthly_Summary.form.monthly', moment(`${this.state.activeYear}-${this.state.activeMonth}-01`).format('MMMM YYYY'))}

                                <Hr />

                                {monthlyStatsInfo.map(({label, statKey}) => {
                                    return this._renderStat(label, statKey)
                                })}
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>

        );
    }
}

monthlySummaryTab.propTypes = {
    month: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    year: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    viewHorizontal: {
        marginTop: themeVariables.sp1,
        marginRight: themeVariables.sp3,
        flexDirection: 'row'
    },
    viewCommonTextTitle: {
        width: '50%',
        marginLeft: themeVariables.sp2
    },
    viewCommonTextData: {
        flex: 1
    },
    viewLine: {
        marginVertical: themeVariables.sp2,
        borderBottomWidth: 0.50
    },
});

export default connect(
    (state) => ({
        userProfile: userProfile(state),
        stats: getCheckTimeHistoryStats(state),
    }),
    (dispatch) => ({
        getCheckTimeHistory: bindActionCreators(getCheckTimeHistoryActions, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch)
    })
)(monthlySummaryTab);
