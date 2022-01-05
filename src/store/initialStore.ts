import { createStore, compose, applyMiddleware } from 'redux';
import { createRootReducer } from './reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from '../sagas/rootSaga';
import createSagaMiddleware from 'redux-saga';

export function configureStore() {
    if (process.env.NODE_ENV === 'development') {
        const sagaMiddleware = createSagaMiddleware();

        const store = createStore(
            createRootReducer(history),
            composeWithDevTools(compose(applyMiddleware(sagaMiddleware)))
        );

        sagaMiddleware.run(rootSaga);

        return store;
    } else {
        const sagaMiddleware = createSagaMiddleware();

        const store = createStore(
            createRootReducer(history),
            compose(applyMiddleware(sagaMiddleware))
        );

        sagaMiddleware.run(rootSaga);

        return store;
    }
}