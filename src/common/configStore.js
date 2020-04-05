import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
    sagaMiddleware,
    createReactNavigationReduxMiddleware(
        "root",
        state => state.nav,
    )
];

// eslint-disable-next-line no-undef
if (__DEV__) {
    middlewares.push(logger);
}

const devToolsExtension = f => f;

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares),
        devToolsExtension,
    ));

    /* istanbul ignore if  */
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./rootReducer', () => {
            const nextRootReducer = require('./rootReducer').default; // eslint-disable-line
            store.replaceReducer(nextRootReducer);
        });
    }
    sagaMiddleware.run(rootSaga);
    return store;
}
