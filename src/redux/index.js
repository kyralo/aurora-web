/*
* @Author: 王宸
* @Date:   2019-12-28 15:46:34
* @Last Modified by:   王宸
* @Last Modified time: 2020-01-01 14:37:37
*/

import { createStore, applyMiddleware, compose  } from 'redux';
import reducer from './reducer'
import saga from './saga'

import createSagaMiddleware from 'redux-saga'

import { routerMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware()

const createHistory = require('history').createHashHistory;
//初始化history
const history = createHistory(); 
const routerWare = routerMiddleware(history);


const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
    	sagaMiddleware,
    	routerWare
	),

);

const store = createStore(
	reducer,
	enhancer
);

sagaMiddleware.run(saga)

export default store;