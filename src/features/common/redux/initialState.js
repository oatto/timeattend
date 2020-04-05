import { makeInitialState } from 'react-native-core/api/paginate/reducer';
import { NavigationActions } from 'react-navigation';
import {
    GET_APP_VERSION_STATE_KEY,
    GET_NOTIFICATION_CENTER_LIST_STATE_KEY,
    GET_NOTIFICATION_CENTER_BAGDE_STATE_KEY
} from './constants';
import { RootNavigator } from '../../../common/rootNavigation';

const initialState = {
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({})),
    [GET_APP_VERSION_STATE_KEY]: null,
    ...makeInitialState(GET_NOTIFICATION_CENTER_LIST_STATE_KEY),
    [GET_NOTIFICATION_CENTER_BAGDE_STATE_KEY]: null,
};

export default initialState;
