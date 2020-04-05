import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import {styles as s} from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import Hr from '_features/common/components/Hr';
import { CardAngleRightIcon, NewReleasesIcon } from '_features/common/components/icons/AppIcons';

const CheckInListHeader = (props) => {
    return (
        <View padder style={[styles.header, s.aic]}>
            <View fill style={s.flx_warp}>
                <View style={[s.flx_row, props.employeeName ? s.jcsb : s.jcfe]}>
                    {/* FOR ANDROID We need to return null */}
                    {props.employeeName ?
                        <CommonText
                            bold
                            text={props.employeeName}
                            color={themeVariables.white}
                        />
                        : null
                    }
                    <View style={props.dataChangeLatest ? s.flx_row : undefined}>
                        {props.state ?
                            <CommonText
                                bold
                                text={props.state}
                                color={themeVariables.white}
                                style={s.tr}
                            />
                            : null
                        }
                        {props.dataChangeLatest &&
                        <View style={s.ml1}>
                            <NewReleasesIcon size={themeVariables.ifs4} />
                        </View>
                        }
                    </View>
                </View>
                {(props.employeeName || props.state) ? <Hr /> : null}
                <View style={[s.flx_row, s.jcsb]}>
                    {props.date ?
                        <CommonText
                            bold
                            text={props.date}
                            style={[s.white, s.pr3]}
                        />
                        : null
                    }
                    <View style={s.flx_row}>
                        <CommonText
                            bold
                            text={props.dateSuffix}
                            color={themeVariables.white}
                        />
                        {props.isClickable ? <CardAngleRightIcon color={themeVariables.white} style={styles.arrowIcon} /> : null}
                    </View>
                </View>
            </View>
        </View>
    )
};

CheckInListHeader.propTypes = {
    date: PropTypes.string,
    dateSuffix: PropTypes.string,
    state: PropTypes.string,
    workTypeIcon: PropTypes.element,
    isClickable: PropTypes.bool.isRequired,
    employeeName: PropTypes.string,
    dataChangeLatest: PropTypes.bool
};

CheckInListHeader.defaultProps = {
    workTypeIcon: undefined,
    dateSuffix: "",
    date: "",
    employeeName: "",
    state: "",
    dataChangeLatest: false
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: themeVariables.cardHeaderBgColor
    },
    arrowIcon: {
        marginLeft: themeVariables.sp1,
        alignSelf: 'center'
    },
});

export default CheckInListHeader;
