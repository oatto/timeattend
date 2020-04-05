import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import ref from 'react-native-core/utils/ref';
import { styles as s } from 'react-native-style-tachyons';
import CommonText from "_features/common/components/CommonText";
import { ListItem, Body, View } from 'native-base';
import themeVariables from '_theme';

const MngManagersInfo = ({employee}) => {
    const departmentName = ref(employee, 'department.name') ? '(' + employee.department.name + ')' : '';

    return (
        <ListItem style={styles.listItemContainer}>
            <View style={s.flx_row}>
                <CommonText
                    text={employee.full_name}
                />
                <CommonText
                    style={s.ml2}
                    text={departmentName}
                />
            </View>
        </ListItem>
    );
};

MngManagersInfo.propTypes = {
    employee: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    listItemContainer: {
        borderBottomWidth: themeVariables.sp0
    }
});

export default MngManagersInfo;
