/**
 * Created by jahansj on 26/10/2016.
 */
import initialState from '../initialState';
import {
  _LOGIN_CREDENTIALS_REQUEST,
  _LOGIN_CREDENTIALS_FAILURE,
  _LOGIN_CREDENTIALS_SUCCESS,
  _LOGOUT,
  _LOGOUT_ERROR
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
      nextState.login.user.forename = null;
      nextState.login.user.surname = null;
      nextState.login.user.email = null;
      nextState.login.failedLogin = true;
      nextState.errors.push(`Login: ${ action.payload }`);
      break;
    
    case _LOGIN_CREDENTIALS_SUCCESS:
      nextState.login.authInProgress = false;
      nextState.login.authenticated = true;
      nextState.login.user.forename = action.payload.forename;
      nextState.login.user.surname = action.payload.surname;
      nextState.login.user.email = action.payload.email;
      nextState.login.failedLogin = false;
      break;

    case _LOGOUT:
      nextState.login.authenticated = false;
      break;
    
    case _LOGOUT_ERROR:
      nextState.errors.push(`Logout: ${ action.payload }`)
  }

  return nextState;
};