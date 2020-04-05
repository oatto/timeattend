import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardItem } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import moment from '_utils/moment';
import Trans from "_features/common/containers/Trans";
import themeVariables from '_theme';
import { getDateInfo } from "./CheckInList";
import CheckInListHeader from "./CheckInListHeader";
import CheckInTransactionDetail from "./CheckInTransactionDetail";

const CheckInTransactionList = (props) => {
    const item = props.item;
    const firstData = item.data[0];
    const isClickable = typeof props.onPress === 'function';
    const { work_type_tran } = getDateInfo(firstData);

    return (
        <TouchableOpacity onPress={props.onPress} disabled={!isClickable} style={styles.container}>
            <CheckInListHeader
                isClickable={false}
                date={moment(firstData.checked_at).format('dddd DD MMMM YYYY')}
                dateSuffix={`${Trans.tran(work_type_tran)}`}
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

CheckInTransactionList.propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func
};

CheckInTransactionList.defaultProps = {
    onPress: undefined
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    }
});

export default CheckInTransactionList;
