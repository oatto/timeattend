import React from 'react';
import PropTypes from 'prop-types';
import moment from '_utils/moment';
import ref from 'react-native-core/utils/ref';
import { List } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import CheckInDetail from './CheckInDetail';

const CheckInTransactionDetail = (props) => {
    const checkIn = props.data;

    return (
        <List style={[s.flx_i, s.bg_white]}>
            <CheckInDetail
                type={checkIn.type}
                place={ref(checkIn, 'place.name')}
                placeType={ref(checkIn, 'place') ? checkIn.place.type : undefined}
                time={ref(checkIn, 'checked_at') ? moment(checkIn.checked_at).format('HH:mm') : undefined}
                note={ref(checkIn, 'note')}
            />
        </List>
    )
};

CheckInTransactionDetail.propTypes = {
    data: PropTypes.object.isRequired
};

export default CheckInTransactionDetail;
