/**
 * Created by jahansj on 05/01/2017.
 */
import React from 'react';
import store from '../store';
import { LOGOUT } from '../actions/loginActions';

export default (props) => {
  const logout = () => store.dispatch(LOGOUT());
  
  return (
      <a href="#" className={ `logout ${props.classes}`} onClick={ () => logout() } >
        Logout
      </a>
  )
}