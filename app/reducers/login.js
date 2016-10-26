/**
 * Created by jahansj on 26/10/2016.
 */
import initialState from '../initialState';
import {
    _LOGIN_CREDENTIALS_REQUEST,
    _LOGIN_CREDENTIALS_FAILURE,
    _LOGIN_CREDENTIALS_SUCCESS
} from '../actions/actionTypes';

export default (state = initialState, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case _LOGIN_CREDENTIALS_REQUEST:
      nextState.login.authInProgress = true;
      break;
    
    case _LOGIN_CREDENTIALS_FAILURE:
      nextState.login.authInProgress = false;
      nextState.login.authenticated = false;
      nextState.login.user = null;
      break;
    
    case _LOGIN_CREDENTIALS_SUCCESS:
      nextState.login.authInProgress = false;
      nextState.login.authenticated = true;
      nextState.login.user = action.payload;
  }

  return nextState;
};