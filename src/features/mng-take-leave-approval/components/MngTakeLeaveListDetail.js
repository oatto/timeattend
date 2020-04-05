import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import { NewReleasesIcon } from '_features/common/components/icons/AppIcons';
import CommonText from '_features/common/components/CommonText';
import TakeLeaveListDetail from '_features/take-leave/components/TakeLeaveListDetail';

class MngTakeLeaveListDetail extends React.PureComponent {
    render() {
        const data = this.props.data;
        const employee = data.employee;

        return (
            <View>
                <View padderHorizontal style={s.flx_row}>
                    <CommonText text={employee.full_name} />
                    {this.props.dataChangeLatest &&
                        <View style={s.ml1}>
                            <NewReleasesIcon size={themeVariables.ifs4} color={themeVariables.primary} />
                        </View>
                    }
                </View>
                <TakeLeaveListDetail
                    data={data}
                />
            </View>
        );
    }
}

MngTakeLeaveListDetail.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    dataChangeLatest: PropTypes.bool
};

MngTakeLeaveListDetail.defaultProps = {
    onPress: null,
    dataChangeLatest: false
};

export default MngTakeLeaveListDetail;
