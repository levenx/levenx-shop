//store.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from './reducer'

//初始化工厂数据 state
const initState = {};


const composeEnhancers =
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] ?
        window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, logger)
);

//创建store工厂
const store = createStore(
    reducer,
    initState,
    enhancer
);

export default store;
