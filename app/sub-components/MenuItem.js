/**
 * Created by jahansj on 05/01/2017.
 */
import React from 'react';
import store from '../store';
import { CHANGE_APP_DRAWER_STATUS } from '../actions/appActions';
import Link from 'react-router';

export default (props) => {
  const closeDrawer = () => store.dispatch(CHANGE_APP_DRAWER_STATUS());

  return (
      <Link to={ props.to } onClick={ closeDrawer }>
        {
          props.text
        }
      </Link>
  )

}