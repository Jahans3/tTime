/**
 * Created by jahansj on 21/10/2016.
 */
import { combineReducers } from 'redux';
import update from './update';
import login from './login';
import app from './app';

export default combineReducers({
  update,
  login,
  app
});