/**
 * Created by jahansj on 21/10/2016.
 */
import { combineReducers } from 'redux';
import clicks from './clicks';
import update from './update';

export default combineReducers({
  clicks,
  update
});