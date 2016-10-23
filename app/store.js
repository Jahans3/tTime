/**
 * Created by jahansj on 23/10/2016.
 */
import { applyMiddleware, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise-middleware';
import reducer from './reducers/reducers';

const middleware = applyMiddleware(reduxPromise(), reduxThunk, reduxLogger());

export default createStore(reducer, middleware);