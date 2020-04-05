import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar, StyleSheet, YellowBox, View, TextInput, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { StyleProvider } from 'native-base';
import NativeTachyons from 'react-native-style-tachyons';
import rncoreCommonInitialState from 'react-native-core/features/common/redux/initialState';
import { REDUCER_KEY as RN_CORE_COMMON_KEY } from 'react-native-core/features/common/redux/constants';
import ThemeVariables from '_theme';
import LoadingOverlay from '_features/common/containers/LoadingOverlay';
import DirectMessage from '_features/user/containers/DirectMessage';
import { appInit } from './common/appInit';
import configureStore from './common/configStore';
import configStyle from './common/configStyle';
import { DEFAULT_LOCALE } from './common/constants';
import RootNavigation from './common/rootNavigation';
import getTheme from '../native-base-theme/components';

import { SafeAreaProvider } from 'react-native-safe-area-context';

NativeTachyons.build(configStyle, StyleSheet);

export const store = configureStore({
    [RN_CORE_COMMON_KEY]: {
        ...rncoreCommonInitialState,
        locale: DEFAULT_LOCALE
    }
});

export const disableAllowFontScaling = (Element) => {
    if (Element.defaultProps == null) Element.defaultProps = {};
    Element.defaultProps.allowFontScaling = false;
};

disableAllowFontScaling(Text);
disableAllowFontScaling(TextInput);
disableAllowFontScaling(DatePicker);

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class App extends React.Component {
    componentDidMount() {
        store.dispatch(appInit());
    }

    render() {
        return (

            <Provider store={store}>
                <View style={styles.root}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={ThemeVariables.brandPrimary}
                    />
                    <LoadingOverlay />
                    <DirectMessage />
                    <StyleProvider style={getTheme(ThemeVariables)}>
                      <SafeAreaProvider>
                        <RootNavigation />
                      </SafeAreaProvider>
                    </StyleProvider>
                </View>
            </Provider>

        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
});

export default App;
