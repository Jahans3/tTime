/**
 * Created by jahansj on 05/01/2017.
 */
import initialState from '../initialState';
import {
  _CHANGE_APP_DRAWER_STATUS,
  _APP_ERROR
} from '../actions/actionTypes';

export default (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  
  switch(action.type) {
    case _CHANGE_APP_DRAWER_STATUS:
      nextState.app.header.drawer = !nextState.app.header.drawer;
      break;

    case _APP_ERROR:
      nextState.errors.push(action.payload);
      break;
  }
  
  return nextState;
}