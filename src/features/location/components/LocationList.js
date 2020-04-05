import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { ListItem, Icon, Left, Right, Thumbnail, Body, Badge } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import Trans from "_features/common/containers/Trans";

const LocationList = (props) => {
    return (
        <ListItem thumbnail onPress={props.onPress} style={styles.container}>
            <Left>
                <Thumbnail source={props.source} />
            </Left>
            <Body>
                <CommonText
                    bold
                    text={props.title}
                />
                <Badge primary>
                    <CommonText
                        text={props.numberOfTime}
                        style={styles.badgeText}
                    />
                </Badge>

                { props.user && (
                    <CommonText
                        text={props.user}
                        size={themeVariables.fs6}
                        style={s.mt1}
                    />
                )}

            </Body>
            <Right>
                <Icon active name="arrow-forward" />
            </Right>
        </ListItem>
    )
};

LocationList.propTypes = {
    onPress: PropTypes.func.isRequired,
    source: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number
    ]),
    title: PropTypes.string.isRequired,
    numberOfTime: PropTypes.number.isRequired,
    user: PropTypes.string,
};

LocationList.defaultProps = {
    source: {},
    user: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    badgeText: {
        color: themeVariables.white,
        fontSize: themeVariables.fs5 * 0.75
    }
});

export default LocationList;
