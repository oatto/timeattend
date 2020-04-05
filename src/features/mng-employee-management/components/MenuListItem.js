/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Body, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';
import { CardAngleRightIcon } from '_features/common/components/icons/AppIcons';

class MenuListItem extends React.PureComponent {
    render() {
        const { title, icon } = this.props.data;

        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.listView}>
                <Left listItem>
                    <Icon name={icon} style={styles.listItemIcon} />
                </Left>
                <Body sidebar>
                    <Trans bold t={`${title}`} />
                </Body>
                <Right listItem>
                    <CardAngleRightIcon color={themeVariables.primary} />
                </Right>
            </TouchableOpacity>
        )
    }
}

MenuListItem.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
};

MenuListItem.defaultProps = {};

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: themeVariables.white,
        paddingVertical: themeVariables.sp2,
        borderBottomWidth: themeVariables.borderWidth,
        borderBottomColor: themeVariables.grayLighter,
    },
    listItemIcon: {
        width: 35,
        color: themeVariables.primary,
        fontSize: themeVariables.fs4,
        textAlign: 'center',
    },
});

export default MenuListItem;
