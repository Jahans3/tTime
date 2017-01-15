/**
 * Created by jahansj on 05/01/2017.
 */
import {
  _CHANGE_APP_DRAWER_STATUS,
  _APP_ERROR
} from './actionTypes';

export const CHANGE_APP_DRAWER_STATUS = () => {
  return {
    type: _CHANGE_APP_DRAWER_STATUS
  }
};

export const APP_ERROR = (err) => {
  return {
    type: _APP_ERROR,
    payload: err
  }
};