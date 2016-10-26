/**
 * Created by jahansj on 21/10/2016.
 */
import { combineReducers } from 'redux';
import update from './update';
import login from './login';

export default combineReducers({
  update,
  login
});