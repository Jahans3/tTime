/**
 * Created by jahansj on 05/01/2017.
 */
import React from 'react';
import store from '../store';
import { LOGOUT } from '../actions/loginActions';
import { CHANGE_APP_DRAWER_STATUS } from '../actions/appActions';

export default (props) => {
  const onLogout = () => {
    store.dispatch(LOGOUT());
    store.dispatch(CHANGE_APP_DRAWER_STATUS());
  };

  return (
    <a href="#" className={ `logout ${props.classes}`} onClick={ onLogout } >
      Logout
    </a>
  )
}