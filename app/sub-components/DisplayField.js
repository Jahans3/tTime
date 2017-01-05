/**
 * Created by jahansj on 23/10/2016.
 */
import React from 'react';

export default (props) => {
  const rows = props.displayText.map((item, i) => (
      <div className={props.sharedClass} key={i}>{ item }</div>
  ));

  return (
      <div className={props.containerClass}>
        {
            rows
        }
      </div>
  )
};