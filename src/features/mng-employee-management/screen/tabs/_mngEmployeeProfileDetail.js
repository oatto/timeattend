/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardItem, Body, Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import Trans from '_features/common/containers/Trans';
import CommonText from '_features/common/components/CommonText';
import EmployeeInfo from '_features/user/components/EmployeeInfo';
import Managers from '_features/mng-core/containers/Managers';

class _mngEmployeeProfileDetail extends React.PureComponent {
    render() {
        return (
            <Container>
                <Content>
                    <EmployeeInfo employee={this.props.employee} />
                    <Card withSpace>
                        <CardItem padder>
                            <Body>
                                <CommonText
                                    bold
                                    text={Trans.tran('take_leave_list.user_manager')}
                                />
                                <Managers employeeId={this.props.employee.id} />
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

_mngEmployeeProfileDetail.propTypes = {
    employee: PropTypes.object.isRequired
};

export default _mngEmployeeProfileDetail;
