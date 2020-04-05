import React from 'react';
import PropTypes from 'prop-types';
import ref from 'react-native-core/utils/ref';
import { Thumbnail, Body, View, Card, CardItem, Right, Icon } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import { CheckIcon } from "_features/common/components/icons/AppIcons";

const MngEmployeeHeaderDetail = (props) => {
    const employee = props.data;
    const departmentId = ref(employee, 'department.id');
    const departmentName = ref(employee, 'department.name');
    const firstName = ref(employee, 'first_name');
    const lastName = ref(employee, 'last_name');

    let imageSource;
    const gender = employee.gender;

    if (ref(employee, '_links.image.href')) {
        imageSource = { uri : employee._links.image.href };
    } else {
        imageSource = gender === 'f'
            ? require('_public/images/user/mng-user-girl-default.png')
            : require('_public/images/user/mng-user-default.png')
    }

    return (
        <Card withSpace>
            <CardItem padder style={s.flx_i} button onPress={props.onPress}>
                <Body>
                    <View style={s.flx_row}>
                        <Thumbnail source={imageSource} />
                        <View style={[s.pl3, s.flx_i]}>
                            <CommonText
                                bold
                                text={`${firstName} ${lastName}`}
                                color={themeVariables.primary}
                            />
                            <View style={s.flx_row}>
                                <CommonText
                                    text={departmentId}
                                    style={s.mr2}
                                />
                                <CommonText
                                    text={departmentName}
                                />
                            </View>
                        </View>
                    </View>
                </Body>
                {props.active ?
                    <Right>
                        <CheckIcon color={themeVariables.success} size={themeVariables.ifs5} />
                    </Right>
                    :
                    <Right>
                        <Icon name="arrow-forward" color={themeVariables.textColor} />
                    </Right>
                }
            </CardItem>
        </Card>
    )
};

MngEmployeeHeaderDetail.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    active: PropTypes.bool
};

MngEmployeeHeaderDetail.defaultProps = {
    onPress: null,
    active: false
};

export default MngEmployeeHeaderDetail;
