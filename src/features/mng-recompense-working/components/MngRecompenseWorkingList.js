import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ref from 'react-native-core/utils/ref';
import { styles as s } from 'react-native-style-tachyons';
import themeVariables from '_theme';
import CommonText from '_features/common/components/CommonText';
import RecompenseWorkingList from '_features/recompense-working/components/ListRecompenseWorking';
import { NewReleasesIcon } from '_features/common/components/icons/AppIcons';

const MngRecompenseWorkingList = (props) => {
    const data = props.item;
    const employee = ref(data, 'employee');

    return (
        <View>
            <View style={s.flx_row}>
                {employee && <CommonText text={employee.full_name} bold />}
                {props.dataChangeLatest &&
                <View style={s.ml1}>
                    <NewReleasesIcon size={themeVariables.ifs4} color={themeVariables.primary} />
                </View>
                }
            </View>
            <RecompenseWorkingList item={data} />
        </View>
    );
};

MngRecompenseWorkingList.propTypes = {
    item: PropTypes.object.isRequired,
    dataChangeLatest: PropTypes.bool
};

MngRecompenseWorkingList.defaultProps = {
    dataChangeLatest: false
};

export default MngRecompenseWorkingList;
