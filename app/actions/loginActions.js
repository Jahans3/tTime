/**
 * Created by jahansj on 27/10/2016.
 */
import {
    _LOGIN_CREDENTIALS_REQUEST,
    _LOGIN_CREDENTIALS_FAILURE,
    _LOGIN_CREDENTIALS_SUCCESS
} from './actionTypes';

export const LOGIN_CREDENTIALS_REQUEST = () => {
  return {
    type: _LOGIN_CREDENTIALS_REQUEST
  }
};

export const LOGIN_CREDENTIALS_FAILURE = () => {
  return {
    type: _LOGIN_CREDENTIALS_FAILURE
  }
};

export const LOGIN_CREDENTIALS_SUCCESS = (user) => {
  return {
    type: _LOGIN_CREDENTIALS_SUCCESS,
    payload: user
  }
};