import React from 'react';
import { StyleSheet } from 'react-native';
import { Fab } from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather'

const fab = (props) => {
    return (
        <Fab
            style={styles.bgFab}
            position="bottomRight"
            onPress={props.GoPage}
        >
            <Icon name={'plus'} style={{fontSize: 40}} />
        </Fab>
    );
};

fab.propTypes = {
    GoPage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    bgFab: {
        backgroundColor: '#5067FF'
    }
});

export default fab;
