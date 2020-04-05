/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Body, Header, Icon, Left, Right } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from "_theme";
import { CloseIcon } from '_features/common/components/icons/AppIcons';
import HeaderTitle from '_features/common/components/HeaderTitle';
import HeaderIconMenu from '_features/common/components/HeaderIconMenu';

const CommonChoiceHeaderModal = (props) => {
    return (
        <Header
            style={styles.header}
            iosBarStyle={'light-content'}
            androidStatusBarColor={themeVariables.primary}
        >
            <Left style={styles.headerLeft}>
                <HeaderIconMenu
                    onPress={props.onClose}
                    icon={<Icon type={'MaterialCommunityIcons'} name={'chevron-left'} />}
                    style={styles.icon}
                />
            </Left>
            <Body style={s.flx_i}>
                <HeaderTitle
                    style={styles.title}
                    text={props.title}
                />
            </Body>
            <Right style={styles.headerRight}>
                {props.allowClearSelectedValue && (
                    <HeaderIconMenu
                        onPress={() => {
                            props.onClose();
                        }}
                        icon={<CloseIcon headerMenuIcon />}
                        style={styles.icon}
                    />
                )}
            </Right>
        </Header>
    );
};

CommonChoiceHeaderModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    allowClearSelectedValue: PropTypes.bool,
};

CommonChoiceHeaderModal.defaultProps = {
    allowClearSelectedValue: true,
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: themeVariables.brandPrimary,
    },
    headerLeft: {
        flex: 0,
        width: 50,
        paddingLeft: themeVariables.sp0,
    },
    headerRight: {
        flex: 0,
        paddingRight: themeVariables.sp0,
        width: 50
    },
    icon: {
        paddingTop: themeVariables.sp0,
        paddingBottom: themeVariables.sp0,
        paddingLeft: themeVariables.sp0,
        paddingRight: themeVariables.sp0,
        marginTop: themeVariables.sp0,
    },
    title: {
        lineHeight: 50,
    }
});

export default connect(
    null,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(CommonChoiceHeaderModal);
