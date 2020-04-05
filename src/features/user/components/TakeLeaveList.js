import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { ListItem, Icon, Left, Right, Body, View } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';

const TakeLeaveList = (props) => {

    const item = props.data;
    const isPersonalLeave = item.type_code === 'personal-leave';
    const isSickLeave = item.type_code === 'sick-leave';
    const isHolidayLeave = item.type_code === 'holiday-leave';
    const isMaternityLeave = item.type_code === 'maternity-leave';
    const isSoilderLeave = item.type_code === 'soilder-leave';
    const isVaccinationLeave = item.type_code === 'vaccination-leave';

    function getTypeOfTakeLeave() {
        if (isPersonalLeave) return 'briefcase';
        else if (isSickLeave) return 'thermometer-empty';
        else if (isHolidayLeave) return 'plane';
        else if (isMaternityLeave || isVaccinationLeave) return 'bed';
        else if (isSoilderLeave) return 'trophy';

        return 'info';
    }

    return (
        <ListItem thumbnail onPress={props.onPress} style={styles.container}>
            <Left>
                <View style={styles.iconOuterContainer}>
                    <View style={styles.iconContainer}>
                        <IconFontAwesome
                            style={[{color: themeVariables.primary}]}
                            name={getTypeOfTakeLeave()}
                            size={themeVariables.ifs5}
                        />
                    </View>
                </View>
            </Left>
            <Body>
                <CommonText text={item.type_name} />
            </Body>
            <Right>
                <Icon active name="arrow-forward" />
            </Right>
        </ListItem>
    )
};

TakeLeaveList.propTypes = {
    onPress: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    iconContainer: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: themeVariables.white,
    },
    iconOuterContainer: {
        height: 53,
        width: 53,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 26.5,
        backgroundColor: themeVariables.primary,
    },
});

export default TakeLeaveList;
