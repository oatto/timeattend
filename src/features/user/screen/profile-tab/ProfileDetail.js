/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import PropTypes from 'prop-types';
import CommonText from '_features/common/components/CommonText';
import Trans from '_features/common/containers/Trans';
import Managers from '../../containers/Managers';
import EmployeeInfo from "../../components/EmployeeInfo";

class ProfileDetail extends React.PureComponent {
    render() {
        const { data } = this.props;

        return (
            <Container>
                <Content>
                    <EmployeeInfo employee={data} />

                    <Card withSpace>
                        <CardItem padder column>
                            <Body>
                                <CommonText
                                    bold
                                    text={Trans.tran('take_leave_list.user_manager')}
                                />
                                <Managers />
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

ProfileDetail.propTypes = {
    data: PropTypes.object
};

ProfileDetail.defaultProps = {
    data: {}
};

export default ProfileDetail;
