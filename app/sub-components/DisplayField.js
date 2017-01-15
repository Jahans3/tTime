/**
 * Created by jahansj on 23/10/2016.
 */
import React from 'react';

export default (props) => {
  let rows;

  if (Array.isArray(props.displayText)) {
    rows = props.displayText.map((item, i) => (
      <div className={ props.itemClass } key={ i }>{ item }</div>
    ));
  }

  return (
    <div className={props.containerClass}>
      {
        rows
      }
    </div>
  )
};