import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { Icon, Left, Right, Thumbnail, Body, Card, CardItem } from 'native-base';
import { NewReleasesIcon } from '_features/common/components/icons/AppIcons';
import { styles as s } from 'react-native-style-tachyons';
import ref from 'react-native-core/utils/ref';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';

const MobileAccessList = (props) => {
    const { employee, mobile_device } = props.data;
    let imageSource;
    if (ref(employee, '_links.image.href')) {
        imageSource = { uri : employee._links.image.href };
    } else {
        imageSource = employee.gender === 'f'
            ? require('_public/images/user/mng-user-girl-default.png')
            : require('_public/images/user/mng-user-default.png')
    }

    return (
        <Card withSpace>
            <CardItem padder button onPress={props.onPress}>
                <Left lowSpacing style={styles.left}>
                    <Thumbnail source={imageSource} />
                </Left>
                <Body>
                    <View style={s.flx_row}>
                        <CommonText
                            text={`${employee.full_name}`}
                        />
                        {props.dataChangeLatest &&
                            <View style={s.ml1}>
                                <NewReleasesIcon size={themeVariables.ifs4} color={themeVariables.primary} />
                            </View>
                        }
                    </View>
                    <CommonText
                        text={`${mobile_device.model} (${mobile_device.platform})`}
                    />
                </Body>
                <Right style={styles.rightContainer}>
                    <Icon active name="arrow-forward" style={s.primary} />
                </Right>
            </CardItem>
        </Card>
    )
};

MobileAccessList.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    dataChangeLatest: PropTypes.bool
};

MobileAccessList.defaultProps = {
    onPress: null,
    dataChangeLatest: false
};

const styles = StyleSheet.create({
    left: {
        flexBasis: 75,
        flexGrow: 0,
        alignSelf: 'flex-start'
    }
});

export default MobileAccessList;
