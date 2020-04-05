/* eslint-disable react/prop-types */
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Body, Card, CardItem, View } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { FlatList } from 'react-native';
import CheckInList from '_features/check-time/components/CheckInList';
import { getCheckTimeHistory as getCheckTimeHistoryActions } from '_features/check-time/redux/actions';
import MonthlyFilterForm, { NAME } from '_features/check-time/forms/MonthlyFilterForm';
import { getCheckTimeHistoryExcludeFuture } from '_features/check-time/redux/selectors';
import { resetMonthlyFilterForm } from "_features/common/redux/actions";
import NoResult from "_features/common/components/NoResult";
import themeVariables from "_theme";
import { CHECK_TIME_ADJUSTMENT_EDIT } from '../../router';

class CheckInTimeListTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this._onReload = this._onReload.bind(this);
    }

    componentDidMount() {
        this.props.resetForm(NAME);

        const d = new Date();

        this.props.getCheckTimeHistory.request({
            year: d.getFullYear(),
            month: d.getMonth() + 1,
        });
    }

    _onReload() {
        const d = new Date();

        this.props.getCheckTimeHistory.request({
            year: d.getFullYear(),
            month: d.getMonth() + 1,
        });
    }

    _renderItem = ({item}) => {
        return (
            <Card withSpace>
                <CardItem>
                    <CheckInList
                        data={item}
                        onPress={() => {
                            this.props.navigationActions.navigate({
                                routeName: CHECK_TIME_ADJUSTMENT_EDIT,
                                params: { item }
                            })
                        }}
                    />
                </CardItem>
            </Card>
        )
    };

    render() {
        const d = new Date();
        const month = d.getMonth() + 1;
        const initialValues = {
            year: d.getFullYear().toString(),
            month: month > 9 ? month.toString() : '0' + month.toString(),
        };

        return (
            <View fill>
                <Card style={themeVariables.globalStyle.flex0} withSpace>
                    <CardItem padderSm>
                        <Body>
                            <MonthlyFilterForm
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    this.props.getCheckTimeHistory.request({
                                        year: values.year,
                                        month: values.month,
                                    });
                                }}
                            />
                        </Body>
                    </CardItem>
                </Card>
                <View fill>
                    {!isEmpty(this.props.checkTimeHistory)
                        ? <FlatList
                            data={this.props.checkTimeHistory}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        : <NoResult onReload={this._onReload} />
                    }
                </View>
            </View>
        )
    }
}

export default connect(
    (state) => ({
        checkTimeHistory: getCheckTimeHistoryExcludeFuture(state)
    }),
    (dispatch) => ({
        getCheckTimeHistory: bindActionCreators(getCheckTimeHistoryActions, dispatch),
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch)
    })
)(CheckInTimeListTab);
