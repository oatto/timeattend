import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import ref from 'react-native-core/utils/ref';
import { styles as s } from 'react-native-style-tachyons';
import CommonText from "_features/common/components/CommonText";
import { ListItem, Left, Thumbnail, Body } from 'native-base';
import themeVariables from '_theme';

const EmployeeManagerInfo = ({employee}) => {
    const departmentName = ref(employee, 'department.name') ? '(' + employee.department.name + ')' : '';

    let imageSource;
    if (ref(employee, '_links.image.href')) {
        imageSource = { uri : employee._links.image.href };
    } else {
        imageSource = (employee.gender === 'f'
            ? require('_public/images/user/mng-user-girl-default.png')
            : require('_public/images/user/mng-user-default.png')
        )
    }

    return (
        <ListItem thumbnail style={styles.listItemContainer}>
            <Left style={styles.LeftElement}>
                <Thumbnail source={imageSource} />
            </Left>
            <Body>
                <CommonText
                    text={employee.full_name}
                />
                <CommonText
                    note
                    text={departmentName}
                />
            </Body>
            {/*<Right>*/}
                {/*<Button transparent>*/}
                    {/*<Text>View</Text>*/}
                {/*</Button>*/}
            {/*</Right>*/}
        </ListItem>
    );
};

EmployeeManagerInfo.propTypes = {
    employee: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    listItemContainer: {
        padding: themeVariables.sp2
    },
    LeftElement: {
        marginHorizontal: themeVariables.sp3/1.4
    },
    bodyElement: {
        marginLeft: themeVariables.sp3
    }
});

export default EmployeeManagerInfo;
