import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Container } from  'native-base';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonText from '_features/common/components/CommonText';

const SubmitSuccessModal = (props) => {
    return(
        <Container>
            <TouchableHighlight style={s.flx_i} onPress={() => this.props.onPress}>
                <View style={styles.container}>
                    <IconFontAwesome
                        name={'close'}
                        size={30}
                        style={styles.closeIcon}
                        onPress={() => this.props.onPress}
                    />
                    <View style={styles.viewIcon}>
                        <IconFontAwesome
                            name={'check'}
                            size={50}
                        />
                    </View>
                    <CommonText text={'อนุมัติสำเร็จ'} color={'#fff'} size={26} />
                </View>
            </TouchableHighlight>
        </Container>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bfc4bf'
    },
    viewIcon: {
        borderRadius: 50,
        backgroundColor: '#fff',
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        left: '90%'
    }
});

SubmitSuccessModal.propTypes = {
    onPress: PropTypes.func.isRequired
};

SubmitSuccessModal.navigationOptions = ({
    header: null
});

export default SubmitSuccessModal;
