import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import { Body, Card, CardItem, View } from 'native-base';
import ref from 'react-native-core/utils/ref';
import { styles as s } from 'react-native-style-tachyons';
import CommonText from "_features/common/components/CommonText";
import ColumnList from "_features/common/components/ColumnList";
import Hr from "_features/common/components/Hr";
import Trans from '_features/common/containers/Trans';
import moment from '_utils/moment';

const EmployeeInfo = (props) => {
    const data = props.employee;
    const position = ref(data, 'department.name');
    const dayKeys = {
        1: Trans.tran('general.day.sunday'),
        2: Trans.tran('general.day.monday'),
        3: Trans.tran('general.day.tuesday'),
        4: Trans.tran('general.day.wednesday'),
        5: Trans.tran('general.day.thursday'),
        6: Trans.tran('general.day.friday'),
        7: Trans.tran('general.day.saturday')
    };

    let weekend = ref(data, 'weekend');

    if (isArray(weekend)) {
        weekend = data.weekend.map(function(dayKey) {
            return dayKeys[dayKey] ? dayKeys[dayKey] : '';
        }).join(", ");
    } else if (isObject(weekend)) {
        weekend = Object.values(weekend).map(function (value, key) {
            return dayKeys[value] ? dayKeys[value] : '';
        }).join(", ");
    }

    return (
        <View>
            <Card withSpace>
                <CardItem padder column>
                    <Body>
                        <ColumnList
                            label="user.profile_tab_detail.name"
                            data={`${data.first_name} ${data.last_name}`}
                        />
                        <ColumnList
                            label="user.profile_tab_detail.employee_id"
                            data={data.employee_id}
                        />
                        <ColumnList
                            label="user.profile_tab_detail.identity_id"
                            data={data.identity_id}
                        />
                        <ColumnList
                            label="user.profile_tab_detail.birth_date"
                            data={data.birth_date ? moment(data.birth_date).format('ll') : '-'}
                        />
                        <ColumnList
                            label="user.profile_tab_detail.gender"
                            data={data.gender === 'm' ? Trans.tran('general.gender.male') :
                                data.gender === 'f' ? Trans.tran('general.gender.female') :
                                    Trans.tran('general.gender.unknown')}
                        />
                        <ColumnList
                            label="user.profile_tab_detail.email"
                            data={data.email}
                        />
                        <ColumnList
                            label="user.profile_tab_detail.phone_number"
                            data={data.mobile_phone}
                        />
                        <ColumnList
                            label="user.profile_tab_detail.line_id"
                            data={data.line_id ? data.line_id : '-'}
                        />
                    </Body>

                    <Hr />
                    <View>
                        <View padderHorizontal>
                            <CommonText
                                bold
                                text={Trans.tran('user.profile_tab_detail.title_detail')}
                                style={s.asfs}
                            />
                        </View>
                        <ColumnList
                            label="user.profile_tab_detail.position"
                            data={position}
                        />
                        <ColumnList
                            label="user.profile_tab_detail.check_in"
                            data={moment(data.check_in_time).format('HH:mm')}
                        />
                        <ColumnList
                            label="user.profile_tab_detail.working"
                            data={`${data.work_hours} ${Trans.tran('user.profile_tab_detail.hour_day')}`}
                        />
                        <ColumnList
                            label="general.work_type.holiday"
                            data={weekend ? weekend : 'กรุณาบันทึกข้อมูลวันลาที่ระบบหลังบ้านก่อน'}
                            dataElementStyle={s.pr2}
                        />
                    </View>
                </CardItem>
            </Card>
        </View>
    );
};

EmployeeInfo.propTypes = {
    employee: PropTypes.object.isRequired,
};

export default EmployeeInfo;
