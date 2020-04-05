/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Card, CardItem, Body, View } from 'native-base';
import InfinityScrollList from 'react-native-core/features/common/components/InfinityScrollList';
import themeVariables from '_theme';
import HeaderTitle from '_features/common/components/HeaderTitle';
import MonthlyFilterForm, { NAME } from '_features/check-time/forms/MonthlyFilterForm';
import NoResult from '_features/common/components/NoResult';
import Trans from '_features/common/containers/Trans';
import EmployeeHeaderDetail from '_features/user/components/EmployeeHeaderDetail';
import HeaderMainDataUser from '_features/common/components/HeaderMainDataUser';
import MngModal from '_features/mng-core/components/MngModal';
import ModalMessageDetail from '_features/user/components/ModalMessageDetail';
import { resetMonthlyFilterForm } from '_features/common/redux/actions';
import { mngEmGetInboxMessage } from '_features/mng-employee-management/redux/actions';
import { mngCurrentActiveEmployee, mngEmInboxMessage } from '../redux/selectors';

class MngEmInboxMessage extends React.PureComponent {
    constructor(props) {
        super(props);
        const d = new Date();
        const month = d.getMonth() + 1;

        this.state = {
            modalVisible: false,
            activeData: {},
            monthlyFilter: {
                year: d.getFullYear(),
                month: month > 9 ? month.toString() : '0' + month.toString(),
            }
        };

        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.resetForm(NAME);

        this.props.mngEmGetInboxMessage.request({
            employeeId: this.props.mngCurrentActiveEmployee.id,
            monthlyFilter: this.state.monthlyFilter
        });
    }

    _renderItem = ({item}) => {
        return (
            <View padderHorizontal>
                <EmployeeHeaderDetail
                    managerDisplay
                    data={item}
                    onPress={() => {
                        this.setState({
                            modalVisible: true,
                            activeData: item
                        });
                    }}
                />
            </View>
        )
    };

    _onRefresh() {
        this.props.mngEmGetInboxMessage.request({
            employeeId: this.props.mngCurrentActiveEmployee.id,
            monthlyFilter: this.state.monthlyFilter
        })
    }

    render() {
        const { data, isRefreshing, isLoadingMore, isLoading, pagination } = this.props.mngEmInboxMessage;
        const d = new Date();
        const month = d.getMonth() + 1;
        const initialValues = {
            year: d.getFullYear().toString(),
            month: month > 9 ? month.toString() : '0' + month.toString(),
        };

        return (
            <Container withBackground>
                <HeaderMainDataUser user={this.props.mngCurrentActiveEmployee} showTime={false} />

                <View padder>
                    <Card style={themeVariables.globalStyle.flex0} withSpace>
                        <CardItem padderSm>
                            <Body>
                                <MonthlyFilterForm
                                    initialValues={initialValues}
                                    onSubmit={(values) => {
                                        this.props.mngEmGetInboxMessage.request({
                                            employeeId: this.props.mngCurrentActiveEmployee.id,
                                            monthlyFilter: values
                                        });

                                        this.setState({
                                            monthlyFilter: values
                                        })
                                    }}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                </View>

                {isLoading
                    ? null :
                    data.length ?
                        <InfinityScrollList
                            data={data}
                            loadingMore={isLoadingMore}
                            refreshing={isRefreshing}
                            renderItem={this._renderItem}
                            onRefresh={this._onRefresh}
                            onLoadMore={() => {
                                if (!pagination.hasNextPage) {
                                    return;
                                }

                                this.props.mngEmGetInboxMessage.loadmore({
                                    employeeId: this.props.mngCurrentActiveEmployee.id,
                                    monthlyFilter: this.state.monthlyFilter
                                });
                            }}
                        /> : <NoResult onReload={this._onRefresh} />
                }

                <MngModal
                    isVisible={this.state.modalVisible}
                    title={Trans.tran('user.profile.message_title')}
                    onClosePress={() => this.setState({modalVisible: false})}
                    modalProps={{
                        animationType: 'none'
                    }}
                >
                    <ModalMessageDetail data={this.state.activeData} />
                </MngModal>
            </Container>
        )
    }
}

MngEmInboxMessage.navigationOptions = {
    headerTitle: <HeaderTitle text={'mng.menus.send_message_history'} />
};

export default connect(
    (state) => ({
        mngCurrentActiveEmployee: mngCurrentActiveEmployee(state),
        mngEmInboxMessage: mngEmInboxMessage(state),
    }),
    (dispatch) => ({
        mngEmGetInboxMessage: bindActionCreators(mngEmGetInboxMessage, dispatch),
        resetForm: bindActionCreators(resetMonthlyFilterForm, dispatch),
    })
)(MngEmInboxMessage);
