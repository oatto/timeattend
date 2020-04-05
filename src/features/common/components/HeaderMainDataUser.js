import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {View, Card, CardItem, Body} from 'native-base';
import PropTypes from 'prop-types';
import ref from 'react-native-core/utils/ref';
import {styles as s} from 'react-native-style-tachyons';
import moment from '_utils/moment';
import themeVariables from '_theme';
import Trans from '_features/common/containers/Trans';
import CurrentTime from '_features/common/components/CurrentTime';
import CommonText from './CommonText';
import GradientBackground from "./GradientBackground";

class HeaderMainDataUser extends React.PureComponent {
    render() {
        const user = this.props.user;
        const departmentName = ref(user, 'department.name');
        const profileImage = ref(user, '_links');
        const firstName = ref(user, 'first_name');
        const lastName = ref(user, 'last_name');
        const employeeId = ref(user, 'employee_id');

        return (
            <View style={[styles.container]}>
                <GradientBackground
                    style={[styles.gradientContainer]}
                />
                <View padderHorizontal style={styles.cardHeader}>
                    <Card style={themeVariables.globalStyle.flex0}>
                        <CardItem padder style={styles.flx_i}>
                            <Body>
                                <View style={s.flx_row}>
                                    <Image
                                        style={styles.image}
                                        source={
                                            profileImage
                                                ? {uri: profileImage.image.href}
                                                : (user.gender === 'f'
                                                    ? require('_public/images/user/mng-user-girl-default.png')
                                                    : require('_public/images/user/mng-user-default.png')
                                                )
                                        }
                                    />
                                    <View style={[s.pl3, s.flx_i]}>
                                        <CommonText
                                            bold
                                            text={`${firstName} ${lastName}`}
                                            style={styles.headerTitle}
                                        />
                                        <View style={s.flx_row}>
                                            <CommonText
                                                text={`${employeeId} | ${departmentName}`}
                                                style={s.mr2}
                                            />
                                        </View>
                                    </View>
                                </View>
                                {this.props.showTime ?
                                    <View style={styles.viewDateTimeNow}>
                                        <CommonText
                                            bold
                                            text={Trans.tran('home.day') + moment().format('dddd DD MMMM YYYY ')}
                                            style={s.flx_i}
                                        />
                                        <CurrentTime
                                            textProps={{
                                                bold: true,
                                                size: themeVariables.fs2,
                                            }}
                                        />
                                    </View>
                                    : null
                                }
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            </View>
        )
    }
}

HeaderMainDataUser.propTypes = {
    user: PropTypes.object,
    showTime: PropTypes.bool,
};

HeaderMainDataUser.defaultProps = {
    user: {},
    showTime: true,
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 0,
    },
    gradientContainer: {
        position: 'absolute',
        width: '100%',
        height: '50%',
        top: 0,
        left: 0,
        right: 0,
    },
    cardHeader: {
        flex: 1,
        marginTop: themeVariables.sp1
    },
    headerTitle: {
        fontSize: themeVariables.fs3,
        color: themeVariables.primary
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    viewDateTimeNow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    }
});

export default HeaderMainDataUser;
