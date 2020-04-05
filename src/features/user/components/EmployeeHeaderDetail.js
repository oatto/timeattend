import React from 'react';
import PropTypes from 'prop-types';
import ref from 'react-native-core/utils/ref';
import { Thumbnail, Body, View, Card, CardItem, Right, Icon } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import { NewReleasesIcon } from '_features/common/components/icons/AppIcons';
import moment from '_utils/moment';
import Trans from "../../common/containers/Trans";

const EmployeeHeaderDetail = (props) => {
    const employee = props.data.manager;
    const message = props.data.message;
    const sendAt = props.data.created_at;
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
                        { !props.managerDisplay && <Thumbnail source={imageSource} />}
                        <View style={[s.pl3, s.flx_i]}>
                            { !props.managerDisplay &&
                                <View style={s.flx_row}>
                                    <CommonText
                                        bold
                                        text={Trans.tran('user.profile.sender')}
                                        color={themeVariables.textColor}
                                    />
                                    <CommonText
                                        bold
                                        text={`${firstName} ${lastName}`}
                                        color={themeVariables.primary}
                                    />
                                    {props.dataLatest &&
                                        <View style={s.ml1}>
                                            <NewReleasesIcon size={themeVariables.ifs4} color={themeVariables.primary} />
                                        </View>
                                    }
                                </View>
                            }
                            <View style={s.flx_row}>
                                <CommonText
                                    text={Trans.tran('user.profile.message')}
                                />
                                <CommonText
                                    text={message.length < 20 ? message : message.substr(0, 20) + ' ...'}
                                />
                            </View>
                            <View style={s.flx_row}>
                                <CommonText
                                    text={Trans.tran('user.profile.send_at')}
                                />
                                <CommonText
                                    text={moment(sendAt).format('LLL')}
                                />
                            </View>
                        </View>
                    </View>
                </Body>
                <Right>
                    <Icon name="arrow-forward" color={themeVariables.textColor} />
                </Right>
            </CardItem>
        </Card>
    )
};

EmployeeHeaderDetail.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    active: PropTypes.bool,
    managerDisplay: PropTypes.bool,
    dataLatest: PropTypes.bool
};

EmployeeHeaderDetail.defaultProps = {
    onPress: null,
    active: false,
    managerDisplay: false,
    dataLatest: false
};

export default EmployeeHeaderDetail;
