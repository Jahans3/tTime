/**
 * Created by jahansj on 21/10/2016.
 */
// 1. create UI
// 2. create actions, reducers
import { combineReducers } from 'redux';
import clicks from './clicks';
import update from './update';

export default combineReducers({
  clicks,
  update
});