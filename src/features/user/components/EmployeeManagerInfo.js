import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import ref from 'react-native-core/utils/ref';
import { styles as s } from 'react-native-style-tachyons';
import CommonText from "_features/common/components/CommonText";
import { ListItem, Left, Thumbnail, View } from 'native-base';
import themeVariables from '_theme';

const EmployeeManagerInfo = ({employee}) => {
    const departmentName = ref(employee, 'department.name') ? ' (' + employee.department.name + ')' : '';

    let imageSource;
    if (ref(employee, '_links.image.href')) {
        imageSource = { uri : employee._links.image.href };
    } else {
        imageSource = (employee.gender === 'f'
            ? require('_public/images/user/user-girl-default.png')
            : require('_public/images/user/user-default.png')
        )
    }

    return (
        <ListItem thumbnail style={styles.listItemContainer}>
            <Left style={styles.LeftElement}>
                <Thumbnail source={imageSource} />
            </Left>
            <View style={s.flx_row}>
                <CommonText
                    text={employee.full_name}
                />
                <CommonText
                    note
                    text={departmentName}
                />
            </View>
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
        padding: themeVariables.sp2/2
    },
    LeftElement: {
        marginRight: themeVariables.sp2,
        paddingLeft: themeVariables.sp0
    },
    bodyElement: {
        marginLeft: themeVariables.sp3
    }
});

export default EmployeeManagerInfo;
