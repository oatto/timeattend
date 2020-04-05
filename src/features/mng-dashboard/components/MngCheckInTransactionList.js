import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardItem } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import moment from '_utils/moment';
import themeVariables from '_theme';
import CheckInListHeader from "_features/check-time/components/CheckInListHeader";
import CheckInTransactionDetail from "_features/check-time/components/CheckInTransactionDetail";

const MngCheckInTransactionList = (props) => {
    const item = props.item;
    const firstData = item.data[0];
    const isClickable = typeof props.onPress === 'function';

    return (
        <TouchableOpacity onPress={props.onPress} disabled={!isClickable} style={styles.container}>
            <CheckInListHeader
                isClickable
                date={moment().format('dddd DD MMMM YYYY')}
                employeeName={firstData.employee.full_name}
            />
            {
                item.data.map((data) => {
                    return (
                        <Card key={data.id}>
                            <CardItem>
                                <CheckInTransactionDetail data={data} />
                            </CardItem>
                        </Card>
                    )
                })
            }
        </TouchableOpacity>
    )
};

MngCheckInTransactionList.propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func
};

MngCheckInTransactionList.defaultProps = {
    onPress: undefined
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: themeVariables.isAndroid ? '99.5%' : '100%'
    }
});

export default MngCheckInTransactionList;
