import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { List } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import moment from '_utils/moment';
import Trans from '_features/common/containers/Trans';
import CommonText from '_features/common/components/CommonText';

const ListTakeLeave = (props) => {
    return(
        <View>
            <View style={styles.viewHeaderList}>
                <View>
                    <CommonText
                        text={moment(props.date).format('DD MMMM YYYY')}
                        weight={'bold'}
                        color={themeVariables.white}
                        size={26}
                    />
                    <CommonText
                        text={`${moment(props.date).format('dddd')} ${Trans.tran('take_leave_list.day_status.work_day')}`}
                        color={themeVariables.white}
                        style={styles.subTitle}
                    />
                </View>
            </View>
            <List style={styles.viewList}>
                <View style={styles.viewIcon}>
                    <IconFontAwesome name={props.iconName} size={30} color={'#A4A4A6'} />
                </View>
                <View style={s.ml3}>
                    <Trans t={'take_leave_list.start_working'} weight={'bold'} color={themeVariables.black} size={22} />
                    <View style={styles.textInBox}>
                        <IconFontAwesome style={s.mr3} name={"clock-o"} size={20} />
                        <CommonText
                            text={`${props.dateTimesGetOut} ${props.dateTimeOut} ${Trans.tran('general.unit.min_short')}`}
                            weight={'bold'}
                            color={'#000'}
                            size={22}
                        />
                    </View>
                    <View style={styles.textInBox}>
                        <IconFontAwesome style={styles.iconMapMarker} name={"map-marker"} size={20} />
                        <CommonText text={props.companyCheckIn} />
                    </View>
                </View>
            </List>
            <List style={styles.viewList}>
                <View style={styles.viewIcon}>
                    <IconFontAwesome name={props.iconName} size={30} color={'#A4A4A6'} />
                </View>
                <View style={s.ml3}>
                    <Trans t={'take_leave_list.leave_work'} weight={'bold'} color={themeVariables.black} />
                    <View style={styles.textInBox}>
                        <IconFontAwesome style={s.mr3} name={"clock-o"} size={20} />
                        <CommonText
                            text={props.dateTimesIn + Trans.tran('take_leave_list.time_unit')}
                            weight={'bold'}
                            color={themeVariables.black}
                            style={s.asfs}
                        />
                    </View>
                    <View style={styles.textInBox}>
                        <IconFontAwesome style={styles.iconMapMarker} name={"map-marker"} size={20} />
                        <CommonText text={props.companyCheckOut} style={s.asfs} />
                    </View>
                </View>
            </List>
        </View>
    );
};

ListTakeLeave.propTypes = {
    data: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    companyCheckOut: PropTypes.string.isRequired,
    dateTimesGetOut: PropTypes.string.isRequired,
    companyCheckIn: PropTypes.string.isRequired,
    dateTimesIn: PropTypes.string.isRequired,
    iconName: PropTypes.string,
    dateTimeOut: PropTypes.string
};

ListTakeLeave.defaultProps = {
    iconName: 'location-arrow', //'qrcode'
    dateTimeOut: ''
};

const styles = StyleSheet.create({
    viewHeaderList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A4A4A6',
        marginTop: 5
    },
    textInBox: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: -3
    },
    viewList: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginHorizontal: 5,
        marginTop: 3,
        borderWidth: 1,
        borderColor: '#d3d3d5'
    },
    viewIcon: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#A4A4A6',
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconTop: {
        position: 'absolute',
        alignItems: 'center',
        left: 16,
        backgroundColor: '#d3d3d5'
    },
    iconMapMarker: {
        top: 3,
        alignSelf: 'flex-start',
        marginRight: 15,
        marginLeft: 2
    },
    subTitle: {
        marginTop: -5,
        alignSelf: 'center'
    }
});

export default ListTakeLeave;
