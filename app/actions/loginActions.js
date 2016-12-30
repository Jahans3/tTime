/**
 * Created by jahansj on 27/10/2016.
 */
import {
    _LOGIN_CREDENTIALS_REQUEST,
    _LOGIN_CREDENTIALS_FAILURE,
    _LOGIN_CREDENTIALS_SUCCESS,
    _LOGOUT,
    _LOGOUT_ERROR
} from './actionTypes';

export const LOGIN_CREDENTIALS_REQUEST = () => {
  return {
    type: _LOGIN_CREDENTIALS_REQUEST
  }
};

export const LOGIN_CREDENTIALS_FAILURE = (err) => {
  return {
    type: _LOGIN_CREDENTIALS_FAILURE,
    payload: err
  }
};

export const LOGIN_CREDENTIALS_SUCCESS = (user) => {
  return {
    type: _LOGIN_CREDENTIALS_SUCCESS,
    payload: user
  }
};

export const LOGOUT = () => {
  return {
    type: _LOGOUT
  }
};

export const LOGOUT_ERROR = (err) => {
  return {
    type: _LOGOUT_ERROR,
    payload: err
  }
};