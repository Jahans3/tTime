/**
 * Created by jahansj on 23/10/2016.
 */
import React from 'react';

export default (props) => {
  return (
      <div className={props.containerClass}>
        <label className={props.labelClass} htmlFor={props.inputName}>{ props.labelText }</label>
        <input type="text" id={props.inputId} name={props.inputName}/>
      </div>
  )
}