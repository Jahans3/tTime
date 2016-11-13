/**
 * Created by jahansj on 13/11/2016.
 */
import React from 'react';
import s from './subcomponents.css';

export default (props) => {
  return (
      <div className={s.twitter}>
        <a href={ props.loginURL }>
          { props.buttonText }
        </a>
      </div>
  )
}