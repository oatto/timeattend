/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import {styles as s} from 'react-native-style-tachyons';
import {Card, CardItem, Container, Content, Body, View} from 'native-base';
import themeVariables from '_theme';
import Trans from "_features/common/containers/Trans";
import CommonText from '_features/common/components/CommonText';
import ColumnList from '_features/common/components/ColumnList';
import Hr from '_features/common/components/Hr';
import NoResult from '_features/common/components/NoResult';

class ProfileTakeLeave extends React.Component {
    _renderTakeLeaveTotalItem = ({item}) => {
        return (
            <View style={s.ml3}>
                <ColumnList
                    label={item.type_name}
                    translateLabel={false}
                    data={`${item.nb_days} ${Trans.tran('general.unit.day')}`}
                    containerStyle={styles.container}
                />
            </View>
        )
    };

    _renderTakeLeaveRemainingItem = ({item}) => {
        const remainingMin = item.remaining_minutes ? item.remaining_minutes : 0;

        return (
            <View style={s.ml3}>
                <ColumnList
                    label={item.type_name}
                    translateLabel={false}
                    data={`${item.remaining_days} ${Trans.tran('general.unit.day')} ${item.remaining_hours} ${Trans.tran('general.unit.hour')} ${remainingMin} ${Trans.tran('general.unit.min')}`}
                    containerStyle={styles.container}
                />
            </View>
        );
    };

    _keyExtractor = (item, index) => index.toString();

    render() {
        const data = this.props.data;
        return (
            <Container>
                <Content>
                    <Card withSpace>
                        <CardItem padder column>
                            <Body>
                                <CommonText
                                    bold
                                    text={Trans.tran('user.profile.profile_take_leave.right_to_take_leave')}
                                    style={[styles.labelElement, s.mv1]}
                                />
                                {0 === data.length ? <NoResult /> : (
                                    <FlatList
                                        data={data}
                                        renderItem={this._renderTakeLeaveTotalItem}
                                        keyExtractor={this._keyExtractor}
                                    />
                                )}

                                <Hr />

                                <CommonText
                                    bold
                                    text={Trans.tran('user.profile.profile_take_leave.remaining_days')}
                                    style={[styles.labelElement, s.mv1]}
                                />
                                {0 === data.length
                                    ? <NoResult />
                                    : (
                                        <FlatList
                                            data={data}
                                            renderItem={this._renderTakeLeaveRemainingItem}
                                            keyExtractor={this._keyExtractor}
                                        />
                                    )
                                }
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

ProfileTakeLeave.propTypes = {
    data: PropTypes.array
};

ProfileTakeLeave.defaultProps = {
    data: []
};

const styles = StyleSheet.create({
    container: {
        marginBottom: themeVariables.sp1,
    },
});


export default ProfileTakeLeave;
