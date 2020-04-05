/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet } from 'react-native';
import { Card, CardItem, Body, Container, Content } from 'native-base';
import Trans from '_features/common/containers/Trans';
import themeVariables from '_theme';
import { monthlyStatsInfo } from "_features/check-time/screen/tab/_monthlySummary";
import { MonthlyFilterForm2, NAME } from '_features/check-time/forms/MonthlyFilterForm';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import moment from '_utils/moment';
import ref from 'react-native-core/utils/ref';
import CommonText from "_features/common/components/CommonText";
import Hr from "_features/common/components/Hr";
import { getMngEmCheckTimeHistory } from '../../redux/actions';
import { mngEmCheckTimeHistoryStats } from '../../redux/selectors';

class _mngEmMonthlySummary extends React.PureComponent {
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

        this.props.getMngEmCheckTimeHistory.request({
            employeeId: this.props.employee.id,
            year: this.props.year,
            month: this.props.month
        });
    }

    _renderStat(label, statKey) {
        const data = ref(this.props.mngEmCheckTimeHistoryStats, statKey);

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
                                    this.props.getMngEmCheckTimeHistory.request({
                                        employeeId: this.props.employee.id,
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
                <Content>
                    <Card>
                        <CardItem padder>
                            <Body>
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

_mngEmMonthlySummary.propTypes = {
    employee: PropTypes.object.isRequired,
    month: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    year: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired
};

const styles = StyleSheet.create({
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
        mngEmCheckTimeHistoryStats: mngEmCheckTimeHistoryStats(state),
    }),
    (dispatch) => ({
        getMngEmCheckTimeHistory: bindActionCreators(getMngEmCheckTimeHistory, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(_mngEmMonthlySummary);
